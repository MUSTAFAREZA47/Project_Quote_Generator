const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// complete Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];

// show random quotes
function randomQuotes() {
    loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //check if author field is blank and replace it with unknown
  if (!quote.author) {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = quote.author;
  }

  //   check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
    loading()
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    randomQuotes();
  } catch (error) {
    randomQuotes();
    console.log("whoooops, try again", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listenner
newQuoteBtn.addEventListener("click", randomQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
// randomQuotes();
