// Business (or back-end) logic:
// Formats response to look presentable on webpage
function renderResponse (res) {
  // Handles if res is falsey
  if(!res){
    console.log(res.status);
  }
  // In case res comes back as a blank array
  if(!res.length){
    responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
  }

  // Creates an empty array to contain the HTML strings
  let wordList = [];
  // Loops through the response and caps off at 10
  for (let i = 0; i < Math.min(res.length, 10); i++) {
    // creating a list of words
    wordList.push('<li>'+ res[i].word + '</li>');
  }
  // Joins the array of HTML strings into one string
  wordList = wordList.join("");

  // Manipulates responseField to render the modified response
  responseField.innerHTML = '<p>You might be interested in:</p><ol>' + wordList + '</ol>';
}

//Everything below this line is user interface (or front-end) logic:
// Information to reach API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_rhy=';

// Selecting page elements
const inputField = document.querySelector('.group__input');
const submit = document.querySelector('.btn');
const responseField = document.querySelector('.response-field');

// AJAX function
function getSuggestions () {
	const wordQuery = inputField.value;
  const endpoint = url + queryParams + wordQuery;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
    	renderResponse(xhr.response);
     }
  }
  xhr.open('GET', endpoint);
  xhr.send();
}

// Clear previous results and display results to webpage
function displaySuggestions (event) {
  event.preventDefault();
  while(responseField.firstChild) {
    responseField.removeChild(responseField.firstChild);
  };
  getSuggestions();
}

submit.addEventListener('click', displaySuggestions);
