import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useTopMovies = () => {
	return useQuery('topMovies', MovieAPI.getTopMovies)
}

export default useTopMovies
