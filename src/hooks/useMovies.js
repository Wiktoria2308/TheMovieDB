import { useQuery } from 'react-query'
import {getMoviesByType} from '../services/MovieAPI'

const useMovies = (category, type, page) => {

    return useQuery(['movies', category, type, page], getMoviesByType)
}

export default useMovies