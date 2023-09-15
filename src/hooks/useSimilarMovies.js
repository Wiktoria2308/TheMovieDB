import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useSimilarMovies = (id, category) => {
	return useQuery(['similarMovies', {id, category}], () => MovieAPI.getSimilarMovies(id, category))
}

export default useSimilarMovies