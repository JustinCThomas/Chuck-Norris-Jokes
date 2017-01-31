var jokeContainer = document.getElementById("joke-here");
var btn = document.getElementById("btn");
var tweet = document.getElementById("twitter");

btn.addEventListener("click", function () {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.icndb.com/jokes/random');
  request.onload = function () {
    var theData = JSON.parse(request.responseText);
    renderHTML(theData);
    
    /*  The delivered joke may have encoding issues 
        when tweeted. 
        
        This part is for Twitter button functionality.   
    */
   
    var chuckQuote = theData.value.joke;
   
    if (chuckQuote.length > 125) {
      chuckQuote = chuckQuote.slice(0, 120) + "...";
    }
   
    chuckQuote = encodeURIComponent(chuckQuote);
    
    tweet.setAttribute('href', "https://twitter.com/intent/tweet?hashtags=ChuckNorris&text=" + chuckQuote + " ");
    
  };
  request.send();
    
});

var setName = document.getElementById("setName");

setName.addEventListener("click", function () {
  firstName = prompt("Enter your first name: ");
  lastName = prompt("Enter your last name: ");
});

var customJoke = document.getElementById("custom");

customJoke.addEventListener("click", function () {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.icndb.com/jokes/random' + "?firstName=" + firstName + "&lastName=" + lastName);
  request.onload = function () {
    var theData = JSON.parse(request.responseText);
    renderHTML(theData);
    
    /*  The delivered joke may have encoding issues 
        when tweeted. 
        
        This part is for Twitter button functionality.   
    */
   
    var chuckQuote = theData.value.joke;
   
    if (chuckQuote.length > 125) {
      chuckQuote = chuckQuote.slice(0, 120) + "...";
    }
   
    chuckQuote = encodeURIComponent(chuckQuote);
    
    tweet.setAttribute('href', "https://twitter.com/intent/tweet?hashtags=ChuckNorris&text=" + chuckQuote);
    
  };
  request.send();
    
});


function renderHTML(data) {
  jokeContainer.innerHTML = "";
  var htmlString = "";
  
  htmlString += "<p>" + data.value.joke + "</p>";
  
  jokeContainer.insertAdjacentHTML('beforeend', htmlString);
}