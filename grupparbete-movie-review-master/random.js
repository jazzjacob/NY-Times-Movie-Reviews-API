let noPages = null;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');

const randomMovieButton = document.querySelector("#random-movie");
const randomMovieContainer = document.querySelector('.random-movie-container');



// Get random movie review from API and create HTML elements
randomMovieButton.addEventListener('click', async function(event) {
	if (randomMovieContainer.classList.contains('visible')) {
		randomMovieContainer.classList.remove('visible');
	};
	randomMovieContainer.innerHTML = '';
	const maxOffset = 3860;
	const numberOfPages = maxOffset / 20;
	
	let randomPage = Math.floor(Math.random() * numberOfPages) + 1;
	let randomOffset = randomPage * 20;
	
	let url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${randomOffset}&order=by-publication-date&api-key=${APIKey}`;
	let response = await fetch(url);
	let data = await response.json();
	
	const filmIndexLength = data.results.length;
	let randomFilmIndex = Math.floor(Math.random() * filmIndexLength);
	
	let film = data.results[randomFilmIndex];
	console.dir(film);
	
	let article = document.createElement('article');
	article.classList.add('random-movie-result');
	let title = document.createElement('h2');
	let titleLink = document.createElement('a');
	titleLink.href = film.link.url;
	let summary = document.createElement('p');
	summary.innerHTML = film.summary_short;
	titleLink.innerHTML = film.display_title;
	title.append(titleLink);
	article.append(title);
	article.append(summary);
	randomMovieContainer.append(article);
	randomMovieContainer.classList.add('visible');
});

// 3860 is current last offset-page

// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF