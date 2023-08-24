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

const getResults = async (endpoint) => {
	const response = await axios.get(endpoint)
	return response.data.results
}

const getMoviesByCategoryPagination = async (resource, page = 1) => {
	return get(`/movie/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&region=US`)
}


const getMovie = (id) => {
	return get(`/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}

const getActor = (id) => {
	return get(`/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}


const getGenres = async () => {
	return get(`/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

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
	return get(`/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`)
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
const getTrendingMovies = (time, page) => {
	return get(`trending/movie/${time}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}`)
}


const getTrailer = (id, type) => {
	return getResults(`/${type}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

export const getMoviesByType = async ({ queryKey }) => { 
	const [_key, type, page] = queryKey
	return getMoviesByCategoryPagination(type, page)
}

/**
 * 
 * Series
 * 
 */
const getSeriesByCategory = async (resource, page = 1) => {
	return getResults(`/tv/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&with_original_language=en`)
}

const getPopularSeries = async ({ queryKey }) => {
	const [_key, page] = queryKey
	return getSeriesByCategory('popular', page)
}

const getTV = (id) => {
	return get(`/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}


const exports = {
	getMovie,
	getActor,
	getGenres,
	getMoviesByGenre,
	getSearchMovies,
	getSimilarMovies,
	getTrendingMovies,
	getPopularSeries,
	getTV,
	getTrailer,
	getMoviesByType,
}

export default exports