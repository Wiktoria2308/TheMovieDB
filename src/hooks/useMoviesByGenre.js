import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useMoviesByGenre = (id, page) => {
	return useQuery(['moviesByGenre', {id, page}], () => MovieAPI.getMoviesByGenre(id, page))
}

export default useMoviesByGenre
