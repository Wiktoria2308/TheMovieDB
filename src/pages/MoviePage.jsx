import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import WarningAlert from '../components/alerts/WarningAlert'
import useMovie from '../hooks/useMovie'
import useTV from '../hooks/useTV'
import { Link, useNavigate } from 'react-router-dom'
import MovieImage from '../assets/images/movie.png'
import Button from 'react-bootstrap/Button'
import useSimilarMovies from '../hooks/useSimilarMovies'
import useLocalStorage from '../hooks/useLocalStorage'

const MoviePage = () => {
    const { category , id } = useParams()
    const { data: movie, error, isError, isLoading } = category === 'movies' ? useMovie(id) : useTV(id);
    const { data: similarMovies } = useSimilarMovies(id);
    const navigate = useNavigate();

    // call localsotrage hook to save shown movie in localstorage
    useLocalStorage(movie, id)

    return (
        <Container className="py-3">
            {isLoading && <LoadingSpinner />}

            {isError && <WarningAlert message={error.message} />}

            {movie && <>

                <h1>{movie.title}</h1>

                <div className=''>

                    <img src={movie.poster_path === null ? MovieImage : `https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie poster" width={300}></img>

                    <div>
                        <p className='pt-2'>{movie.overview}</p>

                        <p><span className='fw-bold'>Original title:</span> {category === 'movies' ? movie.title : movie.name}</p>

                        <p><span className='fw-bold'>Average vote:</span> {Number(movie.vote_average).toFixed(1)}</p>

                        <p className='pb-0 mb-1 fw-bold'>Production country/countries:</p>
                        <ul>
                            {movie.production_countries.map((country, index) => (
                                <li key={index}>{country.name}</li>
                            ))}
                        </ul>

                        <p><span className='fw-bold'>Release date:</span> {category === 'movies' ? movie.release_date : movie.first_air_date}</p>

                        <p><span className='fw-bold'>{category === 'movies' ? 'Runtime:' : 'Episode runtime:'}</span> {category === 'movies' ? movie.runtime : movie.episode_run_time !== null && Array.isArray(movie.episode_run_time) ?  movie.episode_run_time.join(", ") : movie.episode_run_time !== null && !Array.isArray(movie.episode_run_time) ? movie.episode_run_time : null} minutes</p>


                        <p className='pb-0 mb-1 fw-bold'>
                            Genres:
                        </p>
                        <ul>
                            {movie.genres.map(genre => (
                                <li key={genre.id}>{genre.name}</li>
                            ))}
                        </ul>
                        <p className='pb-0 mb-1 fw-bold'>Cast:</p>
                        <ul>
                            {movie.credits.cast.map((cast, index) => (
                                <li key={index}><Link to={`/actors/${cast.id}`}>{cast.name}</Link></li>
                            ))}
                        </ul>

                        {similarMovies &&
                            <>
                                <p className='pb-0 mb-1 fw-bold'>Similar movies:</p>
                                <ul>
                                    {similarMovies.results.map((movie, index) => (
                                        <li key={index}><Link to={`/movies/${movie.id}`}>{movie.title}</Link></li>
                                    ))}
                                </ul>
                            </>}
                    </div>

                </div>

                <Button variant="primary" onClick={() => navigate(-1)}>&laquo; Back</Button>
            </>}
        </Container>
    )
}

export default MoviePage
