const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&page=2`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213&page=1`,
  fetchTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=6`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchMisteryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=9648`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749&page=3`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99&page=2`,
  fetchTVPopular: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=2`,
  fetchMoviesLatest: `${BASE_URL}/movies/latest?api_key=${API_KEY}&language=en-US&page=10`,
  fetchSciFi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchWestern: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=37`,
  fetchAnimation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`,
};

export default requests;