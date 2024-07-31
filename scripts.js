let page = 1;
let movies = [];
let filteredMovies = [];
const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');

closeModal.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

const fetchMovies = async (page) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=38ea5e7c8561a585923cb35fd520dfa3&page=${page}`);
        const data = await response.json();
        movies = [...movies, ...data.results];
        filteredMovies = movies;
        displayMovies(filteredMovies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

const displayMovies = (movies) => {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieCard.onclick = () => openModal(movie);
        movieList.appendChild(movieCard);
    });
};

const openModal = (movie) => {
    modalBody.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>Rating: ${movie.vote_average}</p>
    `;
    modal.style.display = 'block';
};

searchInput.oninput = (event) => {
    const query = event.target.value.toLowerCase();
    filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
    displayMovies(filteredMovies);
};

window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        page++;
        fetchMovies(page);
    }
};

fetchMovies(page);
