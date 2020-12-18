$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let totalCharacters = $(this).val().length;
    let output = $(this).siblings().find("#max-character");
    let maxCharacters = 140;
    let remainingCharacters = maxCharacters - totalCharacters;
    output.text(remainingCharacters);
    // add classes dynamically
    if (remainingCharacters < 0) {
      output.addClass("color-change").css("color", "#FF0000");
    }
    if (remainingCharacters > 0) {
      output.removeClass("color-change").addClass("color-revert").css("color", "#545149");
    }
  });
});