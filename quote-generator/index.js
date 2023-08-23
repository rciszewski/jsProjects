const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

// show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Snow new quote
const newQuote = () => {
  loading();
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
  complete();
}

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Get quotes from api
const getQuotes = async () => {
  loading();
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //handle error here
  }
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();