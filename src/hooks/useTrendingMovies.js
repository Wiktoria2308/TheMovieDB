import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useTrendingMovies = (category, time, page) => {
	return useQuery(['tredning', {category, time, page}], () => MovieAPI.getTrendingMovies(category, time, page))
}

export default useTrendingMovies
