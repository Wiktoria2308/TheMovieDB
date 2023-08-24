import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useTrendingMovies = (time, page) => {
	return useQuery(['tredning', {time, page}], () => MovieAPI.getTrendingMovies(time, page))
}

export default useTrendingMovies
