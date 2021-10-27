const searchField = document.querySelector('#search-field');

searchField.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    let input = searchField.value;
    
    input = cleanUpInput(input);
    
    sessionStorage.setItem('searchTerm', input);
    window.location.href = 'search-results.html';
  }
})

const cleanUpInput = (input) => {
  input = input.toLowerCase();
  input = input.trim();
  input = input.replace(/\s\s+/g, ' ');
  input = input.substring(0, 150);
  return input;
}