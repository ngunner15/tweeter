/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
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
                    <p>${tweet.content.text}</p>
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

renderTweets(data);

});