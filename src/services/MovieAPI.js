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

const getMoviesByCategoryPagination = async (category, resource, page = 1) => {
	
	if(resource === "on_the_air" || (resource === "popular" && category === "tv")){
		return get(`/${category}/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&with_original_language=en`)
	}
	else {
		return get(`/${category}/${resource}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}&region=US`)
	}
}


const getMovie = (id) => {
	return get(`/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}

const getActor = (id) => {
	return get(`/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}


const getGenres = async (type) => {
	return get(`/genre/${type}/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

const getMoviesByGenre = (id, page, type) => {
	if(type === "tv"){
		return get(`/discover/${type}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&with_original_language=en&include_adult=false&page=${page}&with_genres=${id}`)
	}
	else {
		return get(`/discover/${type}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&region=us&include_adult=false&page=${page}&with_genres=${id}`)

	}
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
const getSimilarMovies = (id, category) => {
	return get(`${category}/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

export const getMoviesImages = ({ queryKey }) => {
	const [_key, id, category] = queryKey
	return get(`${category}/${id}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
}

/**
 * get trending movies for day or week
 * @param {*} time = 'day' or 'week' string
 * @returns 
 */
const getTrendingMovies = (category, time, page) => {
	return get(`trending/${category}/${time}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}`)
}


const getTrailer = (id, type) => {
	return getResults(`/${type}/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

export const getMoviesByType = async ({ queryKey }) => { 
	const [_key, category, type, page] = queryKey
	return getMoviesByCategoryPagination(category, type, page)
}

const getTV = (id) => {
	return get(`/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&append_to_response=credits`)
}

const getActorSeries = (id) => {
	return get(`/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
}

const exports = {
	getMovie,
	getActor,
	getGenres,
	getMoviesByGenre,
	getSearchMovies,
	getSimilarMovies,
	getTrendingMovies,
	getTV,
	getTrailer,
	getMoviesByType,
	getMoviesImages,
	getActorSeries,
}

export default exports