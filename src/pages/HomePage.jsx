import { useState } from "react";
import { Link } from "react-router-dom";
import MovieIcon from '../assets/icons/movie-icon.jpeg'
import usePopularMovies from '../hooks/usePopularMovies'
import NewCarousel from "../components/NewCarousel";

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

  const { data: popularMovies, error, isError, isLoading } = usePopularMovies()


  return (
    <>
      <div className="py-3 home-page">
		<div className="sidebar-container">
			<img src={MovieIcon} alt="" width={300}/>
		</div>
		<div className="carousels-container">
   { popularMovies ?  <NewCarousel cards={popularMovies}/> : null }
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
                      src={`https://image.tmdb.org/t/p/w500${movie.image}`}
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
