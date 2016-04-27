var colorArr = ['#528881', '#836579', '#a42f1e', '#149A71', '#149A7', '#818B30', '#abcabc'];
var currentQuote = '';
var currentAuthor = '';
/* Function to grab json file from Quotes on Design API */
function fetchQuote() {
  $.ajax({
    url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); //assign content of json to post variable
      $('#quote-title').html(post.title);
      $('#quote-content').html(post.content);
      /* Assign content variables for tweet. Json file contains HTML code for certain characters */
      currentAuthor = $('#quote-title').html(post.title).text();
      currentQuote = $('#quote-content').html(post.content).text();
      var color = Math.floor(Math.random() * colorArr.length);//randomizes color selection for new quote. 
      /*Assigns randomized color to html elements*/
      $("body").css('background-color', colorArr[color]);
      $(".btn.btn-secondary").css('background-color', colorArr[color]);
      $(".quote-text").css('color', colorArr[color]);
      $(".quote-author").css('color', colorArr[color]);
    },
    cache: false
  });
};

$(document).ready(function() {
  fetchQuote();
  // User tweet quote function
  $('#tweet-tweet').on('click', function() {
    window.open('https://twitter.com/intent/tweet?&text=' + encodeURIComponent(currentQuote + "- " + currentAuthor));
  });
  $('#get-another-quote-button').on('click', fetchQuote);
});