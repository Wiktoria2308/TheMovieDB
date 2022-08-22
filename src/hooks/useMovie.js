import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useMovie = (id) => {
	return useQuery(['movie', id], () => MovieAPI.getMovie(id))
}

export default useMovie
