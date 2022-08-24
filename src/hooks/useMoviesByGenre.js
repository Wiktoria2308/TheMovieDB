import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useMoviesByGenre = (id) => {
	return useQuery(['moviesByGenre', id], () => MovieAPI.getMoviesByGenre(id))
}

export default useMoviesByGenre
