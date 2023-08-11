import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useMovie = (id) => {
	return useQuery(['tv', id], () => MovieAPI.getTV(id))
}

export default useMovie
