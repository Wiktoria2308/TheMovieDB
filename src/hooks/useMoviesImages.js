import { useQuery } from 'react-query'
import {getMoviesImages} from '../services/MovieAPI'

const useMoviesImages = (id, category) => {
	return useQuery(['moviesImages', id, category], getMoviesImages)
}

export default useMoviesImages