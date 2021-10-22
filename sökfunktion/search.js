let noPages = null;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');


// Get search from API and create HTML-list with results
window.addEventListener('DOMContentLoaded', () => {
	let input = '  harry potter     and the   ';
	input = cleanUpInput(input);
	search(input);
});

const search = async (input) => {
	let url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?order=by-publication-date&query=${input}&api-key=${APIKey}`;
	
	let response = await fetch(url);
	let data = await response.json();
	let resultsArray = data.results;
	
	let resultsList = document.createElement('ul');
	
	if (resultsArray) {
		resultsArray.forEach(element => {
			let result = document.createElement('li');
			result.innerText = element.display_title;
			resultsList.append(result);
		})
	}
	main.append(resultsList);
}

const cleanUpInput = (input) => {
	input = input.trim();
	input = input.replace(/\s\s+/g, ' ');
	input = input.substring(0, 150);
	return input;
}

// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF

