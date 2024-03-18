$(document).ready(function () {
  console.log("Document is ready!");

  const createTweetElement = function (data) {
    const { user, content, created_at } = data;
    const markUp = `
            <article class="tweet">
                <div class="user-info">
                    <div class="name-avatar">
                        <img src="${user.avatars}">
                        <h3>${user.name}</h3>
                    </div>
                    <span>${user.handle}</span>
                </div>
                <div class="tweet-body">
                    <p>${content.text}</p>
                </div>
                <div class="tweet-info">
                    <span><i>${created_at}</i></span>
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


  // Test / driver code (temporary). Eventually will get this from the server.
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  // End of test/driver code

  const renderTweets = function (tweets) {
    for (let i of tweets) {
      $('.tweet-log').prepend(createTweetElement(i));
    }
  };

  renderTweets(data);

  $('.tweeter-post').submit(function (event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: serializedData
    });
  });
});