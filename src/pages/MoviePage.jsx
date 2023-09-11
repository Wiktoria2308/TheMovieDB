import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import useMovie from "../hooks/useMovie";
import useTV from "../hooks/useTV";
import { Link } from "react-router-dom";
import MovieImage from "../assets/images/movie.png";
import useSimilarMovies from "../hooks/useSimilarMovies";
import useLocalStorage from "../hooks/useLocalStorage";
import { AiFillStar } from "react-icons/ai";
import PersonCarousel from "../components/PersonCarousel";
import MoviesCarousel from "../components/MoviesCarousel";
import { useState } from "react";
import PersonImage from '../assets/images/actor.png'
const MoviePage = () => {
  const { category, id } = useParams();
  const {
    data: movie,
    error,
    isError,
    isLoading,
  } = category === "movies" ? useMovie(id) : useTV(id);
  const { data: similarMovies } = useSimilarMovies(id);
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);

  const toggleAllMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  console.log(movie)
  // call localsotrage hook to save shown movie in localstorage
  useLocalStorage(movie, id);

  const toggleAllCast = () => {
    setShowAllCast(!showAllCast);
  };

  return (
    <div className="movie-page-container">
      {movie && (
        <Container className="py-4">
          {isLoading && <LoadingSpinner />}

          {isError && <WarningAlert message={error.message} />}

          <div className="movie-page-intro-content">
            <div className="intro-content">
              <h3 className="mb-0 text-uppercase">
                {movie.title ? movie.title : movie.name}
              </h3>
              <div className="d-flex">
                <p className="me-3 mb-0">
                  {category === "movies"
                    ? movie.release_date.substring(0, 4)
                    : movie.first_air_date.substring(0, 4)}
                </p>
                <p className="mb-0">
                  {category === "movies"
                    ? movie.runtime < 60
                      ? `${movie.runtime}m`
                      : `${Math.floor(movie.runtime / 60)}h ${
                          movie.runtime % 60
                        }m`
                    : movie.episode_run_time !== null &&
                      Array.isArray(movie.episode_run_time)
                    ? movie.episode_run_time.map((time, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          {time < 60
                            ? `${time}m`
                            : `${Math.floor(time / 60)}h ${time % 60}m`}
                        </span>
                      ))
                    : movie.episode_run_time !== null
                    ? movie.episode_run_time < 60
                      ? `${movie.episode_run_time}m`
                      : `${Math.floor(movie.episode_run_time / 60)}h ${
                          movie.episode_run_time % 60
                        }m`
                    : null}
                </p>
              </div>
              <div className="mt-2 d-flex align-items-center">
                <AiFillStar color="yellow" className="rating-icon" />
                <span className="rating-number">
                  {Number(movie.vote_average).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="movie-info-container">
            <img
              src={
                movie.poster_path === null
                  ? MovieImage
                  : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }
              alt="Movie poster"
              width={300}
            ></img>
            <div className="movie-info">
              <p className="py-3 movie-overview">{movie.overview}</p>

              <div className="info-table">
                <div className="info-row">
                  <div className="header-column">
                    <p className="fw-bold movie-info-title">Director</p>
                  </div>
                  <div className="info-column">
                    <p>
                      {movie.credits.crew
                        .filter((item) => item.job === "Director")
                        .map((director, index, array) => (
                          <span className="movie-crew-link" key={index}>
                            <Link to={`/person/${director.id}`}>
                              {director.name}
                            </Link>
                            {index !== array.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="header-column">
                    <p className="fw-bold movie-info-title">
                      {movie.credits.crew.filter(
                        (item) =>
                          item.job === "Screenplay" || item.job === "Writer"
                      ).length > 1
                        ? "Writers"
                        : "Writer"}
                    </p>
                  </div>
                  <div className="info-column">
                    <p>
                      {movie.credits.crew
                        .filter(
                          (item) =>
                            item.job === "Writer" || item.job === "Screenplay"
                        )
                        .map((writer, index, array) => (
                          <span className="movie-crew-link" key={index}>
                            <Link to={`/person/${writer.id}`}>
                              {writer.name}
                            </Link>
                            {index !== array.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="header-column">
                    <p className="fw-bold movie-info-title">Production</p>
                  </div>
                  <div className="info-column">
                    <p>
                      {movie.production_countries
                        .map((country) => country.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="info-row">
                  <div className="header-column">
                    <p className="fw-bold movie-info-title">Genre</p>
                  </div>
                  <div className="info-column">
                    <p>
                      {movie.genres.map((genre, index, array) => (
                        <span className="movie-crew-link" key={genre.id}>
                          <Link
                            to={`/movies-by-genre/${genre.id}/${genre.name}`}
                          >
                            {genre.name}
                          </Link>
                          {index !== array.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {movie.credits.cast.length > 0 ? (
            <div className="cast-list-container">
              {showAllCast ? (
                <div className="cast-list">
                  <h5 className="mb-4">All cast</h5>
                  <div className="cast-columns">
                    {movie.credits.cast.map((cast, index) => (
                      <div key={index} className="cast-item">
                        <a href={`/person/${cast.id}`}>
                          <img
                            src={
                              cast.profile_path === null
                                ? PersonImage
                                : `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                            }
                            alt="person-poster"
                          />
                        </a>
                        <div>
                          <Link
                            className="movies-cast-title-link"
                            to={`/person/${cast.id}`}
                          >
                            {cast.name}
                          </Link>
                          <p className="movies-cast-character">
                            {cast.character}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <PersonCarousel cast={movie.credits.cast} />
              )}
              <div className="show-cast-button-container mt-4">
                <button onClick={toggleAllCast}>
                  {showAllCast ? "Close All cast" : "All cast"}
                </button>
              </div>
            </div>
          ) : null}

          {similarMovies && similarMovies.results.length > 0 ? (
            <>
              {showAllMovies ? (
                <div className="all-movies-list">
                  <h5 className="mb-4">All movies</h5>
                  <div className="movies-columns">
                    {similarMovies.results.map((movie, index) => (
                      <div key={index} className="movie-item">
                        <a href={`/movies/${movie.id}`}>
                          <img
                            src={
                              movie.poster_path === null
                                ? MovieImage
                                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            }
                            alt="movie-poster"
                          />
                        </a>
                        <div>
                          <Link
                            className="actor-movies-title-link"
                            to={`/movies/${movie.id}`}
                          >
                            {movie.title}
                          </Link>
                          <p className="actor-movies-year">
                            {movie.release_date.substring(0, 4)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <MoviesCarousel
                  movies={similarMovies.results.slice(0, 12)}
                  text="Similar movies"
                  type="movie"
                />
              )}
              <div className="show-cast-button-container mt-4">
                <button onClick={toggleAllMovies}>
                  {showAllMovies ? "Close All movies" : "All movies"}
                </button>
              </div>
            </>
          ) : null}
        </Container>
      )}
    </div>
  );
};

export default MoviePage;
