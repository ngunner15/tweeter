$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let totalCharacters = $(this).val().length;
    let output = $(this).siblings().find("output");
    let maxCharacters = 140;
    let remainingCharacters = maxCharacters - totalCharacters;
    output.text(remainingCharacters);
    if (remainingCharacters < 0) {
      output.css("color", "#FF0000")
    }
    if (remainingCharacters > 0) {
      output.css("color", "#545149")
    }
    //console.log(output);
  });
});