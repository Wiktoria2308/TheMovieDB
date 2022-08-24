/**
 * The Movie DB API service
 *
 * <https://www.themoviedb.org/>
 * API: <https://api.themoviedb.org/3/>
 * Reference: <https://developers.themoviedb.org/3/>
 */

 import axios from 'axios'

 axios.defaults.baseURL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'

 const api_key = import.meta.env.VITE_TMDB_API_KEY

 const get = async (endpoint) => {
	const response = await axios.get(endpoint)

	return response.data
}

const getResults = async (endpoint) => {
	const response = await axios.get(endpoint)

	return response.data.results
}


/**
 * 
 * Movies
 * 
 */
 const getMoviesByCategory = async (resource, page = 1) => {
	return getResults(`/movie/${resource}?api_key=${api_key}&language=en-US&page=${page}&region=US`)
}
/**
 * Get 20 latest cinema movies
 */
 const getNowPlaying = async ({ queryKey }) => {
	const [_key, page] = queryKey
	return getMoviesByCategory('now_playing', page)
}

/**
 * Get 20 current popular movies
 */
const getPopularMovies = async ({ queryKey }) => {
	const [_key, page] = queryKey
	return getMoviesByCategory('popular', page)
}

/**
 * 
 * Get the 20 top rated movies
 */
const getTopMovies = async ({queryKey}) => {
	const [_key, page] = queryKey
	return getMoviesByCategory('top_rated', page) 
}

/**
 * Get a single movie with details
 */
 const getMovie = (id) => {
	return get(`/movie/${id}?api_key=${api_key}&language=en-US&append_to_response=credits`)
}

/**
 * Get a single actor/actress with details
 */
 const getActor = (id) => {
	return get(`/person/${id}?api_key=${api_key}&language=en-US&append_to_response=credits`)
}


/**
 * 
 * Get all movies genres
 */
const getGenres = async () => {
	return get(`/genre/movie/list?api_key=${api_key}&language=en-US`)
}

/**
 * 
 * Get movies by genre
 */
 const getMoviesByGenre = (id) => {
	return getResults(`/discover/movie?api_key=${api_key}&language=en-US&region=us&with_genres=${id}`)
}



const exports = {
	getNowPlaying,
	getPopularMovies,
	getTopMovies,
	getMovie,
	getActor,
	getGenres,
	getMoviesByGenre,
}

export default exports