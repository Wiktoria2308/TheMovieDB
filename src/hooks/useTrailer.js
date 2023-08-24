import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useTrailer = (id, type) => {
	return useQuery(['trailer', {id, type}], () => MovieAPI.getTrailer(id, type))
}

export default useTrailer