import { useQuery } from 'react-query'
import MovieAPI from '../services/MovieAPI'

const useActorSeries = (id) => {
	return useQuery(['actorSeries', id], () => MovieAPI.getActorSeries(id))
}

export default useActorSeries
