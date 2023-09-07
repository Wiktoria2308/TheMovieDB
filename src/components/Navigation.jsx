import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import MovieIcon from "../assets/icons/movie-icon.jpeg";
import Search from "./Search";
import useNavigateSearch from "../hooks/useNavigateSearch";
import NavDropdown from "react-bootstrap/NavDropdown";
import useGenres from '../hooks/useGenres'


const Navigation = () => {
  const navigateSearch = useNavigateSearch();

  const { data: genres } = useGenres()


  const handleSearch = async (query, page = 1) => {
    navigateSearch("search", { query: query, page: page });
  };

    // here send time as day or week to navigate to selected page like: trending-movies/day
	const handleTrendingMovies = async(time) => {
		navigateSearch('trending-movies', {time})
	}

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="nav-container">
        <Navbar.Brand as={Link} to="/">
          <img
            src={MovieIcon}
            className="movie-icon"
            alt="movie-icon"
            width="40"
          ></img>
          <span>The Movie DB</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Search onSearch={handleSearch} />
            <Nav.Link as={NavLink} end to="/top-movies">
              Top
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/now-playing">
              Now playing
            </Nav.Link>
            <Nav.Link as={NavLink} end to="/popular-movies">
              Popular
            </Nav.Link>
            <NavDropdown title="Trending">
              <NavDropdown.Item onClick={() => handleTrendingMovies('day')}>
                Daily trending movies
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTrendingMovies('week')}>
                Weekly trending movies
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Genres">
            {genres ? genres.genres.map((genre, index) => (
              <NavDropdown.Item key={index} as={NavLink} to={`/movies-by-genre/${genre.id}/${genre.name}`}>
             {genre.name}
            </NavDropdown.Item>
                    )) : null}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
