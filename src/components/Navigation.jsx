import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'
import MovieIcon from '../assets/icons/movie-icon.jpeg'
import Search from './Search'
import useNavigateSearch from '../hooks/useNavigateSearch'

const Navigation = () => {
	
	const navigateSearch = useNavigateSearch();

	const handleSearch = async (query, page = 1) => {
		navigateSearch('search', {query: query, page: page})
	}

	
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container className="nav-container">
				<Navbar.Brand as={Link} to="/"><img src={MovieIcon} className='movie-icon' alt='movie-icon' width="40"></img>The Movie DB</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} end to="/now-playing">
							Now playing
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/popular-movies">
						    Popular
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/top-movies">
						    Top 
						</Nav.Link>
						<Nav.Link as={NavLink} end to="/genres">Genres</Nav.Link>
						<Nav.Link as={NavLink} end to="/trending">
						    Trending
						</Nav.Link>
						<Search onSearch={handleSearch}/>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
