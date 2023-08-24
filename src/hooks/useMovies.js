import { useQuery } from 'react-query'
import {getMoviesByType} from '../services/MovieAPI'

const useMovies = (type, page) => {

    return useQuery(['movies', type, page], getMoviesByType)
}

export default useMovies