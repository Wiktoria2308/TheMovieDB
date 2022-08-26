import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useGenre = (id) => {
	return useQuery(['genre', id], () => MovieAPI.getGenre(id))
}

export default useGenre