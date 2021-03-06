/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  autosize($("#tweet-text"));

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
    }
  }

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // returns days from present
  const time = function(milliseconds) {
    let currentMilliseconds = Date.now();
    let seconds = (currentMilliseconds - milliseconds) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    if (seconds < 2) {
      return parseInt(seconds) + " second ago";
    } else if (seconds < 60) {
      return parseInt(seconds) + " seconds ago";
    }
    if (minutes < 2) {
      return parseInt(minutes) + " minute ago";
    } else if (minutes < 60) {
      return parseInt(minutes) + " minutes ago";
    }
    if (hours < 2) {
      return parseInt(hours) + " hour ago";
    } else if (hours < 24) {
      return parseInt(hours) + " hours ago";
    }
    if (days < 2) {
      return parseInt(days) + " day ago";
    } else {
      return parseInt(days) + " days ago";
    }
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
                    <time>${time(tweet.created_at)}</time>
                    <div class="tweet-icons">
                      <i class="fas fa-flag"></i>
                      <i class="fas fa-retweet"></i>
                      <i class="fas fa-heart"></i>  
                    </div>
                  </footer>
                </article>`);

    return $tweet;
  };

  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();
    let $errorOverLimit = $(this).siblings("#error-overlimit")
    let $errorUnderLimit = $(this).siblings("#error-underlimit");
    //show error messages
    if ($(this).find("#tweet-text").val().length === 0) {
      return $errorUnderLimit.slideDown("slow", function () {
        $().show();
        $errorOverLimit.slideUp("fast");
      });
    }
    if ($(this).find("#tweet-text").val().length > 140) {
      return $errorOverLimit.slideDown("slow", function () {
        $().show();
        $errorUnderLimit.slideUp("fast");
      });
    }
    //hide error messages
    $errorOverLimit.slideUp("slow", function () {
      $().hide();
    });
    $errorUnderLimit.slideUp("slow", function () {
      $().hide();
    });

    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $(this).serialize(),
      dataType: "html"
    })
      .done(function(data) {
        $("#tweet-text").val('');
        $("#max-character").val('140');
        // getting the last tweet from the database
        loadtweets("-1");
      });

  });

  const loadtweets = function(num) {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET"
    })
      .done(function(data) {
        // getting the tweets from the database
        renderTweets(data.slice(num));
      })
      .fail(function() {
        alert('error');
      })
  }

  loadtweets("0");

});