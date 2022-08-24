import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import useNowPlaying from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopMovies from '../hooks/useTopMovies'
import MovieIcon from '../assets/icons/movie-icon.jpeg'

const Navigation = () => {
	const { data: nowPlaying} = useNowPlaying()
	const { data: popularMovies} = usePopularMovies()
	const { data: topMovies} = useTopMovies()
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/"><img src={MovieIcon} className='movie-icon' alt='movie-icon' width="40"></img>Wiktoria Movie Database</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} end to="/nowPlaying">
							Now playing&nbsp;
							{
								nowPlaying
									? `(${nowPlaying.length})`
									: ''
							}
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/popularMovies">
						    Current popular&nbsp;
							{
								popularMovies
									? `(${popularMovies.length})`
									: ''
							}
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/topMovies">
						    Top movies&nbsp;
							{
								topMovies
									? `(${topMovies.length})`
									: ''
							}
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/genres">Movie Genres</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
