import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useNowPlaying = () => {
	return useQuery('nowPlaying', MovieAPI.getNowPlaying)
}

export default useNowPlaying
