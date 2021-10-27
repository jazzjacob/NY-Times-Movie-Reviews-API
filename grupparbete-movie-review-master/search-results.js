const body = document.querySelector('body');
const homeButton = document.querySelector('button');

let noPages = null;
let offset = 0;
let pageNumber = 1;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');
const searchResults = document.querySelector('.search-results');
const h1 = document.querySelector('h1');
const searchField = document.querySelector('#search-field');


window.addEventListener('DOMContentLoaded', () => {
  let searchTerm = sessionStorage.getItem('searchTerm');
  searchField.value = searchTerm;
  searchTerm = searchTerm.toUpperCase();
  let searchTermInH1 = document.createElement('span');
  
  searchTermInH1.innerHTML = `SHOWING RESULTS FOR: "${searchTerm}"`;
  h1.innerHTML = '';
  h1.appendChild(searchTermInH1);
  
 let offset = 0;
  search(searchTerm, offset, pageNumber);
});

homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
})

const search = async (input, offset, pageNumber) => {
  searchResults.innerHTML = '';
  let url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?offset=${offset}&order=by-publication-date&query=${input}&api-key=${APIKey}`;
  
  let response = await fetch(url);
  let data = await response.json();
  let resultsArray = data.results;
  
  console.dir(data);
  
  let resultsList = document.createElement('ul');
  
  if (resultsArray === null) {
    let errorMessage = document.createElement('p');
    errorMessage.innerText = 'No movies found.';
    searchResults.append(errorMessage);
  } else {
    
    resultsArray.forEach(element => {
      let result = document.createElement('li');
      let movieTitle = document.createElement('h2');
      let openingYear = document.createElement('span');
      let movieDescription = document.createElement('p');
      
      let linkToReview = document.createElement('a');
      linkToReview.href = element.link.url;
      linkToReview.innerHTML = element.display_title;
      
      movieTitle.append(linkToReview);
      
      
      if (element.opening_date) {
        openingYear.innerHTML = element.opening_date.substring(0, 4); 
        openingYear.classList.add('year');
      } else {
        openingYear.innerHTML = '';
      }
      movieDescription.innerHTML = element.summary_short;
      
      if (movieDescription.innerHTML.length > 180) {
        for (let i = 180; i < movieDescription.innerHTML.length; i++) {
          if (movieDescription.innerHTML[i] === ' ') {
            movieDescription.innerHTML = movieDescription.innerHTML.substring(0, i) + '...';
            i = movieDescription.innerHTML.length;
          }
        }
      };
      
      result.append(movieTitle);
      result.append(openingYear);
      result.append(movieDescription);
      resultsList.append(result);
      searchResults.append(resultsList);
    })
    
    const pageCounter = document.createElement('p');
    pageCounter.innerText = `Page: ${pageNumber}`;
    resultsList.append(pageCounter);
    
    if (offset > 0) {
      const prevButton = document.createElement('button');
      prevButton.classList.add('nav-button');
      prevButton.innerText = '<- Prev';
      searchResults.append(prevButton);
      prevButton.addEventListener('click', () => {
        search(input, offset - 20, pageNumber - 1);
      })
    }
    if (data.has_more) {
      const nextButton = document.createElement('button');
      nextButton.classList.add('nav-button');
      nextButton.innerText = 'Next ->';
      searchResults.append(nextButton);
      nextButton.addEventListener('click', () => {
        search(input, offset + 20, pageNumber + 1)
      });
    }
  }
}