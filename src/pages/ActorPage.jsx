import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import useActor from '../hooks/useActor'
import { Link, useNavigate } from 'react-router-dom'
import ActorImage from '../assets/images/actor.png'
import Button from 'react-bootstrap/Button'

const ActorPage = () => {
	const { id } = useParams()
	const { data: actor, error, isError, isLoading } = useActor(id)
    const navigate = useNavigate()

	return (
		<Container className="py-3">
			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{actor && <>

				<h1>{actor.name}</h1>

                <div className=''>
                <img src={actor.profile_path === null ?  ActorImage : `https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt="Actor poster" width={300}></img>
         
                <div>
                <p className='pt-2'>{actor.biography}</p>

                <p><span className='fw-bold'>Birthday:</span> {actor.birthday}</p>

                <p><span className='fw-bold'>Place of birth:</span> {actor.place_of_birth}</p>

               
                <p className='pb-0 mb-1 fw-bold'>Movies:</p>
                <ul>
                    {actor.credits.cast.map((cast, index) => (
                         <li key={index}><Link to={`/movies/${cast.id}`}>{cast.title}</Link></li>
                    ))}
                    </ul>
                </div> 
                
                </div>
                <Button variant="secondary" onClick={() => navigate(-1)}>&laquo; Back</Button>
				
			</>}
		</Container>
	)
}

export default ActorPage
