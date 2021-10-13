let noPages = null;
const APIKey = 'ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF';
const main = document.querySelector('main');


window.addEventListener('DOMContentLoaded', async function(event) {
	let offset = 0;
	let url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${offset}&order=by-publication-date&api-key=${APIKey}`;
	let response = await fetch(url);
	let data = await response.json();
	console.log(data.results[0]);
	
	let film = data.results[0];
	
	let article = document.createElement('article');
	let title = document.createElement('h2');
	let summary = document.createElement('p');
	summary.innerText = film.summary_short;
	title.innerText = film.display_title;
	article.append(title);
	article.append(summary);
	main.append(article);
});


// https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=ABGhAz7mHz2uYymBiuGQUhBYc4taw5KF

