import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useGenres = (type) => {
	return useQuery(['genres', type] ,() => MovieAPI.getGenres(type))
}

export default useGenres