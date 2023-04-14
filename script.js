let apiQuotes = [];
const quoteCategories = [];
let filteredQuotes = [];

const pageQuote = document.querySelector("#quote");
const pageAuthor = document.querySelector("#author");
const pageCategory = document.querySelector("#category-name");
const newQuoteBtn = document.querySelector("#new-quote");
const categoryDropdown = document.querySelector("#category");

// Uppercase first letter of word
function uppercase(word) {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalized;
}

// Show New Quote
function newQuote() {
    if(categoryDropdown.value === "all") {
      // Pick a random quote from apiQuotes array
      const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
      pageQuote.textContent = quote.text;
      pageAuthor.textContent = quote.author;
      pageCategory.textContent= uppercase(quote.tag);
    } else {
      // Pick a random quote from filtered quote array
      let filterQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      pageQuote.textContent = filterQuote.text;
      pageAuthor.textContent = filterQuote.author;
      pageCategory.textContent= uppercase(filterQuote.tag);
    }
}

// Create array from quote categories
function quoteCategory() {
  apiQuotes.map(quote => {
    // Check if category exist and add it to the array if not
    if(!quoteCategories.includes(quote.tag) && quote.tag.length > 0) {
      quoteCategories.push(quote.tag)
    }
  })
}

// Populate category options
function catDropdown() {
  quoteCategories.map(category => {
    const option = document.createElement("option");
    const text = uppercase(category);

    option.textContent = text;
    option.value = category;
    categoryDropdown.appendChild(option);
  })
}

// Create array of quote from selected category
function catArray() {
  filteredQuotes = [];
  apiQuotes.map(quote => {
    if(quote.tag === categoryDropdown.value) {
      filteredQuotes.push(quote);
    }
  })
}

//  Get Quotes from API
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    quoteCategory();
    catDropdown();
  } catch(error) {
    // Catch Error Here
    console.log("error", error)
  }
}

newQuoteBtn.addEventListener("click", newQuote);
categoryDropdown.addEventListener("change", catArray);

// On Load
getQuotes();