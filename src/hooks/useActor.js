import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useActor = (id) => {
	return useQuery(['actor', id], () => MovieAPI.getActor(id))
}

export default useActor
