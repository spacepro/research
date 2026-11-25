(function () {
  var root = document.getElementById("catalog");

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render(reports) {
    if (!reports.length) {
      root.innerHTML = '<p class="catalog-status">등록된 보고서가 없습니다. reports.json에 항목을 추가하세요.</p>';
      return;
    }

    var sorted = reports.slice().sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });

    var categories = [];
    var byCategory = {};
    sorted.forEach(function (report) {
      if (!byCategory[report.category]) {
        byCategory[report.category] = {
          category: report.category,
          label: report.categoryLabel || report.category,
          reports: [],
        };
        categories.push(byCategory[report.category]);
      }
      byCategory[report.category].reports.push(report);
    });

    categories.sort(function (a, b) {
      return a.reports[0].date < b.reports[0].date ? 1 : -1;
    });

    root.innerHTML = categories
      .map(function (category) {
        var months = [];
        var byMonth = {};
        category.reports.forEach(function (report) {
          var key = String(report.date).slice(0, 7);
          if (!byMonth[key]) {
            byMonth[key] = [];
            months.push(key);
          }
          byMonth[key].push(report);
        });

        var monthHtml = months
          .map(function (key) {
            var cards = byMonth[key]
              .map(function (report) {
                return (
                  '<article class="report-card">' +
                  '<p class="report-date"><time datetime="' +
                  escapeHtml(report.date) +
                  '">' +
                  escapeHtml(report.date) +
                  "</time></p>" +
                  "<h3><a href=\"" +
                  escapeHtml(report.href) +
                  '">' +
                  escapeHtml(report.title) +
                  "</a></h3>" +
                  "<p>" +
                  escapeHtml(report.summary) +
                  "</p>" +
                  "</article>"
                );
              })
              .join("");
            return '<p class="month-label">' + escapeHtml(key.replace("-", ".")) + "</p>" + cards;
          })
          .join("");

        return (
          '<section class="category">' +
          "<h2>" +
          escapeHtml(category.label) +
          ' <span class="cat-id">' +
          escapeHtml(category.category) +
          "</span></h2>" +
          monthHtml +
          "</section>"
        );
      })
      .join("");
  }

  fetch("reports.json")
    .then(function (response) {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then(function (data) {
      render(data.reports || []);
    })
    .catch(function () {
      root.hidden = true;
      var fallback = document.getElementById("catalog-fallback");
      if (fallback) fallback.hidden = false;
    });
})();
