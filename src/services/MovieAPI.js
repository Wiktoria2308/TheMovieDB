/**
 * The Movie DB API service
 *
 * <https://www.themoviedb.org/>
 * API: <https://api.themoviedb.org/3/>
 * Reference: <https://developers.themoviedb.org/3/>
 */

 import axios from 'axios'

 axios.defaults.baseURL = import.meta.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3/'

 const get = async (endpoint) => {
	const response = await axios.get(endpoint)

	return response.data
}

/**
 * 
 * Movies
 * 
 */

