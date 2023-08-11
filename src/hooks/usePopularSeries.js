import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const usePopularSeries = () => {
	return useQuery('popularSeries', MovieAPI.getPopularSeries)
}

export default usePopularSeries
