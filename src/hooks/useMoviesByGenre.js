import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useMoviesByGenre = (id, page, type) => {
	return useQuery(['moviesByGenre', {id, page, type}], () => MovieAPI.getMoviesByGenre(id, page, type))
}

export default useMoviesByGenre
