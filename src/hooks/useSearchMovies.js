import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useSearchMovies = (query, page) => {
	return useQuery(['moviesSearch', {query, page}], () => MovieAPI.getSearchMovies(query, page))
}

export default useSearchMovies
