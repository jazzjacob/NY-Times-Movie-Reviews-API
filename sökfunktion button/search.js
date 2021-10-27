let noPages = null;
let offset = 0;
let pageNumber = 1;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');
const button = document.querySelector('button');
const searchField = document.querySelector('#search-field');
const searchResults = document.querySelector('.search-results');






// Get search from API and create HTML-list with results
button.addEventListener('click', () => {
	let input = searchField.value;
	console.dir(searchField);
	input = cleanUpInput(input);
	offset = 0;
	search(input, offset, pageNumber);
});

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
			result.innerHTML = element.display_title;
			resultsList.append(result);
			searchResults.append(resultsList);
		})
		
		const pageCounter = document.createElement('p');
		pageCounter.innerText = `Page: ${pageNumber}`;
		resultsList.append(pageCounter);
		
		if (offset > 0) {
			const prevButton = document.createElement('button');
			prevButton.innerText = '<- Prev';
			searchResults.append(prevButton);
			prevButton.addEventListener('click', () => {
				search(input, offset - 20, pageNumber - 1);
			})
		}
		if (data.has_more) {
			const nextButton = document.createElement('button');
			nextButton.innerText = 'Next ->';
			searchResults.append(nextButton);
			nextButton.addEventListener('click', () => {
				search(input, offset + 20, pageNumber + 1)
			});
		}
	}
}

const cleanUpInput = (input) => {
	input = input.trim();
	input = input.replace(/\s\s+/g, ' ');
	input = input.substring(0, 150);
	return input;
}

// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF

