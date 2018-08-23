function colorForDetail(detail) {
  if (detail === "positive") {
    return "#66CC33";
  } else if (detail === "mixed") {
    return "#FFCC33";
  } else if (detail === "negative") {
    return "#FF0000";
  } else {
    return "#FFFFFF";
  }
}

function formatScore(game) {
  if (game.score) {
    return "<a href=\"#\" onclick=\"window.open('" + game.href + "', '_blank')\">" + game.score + "</div></a>";
  } else {
    return "<div style=\"border-style: solid;\">TBD</div>";
  }
}

function formatUserScore(game) {
  if (game.user_score) {
    return "<a href=\"#\" onclick=\"window.open('" + game.href + "', '_blank');\"><div style=\"background: " + colorForDetail(game.user_score_detail) + ";\">" + game.user_score + "</div></a>";
  } else {
    return "<div style=\"border-style: solid;\">TBD</div>";
  }
}

function supplementScoresForSelector(selector) {
  $(selector).each(function(idx) {
    var element = $(this);
    var name = element.text();
    $.get("http://localhost:9000/lookup?game=" + name, function(data) {
      var game = JSON.parse(data);
      var fscore = formatScore(game);
      var fUserScore = formatUserScore(game);
      element.html(name + " " + fscore + " " + fUserScore);
    });
  });
}

$(document).ready(function() {
  supplementScoresForSelector($("li.quickview > a > div.info:has(p.Switch) > h3.b3"));
  supplementScoresForSelector($("a.btn-game-item:has(p[data-system='Nintendo Switch']) > h3.b3"));
  supplementScoresForSelector($("a.main-link:has(p[data-system='Nintendo Switch']) > h3.b3"));
});


