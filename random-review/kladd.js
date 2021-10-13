window.addEventListener('DOMContentLoaded', async function(event) {
	let url = `https://api.nytimes.com/svc/movies/v2/reviews/all.json?api-key=${APIKey}`;
	let response = await fetch(url);
	let data = await response.json();
	console.log(data.has_more);
	
	let numberOfMovies = 0;
	let offset = 0;
	
	let currentPage = 4000;
	let divider = 2;
	offset = currentPage;
	url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${offset}&order=by-publication-date&api-key=${APIKey}`;
	response = await fetch(url);
	data = await response.json();
	
	let foundLastPage = false;
	
	
	
	
	while (!foundLastPage) {
		url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?offset=${offset}&order=by-publication-date&api-key=${APIKey}`;
		response = await fetch(url);
		data = await response.json();
		
		if (!data.has_more && data.results) {
			foundLastPage = true;
			console.log('Found it!!');
			alert('Yes!');
		} else {
			if (data.has_more) {
				console.log('Yay');
				offset = Math.floor(offset + (1000 / divider));
			} else {
				console.log('Nay');
				offset = Math.floor(offset - (1000 / divider));
			};
			divider *= 2;
			console.log(offset);
		}
	}
	
	console.log(offset);
		
	
	
});