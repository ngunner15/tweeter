$(document).ready(function() {
  $("#my-link-new").click(function () {
    var targetPosition = $("#new-tweet").offset().top - 130;
    $("html, body").animate({ scrollTop: targetPosition }, "slow");
    $("#tweet-text").focus(); // enables the textarea automatically
  });
});