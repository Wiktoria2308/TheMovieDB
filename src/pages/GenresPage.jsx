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

                <h1 className='pb-0 mb-1 fw-bold'>Movie Genres:</h1>
                <ul>
                    {genres.genres.map((genre, index) => (
                         <li key={index}><Link to={`/moviesByGenre/${genre.id}`}>{genre.name}</Link></li>
                    ))}
                    </ul>
                
			</>}
		</Container>
	)
}

export default GenresPage
