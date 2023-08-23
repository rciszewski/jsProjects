const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const error = document.getElementById('error');

let apiQuotes = [];
//global variables for API error handling of fetching quotes
let retryCount = 0;
let maxRetries = 3;

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
  error.hidden = true;
}

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
  error.hidden = true;
}

const showErrorMessage = () => {
  quoteContainer.hidden = true;
  loader.hidden = true;
  error.hidden = false
}
// Snow new quote
const newQuote = () => {
 showLoadingSpinner();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is blank and replace it with unknown
  quote.author 
  ? authorText.textContent = quote.author 
  : authorText.textContent = 'unknown'
  //check quote length to determine styling
  quote.text.length > 120 
    ? quoteText.classList.add('long-quote') 
    : quoteText.classList.remove('long-quote');
  //set quote and hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Get quotes from api
const getQuotes = async () => {
  showLoadingSpinner();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  while(true){
    try {
      const response = await fetch(apiURL);
      apiQuotes = await response.json();
      return newQuote();
    } catch (error) {
      //handle error here
        retryCount++;
        if(retryCount >= maxRetries){
          return showErrorMessage();
        } else {
          return getQuotes();
        }
        
    }
  }
  
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();