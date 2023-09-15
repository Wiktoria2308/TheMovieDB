import { useState } from "react";
import { Link } from "react-router-dom";
import useMovies from "../hooks/useMovies";
import usePopularSeries from "../hooks/usePopularSeries";
import MoviesCarousel from "../components/MoviesCarousel";
import SidebarSlider from "../components/SidebarSlider";
import MovieImage from "../assets/images/movie.png";

const HomePage = () => {
  const [movies, setMovies] = useState(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies"))
      : []
  );

  const handleClearHistory = () => {
    localStorage.setItem("movies", []);
    setMovies([]);
  };

  const {
    data: popularMovies,
    error: errorMovies,
    isError: isErrorMovies,
    isLoading: isLoadingMovies,
  } = useMovies('movie', "popular", 1);
  const {
    data: popularSeries,
    error: errorSeries,
    isError: isErrorSeries,
    isLoading: isLoadingSeries,
  } = usePopularSeries();
  const {
    data: topMovies,
    error: errorTop,
    isError: isErrorTop,
    isLoading: isLoadingTop,
  } = useMovies('movie',"top_rated", 1);

  return (
    <>
    <div className="home-page-sliders-wrapper">
      <div className="home-page-sliders">
        <div className="sidebar-container">
          {topMovies ? (
            <SidebarSlider
              movies={topMovies.results}
              type="movie"
              text="Top movies"
            />
          ) : null}
        </div>
        <div className="carousels-container">
          {popularMovies ? (
            <MoviesCarousel
              movies={popularMovies.results}
              type="movie"
              text="Most popular movies"
            />
          ) : null}
          {popularSeries ? (
            <MoviesCarousel
              movies={popularSeries}
              type="tv"
              text="Most popular TV series"
            />
          ) : null}
        </div>
      </div>
      </div>
      {movies.length ? (
        <div className="viewed-container">
          <div className="viewed-text-container">
            <h3 className="text-white viewed-text">Recently viewed</h3>
            <p className="text-white" onClick={handleClearHistory}>
              Clear history
            </p>
          </div>

          <ul className="viewed-image-container">
            {movies.map((movie, index) => (
              <li key={index}>
                {" "}
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="viewed-image"
                    src={
                      movie.image === null
                        ? MovieImage
                        : `https://image.tmdb.org/t/p/w500${movie.image}`
                    }
                    alt="movie poster"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-white clear-viewed-history-mobile" onClick={handleClearHistory}>
              Clear history
            </p>
        </div>
      ) : null}
    </>
  );
};

export default HomePage;
