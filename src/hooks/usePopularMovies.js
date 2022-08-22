import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const usePopularMovies = () => {
	return useQuery('popularMovies', MovieAPI.getPopularMovies)
}

export default usePopularMovies
