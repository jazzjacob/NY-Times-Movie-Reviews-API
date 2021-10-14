let noPages = null;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');

// Get search from API and create HTML-list with results
window.addEventListener('DOMContentLoaded', async function(event) {
	let url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?offset=0&order=by-publication-date&api-key=${APIKey}`;
	let searchTerm = 'harry potter';
	url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?order=by-publication-date&query=${searchTerm}&api-key=${APIKey}`;
	let response = await fetch(url);
	let data = await response.json();
	let resultsArray = data.results;
	
	console.log(resultsArray);
	
	let resultsList = document.createElement('ul');
	
	if (resultsArray) {
		resultsArray.forEach(element => {
			let result = document.createElement('li');
			result.innerText = element.display_title;
			resultsList.append(result);
		})
	}
	main.append(resultsList);
	console.log(data);
});

// 3860 is current last offset-page

// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF

