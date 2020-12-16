/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend($tweet);
  }
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet) {
let $tweet = $(`<article class="tweet">
                  <header>
                    <div>
                      <img src=${tweet.user.avatars} alt="alternatetext">
                      <span class="person-name">${tweet.user.name}</span>
                    </div>
                    <span class="person-id">${tweet.user.handle}</span>
                  </header>
                  <section class="content">
                    <p>${escape(tweet.content.text)}</p>
                  </section>
                  <footer>
                    <time>${tweet.created_at}</time>
                    <div class="tweet-icons">
                      <i class="fas fa-flag"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-heart"></i>  
                    </div>
                  </footer>
                </article>`);

return $tweet;
};

//renderTweets(data);

$("#new-tweet-form").on("submit", function(event) {
  event.preventDefault();
  //console.log($(this).serialize());
  if ($(this).find("#tweet-text").val().length === 0) {
    return $(this).siblings("#error-underlimit").show();
  }
  if ($(this).find("#tweet-text").val().length > 140) {
    return $(this).siblings("#error-overlimit").show();
  }
  $(this).siblings("#error-overlimit").hide();
  $(this).siblings("#error-underlimit").hide();
  
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "POST",
    data: $(this).serialize(),
    dataType: "html"
  })
  .done(function (data) {
    // getting the last tweet from the database
    loadtweets("-1");
  });
  
});

const loadtweets = function(num) {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET"
  })
  .done(function (data) {
    // getting the tweets from the database
    console.log(data);

    renderTweets(data.slice(num));
  })
  .fail(function () {
    alert('error');
  })
  .always(function () {
    console.log('complete');
  });
}

loadtweets("0");

});