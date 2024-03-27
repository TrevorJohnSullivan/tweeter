$(document).ready(function () {
  console.log("Document is ready!");

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (data) {
    const { user, content, created_at } = data;
    const markUp = `
    <article class="tweet">
      <div class="user-info">
        <div class="name-avatar">
          <img src="${escape(user.avatars)}">
          <h3>${escape(user.name)}</h3>
        </div>
        <span>${escape(user.handle)}</span>
      </div>
      <div class="tweet-body">
        <p>${escape(content.text)}</p>
      </div>
      <div class="tweet-info">
        <span><i>${escape(timeago.format(created_at))}</i></span>
        <div class="actions">
          <button><i class="fa-solid fa-flag"></i></button>
          <button><i class="fa-solid fa-retweet"></i></button>
          <button><i class="fa-solid fa-heart"></i></button>
        </div>
      </div>
    </article>
  `;
    return markUp;
  };

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function (tweets) {
        $('.tweet-log').empty();
        renderTweets(tweets);
      },
    });
  };

  const renderTweets = function (tweets) {
    for (let i of tweets) {
      $('.tweet-log').prepend(createTweetElement(i));
    }
  };

  loadTweets();

  $('.tweeter-post').submit(function (event) {
    event.preventDefault();
    const tweetContent = $('#tweet-text').val().trim();
    if (!tweetContent) {
      $('.error-message').text('⚠️ Cannot send an empty Tweet. ⚠️').slideDown();
      return;
    }
    if (tweetContent.length > 140) {
      $('.error-message').text('⚠️ Tweet is too long. Maximum 140 characters allowed. ⚠️').slideDown();
      return;
    }
    $('.error-message').slideUp(500);
    const serializedData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData,
      success: function () {
        $('#tweet-text').val('');
        $('.counter').text('140');
        loadTweets();
      },
    });
  });

});