$(document).ready(function() {
  $("#my-link").click(function (e) {
    e.preventDefault();
    var targetPosition = $("#new-tweet").offset().top - 120;
    $("html, body").animate({ scrollTop: targetPosition }, "slow");
    $("#tweet-text").focus(); // enables the textarea automatically
  });
});