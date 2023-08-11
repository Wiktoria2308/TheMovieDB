/**
 * The Movie DB API service
 *
 * <https://www.themoviedb.org/>
 * API: <https://api.themoviedb.org/3/>
 * Reference: <https://developers.themoviedb.org/3/>
 */

import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'

const get = async (endpoint) => {
	const response = await axios.get(endpoint)
	return response.data
}

// get only results, without page number and total_pages and other data
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
	return getResults(`/movie/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&region=US`)
}

/**
 * 
 * Series
 * 
 */
const getSeriesByCategory = async (resource, page = 1) => {
	return getResults(`/tv/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&with_original_language=en`)
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
 * Get 20 current popular series
 */
const getPopularSeries = async ({ queryKey }) => {
	const [_key, page] = queryKey
	return getSeriesByCategory('popular', page)
}

/**
 * Get a single tv serie with details
 */
const getTV = (id) => {
	return get(`/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}

/**
 * 
 * Get the 20 top rated movies
 */
const getTopMovies = async ({ queryKey }) => {
	const [_key, page] = queryKey
	return getMoviesByCategory('top_rated', page)
}

/**
 * Get a single movie with details
 */
const getMovie = (id) => {
	return get(`/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}

/**
 * Get a single actor/actress with details
 */
const getActor = (id) => {
	return get(`/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}


/**
 * 
 * Get all movies genres
 */
const getGenres = async () => {
	return get(`/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

/**
 * 
 * Get movies by genre
 */
const getMoviesByGenre = (id, page) => {
	return get(`/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&region=us&include_adult=false!&page=${page}&with_genres=${id}`)
}
/**
 * Search movie
 * @param {*} query = search query
 * @param {*} page = page of search results
 * @returns 
 */
const getSearchMovies = (query, page) => {
	return get(`/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false!`)
}

/**
 * Get a list of similar movies.
 */

const getSimilarMovies = (id) => {
	return get(`movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

/**
 * get trending movies for day or week
 * @param {*} time = 'day' or 'week' string
 * @returns 
 */
const getTrendingMovies = (time) => {
	return get(`trending/movie/${time}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}



const exports = {
	getNowPlaying,
	getPopularMovies,
	getTopMovies,
	getMovie,
	getActor,
	getGenres,
	getMoviesByGenre,
	getSearchMovies,
	getSimilarMovies,
	getTrendingMovies,
	getPopularSeries,
	getTV,
}

export default exports