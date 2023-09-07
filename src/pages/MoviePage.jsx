import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import useMovie from "../hooks/useMovie";
import useTV from "../hooks/useTV";
import { Link, useNavigate } from "react-router-dom";
import MovieImage from "../assets/images/movie.png";
import Button from "react-bootstrap/Button";
import useSimilarMovies from "../hooks/useSimilarMovies";
import useLocalStorage from "../hooks/useLocalStorage";
import { AiFillStar } from "react-icons/ai";
import PersonCarousel from "../components/PersonCarousel";

const MoviePage = () => {
  const { category, id } = useParams();
  const {
    data: movie,
    error,
    isError,
    isLoading,
  } = category === "movies" ? useMovie(id) : useTV(id);
  const { data: similarMovies } = useSimilarMovies(id);
  const navigate = useNavigate();

  // call localsotrage hook to save shown movie in localstorage
  useLocalStorage(movie, id);

  return (
    <div className="movie-page-container">
      {movie && (
        <>
          <Container className="py-4">
            {isLoading && <LoadingSpinner />}

            {isError && <WarningAlert message={error.message} />}

            <>
              <div className="movie-page-intro-content">
                <div className="intro-content container">
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
                              <span
                                className="movie-crew-link"
                                key={director.id}
                              >
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
                                item.job === "Writer" ||
                                item.job === "Screenplay"
                            )
                            .map((writer, index, array) => (
                              <span className="movie-crew-link" key={writer.id}>
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

              <PersonCarousel cast={movie.credits.cast} />

              <div className="movie-similar-container">
                {similarMovies && (
                  <>
                    <p className="pb-0 mb-1 fw-bold">Similar movies:</p>
                    <ul>
                      {similarMovies.results.map((movie, index) => (
                        <li key={index}>
                          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <Button variant="primary" onClick={() => navigate(-1)}>
                &laquo; Back
              </Button>
            </>
          </Container>
        </>
      )}
    </div>
  );
};

export default MoviePage;
