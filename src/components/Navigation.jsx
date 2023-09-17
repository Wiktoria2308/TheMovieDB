import { Link, NavLink } from "react-router-dom";
import MovieIcon from "../assets/icons/movie-icon.jpeg";
import Search from "./Search";
import useNavigateSearch from "../hooks/useNavigateSearch";
import {NavDropdown, Nav, Navbar, Container} from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import useGenres from "../hooks/useGenres";

const Navigation = () => {
  const navigateSearch = useNavigateSearch();

  const { data: genresMovies } = useGenres("movie");
  const { data: genresSeries } = useGenres("tv");

  const handleSearch = async (query, page = 1) => {
    navigateSearch("search", { query: query, page: page });
  };

  const handleTrendingMovies = async (time) => {
    navigateSearch("/movie/trending-movies", { time });
  };
  const handleTrendingSeries = async (time) => {
    navigateSearch("/tv/trending-series", { time });
  };

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
            <NavDropdown title="Top">
              <NavDropdown.Item as={NavLink} end to="/movie/top-movies">
                Movies
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/tv/top-movies">
                Series
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Now playing">
              <NavDropdown.Item as={NavLink} end to="/movie/now-playing">
                Movies
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/tv/on_the_air">
                Series
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Popular">
              <NavDropdown.Item as={NavLink} end to="/movie/popular-movies">
                Movies
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} end to="/tv/popular-series">
                Series
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Trending">
              <NavDropdown.Item onClick={() => handleTrendingMovies("day")}>
                Daily trending movies
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTrendingMovies("week")}>
                Weekly trending movies
              </NavDropdown.Item>
              <NavDropdown.Divider></NavDropdown.Divider>
              <NavDropdown.Item onClick={() => handleTrendingSeries("day")}>
                Daily trending series
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTrendingSeries("week")}>
                Weekly trending series
              </NavDropdown.Item>
            </NavDropdown>

    <NavDropdownMenu title="Genres">
            <DropdownSubmenu title="Movies" alignRight>
            {genresMovies
            ? genresMovies.genres.map((genre, index) => (
                <NavDropdown.Item
                  key={index}
                  as={NavLink}
                  to={`/movies-by-genre/${genre.id}/${genre.name}`}
                >
                  {genre.name}
                </NavDropdown.Item>
              ))
            : null}
              </DropdownSubmenu>
              <DropdownSubmenu title="Series" alignRight>
              {genresSeries
            ? genresSeries.genres.map((genre, index) => (
                <NavDropdown.Item
                  key={index}
                  as={NavLink}
                  to={`/series-by-genre/${genre.id}/${genre.name}`}
                >
                  {genre.name}
                </NavDropdown.Item>
              ))
            : null}
              </DropdownSubmenu>
          </NavDropdownMenu>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
