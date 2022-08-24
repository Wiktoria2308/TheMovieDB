import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useGenres = () => {
	return useQuery('genres', MovieAPI.getGenres)
}

export default useGenres