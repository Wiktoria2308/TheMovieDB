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

const exports = {
	getNowPlaying,
	getPopularMovies,
	getTopMovies,
}

export default exports