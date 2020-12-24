$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let $totalCharacters = $(this).val().length;
    let $counter = $(this).siblings().find("#max-character");
    let maxCharacters = 140;
    let remainingCharacters = maxCharacters - $totalCharacters;
    $counter.text(remainingCharacters);
    // add classes dynamically
    if (remainingCharacters < 0) {
      $counter.addClass("over-the-limit");
    }
    if (remainingCharacters > 0) {
      $counter.removeClass("over-the-limit");
    }
  });
});