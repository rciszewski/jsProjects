let apiQuotes = []

// Snow new quote
const newQuote = () => {
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}


// Get quotes from api
const getQuotes = async () => {
  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //handle error here
  }
}

// on load
getQuotes();