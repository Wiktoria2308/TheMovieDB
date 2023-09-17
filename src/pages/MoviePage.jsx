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
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import PersonCarousel from "../components/PersonCarousel";
import MoviesCarousel from "../components/MoviesCarousel";
import { useState } from "react";
import PersonImage from "../assets/images/actor.png";
import useMoviesImages from "../hooks/useMoviesImages";
import ImagesCarousel from "../components/ImagesCarousel";
import TrailerModal from "../components/TrailerModal";

const MoviePage = () => {
  const { category, id } = useParams();
  const {
    data: movie,
    error,
    isError,
    isLoading,
  } = category === "movie" ? useMovie(id) : useTV(id);
  const { data: moviesImages } = useMoviesImages(id, category);
  const { data: similarMovies } = useSimilarMovies(id, category);
  const [showAllCast, setShowAllCast] = useState(false);
  const [showAllCrew, setShowAllCrew] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  const splitOverview = (overview) => {
    const lines = overview.split("\n");
    return showFullOverview ? lines : lines.slice(0, 2);
  };

  const toggleAllMovies = () => {
    setShowAllMovies(!showAllMovies);
  };
  // call localsotrage hook to save shown movie in localstorage
  useLocalStorage(movie, id);

  const toggleAllCast = () => {
    setShowAllCast(!showAllCast);
  };

  const toggleAllCrew = () => {
    setShowAllCrew(!showAllCrew);
  };

  const [trailerId, setTrailerId] = useState(null);
  const [trailerName, setTrailerName] = useState(null);

  const handleTrailer = (movie) => {
    setTrailerId(movie.id);
    if (category === "movie") {
      setTrailerName(movie.title);
    } else {
      setTrailerName(movie.name);
    }
  };

  return (
    <div className="movie-page-container">
      {isLoading && <LoadingSpinner />}

      {isError && <WarningAlert message={error.message} />}

      {movie ? (
        <Container className="py-4">
          <div className="movie-page-intro-content">
            <div className="intro-content">
              <h3 className="mb-0 text-uppercase">
                {movie.title ? movie.title : movie.name}
              </h3>
              <div className="d-flex">
                <p className="me-3 mb-0">
                  {category === "movie"
                    ? movie.release_date.substring(0, 4)
                    : category === "tv"
                    ? `${movie.first_air_date.substring(0, 4)}${
                        movie.in_production
                          ? ""
                          : ` - ${movie.last_air_date.substring(0, 4)}`
                      }`
                    : ""}
                </p>

                <p className="me-3 mb-0">
                  {category === "tv"
                    ? movie.seasons.length === 1
                      ? "1 season"
                      : movie.seasons.length > 1
                      ? `${movie.seasons.length} seasons`
                      : null
                    : null}
                </p>

                <p className="mb-0">
                  {category === "movie"
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
                <div
                  className="movie-page-trailer"
                  onClick={() => handleTrailer(movie)}
                >
                  <AiFillPlayCircle color="white" className="play-icon" />
                  <span>Trailer</span>
                </div>
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
              <p className="pt-2 movie-overview">
                {splitOverview(movie.overview).join("\n")}{" "}
              </p>
              {movie.overview.split("\n").length > 4 && (
                <button
                  className="show-overview-button"
                  onClick={toggleOverview}
                >
                  {showFullOverview ? "Show Less" : "Show More"}
                </button>
              )}

              <div className="info-table">
                {movie.credits &&
                  movie.credits.crew.some(
                    (item) => item.job === "Director"
                  ) && (
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
                  )}
                {category === "tv" && (
                  <>
                    {movie.created_by.length > 0 && (
                      <div className="info-row">
                        <div className="header-column">
                          <p className="fw-bold movie-info-title">Created by</p>
                        </div>
                        <div className="info-column">
                          <p>
                            {movie.created_by.map((creator, index, array) => (
                              <span className="movie-crew-link" key={index}>
                                <Link to={`/person/${creator.id}`}>
                                  {creator.name}
                                </Link>
                                {index !== array.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {movie.credits &&
                  movie.credits.crew.some(
                    (item) => item.job === "Screenplay" || item.job === "Writer"
                  ) && (
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
                  )}
                {movie.production_countries &&
                movie.production_countries.length > 1 ? (
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
                ) : null}

                {movie.genres && movie.genres.length > 1 ? (
                  <div className="info-row">
                    <div className="header-column">
                      <p className="fw-bold movie-info-title">Genre</p>
                    </div>
                    <div className="info-column">
                      <p>
                        {movie.genres.map((genre, index, array) => (
                          <span className="movie-crew-link" key={genre.id}>
                            <Link
                              to={`/${
                                category === "movie"
                                  ? "movies-by-genre"
                                  : "series-by-genre"
                              }/${genre.id}/${genre.name}`}
                            >
                              {genre.name}
                            </Link>
                            {index !== array.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {moviesImages && moviesImages.backdrops.length > 0 ? (
            <ImagesCarousel
              images={moviesImages.backdrops.filter(
                (item) => item.iso_639_1 === "en" || item.iso_639_1 === null
              )}
            />
          ) : null}

          {movie.credits && movie.credits.cast.length > 0 ? (
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
                <PersonCarousel cast={movie.credits.cast} text="Cast" />
              )}
              <div className="show-cast-button-container mt-4">
                <button onClick={toggleAllCast}>
                  {showAllCast ? "Close All cast" : "All cast"}
                </button>
              </div>
            </div>
          ) : null}
          {movie.credits && movie.credits.crew.length > 0 ? (
            <div className="cast-list-container">
              {showAllCrew ? (
                <div className="cast-list">
                  <h5 className="mb-4">All crew</h5>
                  <div className="cast-columns">
                    {movie.credits.crew.map((cast, index) => (
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
                            {cast.job}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <PersonCarousel cast={movie.credits.crew} text="Crew" />
              )}
              <div className="show-cast-button-container mt-4">
                <button onClick={toggleAllCrew}>
                  {showAllCast ? "Close All crew" : "All crew"}
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
                        <a href={`/movie/${movie.id}`}>
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
                            to={`/movie/${movie.id}`}
                          >
                            {movie.title}
                          </Link>
                          <p className="actor-movies-year">
                            {movie.release_date
                              ? movie.release_date.substring(0, 4)
                              : null}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <MoviesCarousel
                  movies={similarMovies.results.slice(0, 12)}
                  text={
                    category === "movie" ? "Similar movies" : "Similar series"
                  }
                  type={category === "movie" ? "movie" : "tv"}
                />
              )}
              {category === "movies" ? (
                <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllMovies}>
                    {showAllMovies ? "Close All movies" : "All movies"}
                  </button>
                </div>
              ) : (
                <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllMovies}>
                    {showAllMovies ? "Close All series" : "All series"}
                  </button>
                </div>
              )}
            </>
          ) : null}
        </Container>
      ) : null}
      {trailerId ? (
        <TrailerModal
          setTrailerId={setTrailerId}
          setTrailerName={setTrailerName}
          id={trailerId}
          type={category}
          name={trailerName}
        />
      ) : null}
    </div>
  );
};

export default MoviePage;
