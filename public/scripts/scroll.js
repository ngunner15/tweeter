$(document).ready(function () {
  $("#my-link-new").click(function () {
    let targetPosition = $("#new-tweet").offset().top - 130;
    $("html, body").animate({ scrollTop: targetPosition }, "slow");
    $("#tweet-text").focus(); // enables the textarea automatically
  });

  /*
* Listen to Scroll Event on Document
* Hide and Show Buttons to move around the page
*/
  $(document).scroll(function () {

    /* If we're not at the top of the browser */
    if ($(window).scrollTop() !== 0) {
      $(".tweeter-header").hide();
      $(".backToTop").show();

      /* If we're at the top of the browser */
    } else {
      $(".tweeter-header").show();
      $(".backToTop").hide();
    }
  });

  /*
  * Listen to Click on backToTop Button
  * Scrolls back to the top of the page
  */
  $(".backToTop").click(function () {
    window.scrollTo(0, 0);
  });
});