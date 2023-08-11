import { useState } from "react";
import { Link } from "react-router-dom";
import MovieIcon from '../assets/icons/movie-icon.jpeg'
import usePopularMovies from '../hooks/usePopularMovies'
import usePopularSeries from '../hooks/usePopularSeries'
import useTopMovies from "../hooks/useTopMovies.js"
import MoviesCarousel from "../components/MoviesCarousel";
import SidebarSlider from "../components/SidebarSlider"
import MovieImage from '../assets/images/movie.png'


const HomePage = () => {
  // get movies from localstorage to show on page
  const [movies, setMovies] = useState(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies"))
      : []
  );

  const handleClearHistory = () => {
	localStorage.setItem('movies', [])
	setMovies([])
  }

  const { data: popularMovies, error: errorMovies, isError: isErrorMovies, isLoading: isLoadingMovies } = usePopularMovies()
  const { data: popularSeries, error: errorSeries, isError: isErrorSeries, isLoading: isLoadingSeries} = usePopularSeries()
  const { data: topMovies, error: errorTop, isError: isErrorTop, isLoading: isLoadingTop} = useTopMovies()


  return (
    <>
      <div className="p-4 home-page">
		<div className="sidebar-container">
    { topMovies ?  <SidebarSlider movies={topMovies} type="movies" text='Top movies'/>  : null }

		</div>
		<div className="carousels-container">
   { popularMovies ?  <MoviesCarousel movies={popularMovies} type="movies" text='Most popular movies'/> : null }
   { popularSeries ?  <MoviesCarousel movies={popularSeries} type="tv" text='Most popular TV series'/>  : null }

		</div>
		
	  </div>
      <div className="viewed-container">
        {movies.length ? (
          <>
		  <div className="viewed-text-container">
		  <h3 className="text-white viewed-text">Recently viewed</h3>
		  <p className="text-white" onClick={handleClearHistory}>Clear history</p>
		  </div>
           
            <ul className="viewed-image-container">
              {movies.map((movie, index) => (
                <li key={index}>
                  {" "}
                  <Link to={`/movies/${movie.id}`}>
                    <img
                      className="viewed-image"
                      src={movie.image === null ? MovieImage : `https://image.tmdb.org/t/p/w500${movie.image}`}
                      alt="movie poster"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <div className="copyright-container">
          {" "}
          <a as={Link} to="/">
            <img
              src={MovieIcon}
              className="movie-icon"
              alt="movie-icon"
              width="30"
            ></img>
            The Movie DB <span>by Wiktoria Dobrzewinska</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default HomePage;
