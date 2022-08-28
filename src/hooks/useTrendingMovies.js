import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useTrendingMovies = (time) => {
	return useQuery(['tredning', time], () => MovieAPI.getTrendingMovies(time))
}

export default useTrendingMovies
