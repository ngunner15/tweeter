$(document).ready(function() {
  $(".tweet").hover(function() {
    $(this).css( {"opacity": "1", "box-shadow": "10px 10px 1px #9ea9cc" });
    $(this).find(".person-id").css("opacity", "0.7");
  });

  $(".tweet").on("mouseleave", function() {
    $(this).css({ "opacity": "0.5", "box-shadow": "none"});
    $(this).find(".person-id").css("opacity", "0");
  });
});