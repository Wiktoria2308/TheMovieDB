import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useSimilarMovies = (id) => {
	return useQuery(['similarMovies', {id}], () => MovieAPI.getSimilarMovies(id))
}

export default useSimilarMovies