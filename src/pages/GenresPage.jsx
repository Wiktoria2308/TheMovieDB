import Container from 'react-bootstrap/Container'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import useGenres from '../hooks/useGenres'
import { Link } from 'react-router-dom'

const GenresPage = () => {
	const { data: genres, error, isError, isLoading } = useGenres()

	return (
		<Container className="py-3">
			{isLoading && <LoadingSpinner />}

			{isError && <WarningAlert message={error.message} />}

			{genres && <>

                <p className='pb-0 mb-1 fw-bold'>Genres:</p>
                <ul>
                    {genres.genres.map((genre, index) => (
                         <li key={index}><Link to={`/genres/${genre.id}`}>{genre.name}</Link></li>
                    ))}
                    </ul>
                
			</>}
		</Container>
	)
}

export default GenresPage
