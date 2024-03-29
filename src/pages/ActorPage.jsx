import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import WarningAlert from "../components/alerts/WarningAlert";
import useActor from "../hooks/useActor";
import { useEffect, useState } from "react";
import ActorImage from "../assets/images/actor.png";
import MoviesCarousel from "../components/MoviesCarousel";
import { Link } from "react-router-dom";
import MovieImage from "../assets/images/movie.png";
import MoviesCarouselCrew from "../components/MoviesCarouselCrew";
import useActorSeries from "../hooks/useActorSeries";

const ActorPage = () => {
  const { id } = useParams();
  const { data: actor, error, isError, isLoading } = useActor(id);
  const {data: actorSeries} = useActorSeries(id);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showAllSeries, setShowAllSeries] = useState(false);
  const [showAllMoviesCrew, setShowAllMoviesCrew] = useState(false);
  const [showAllSeriesCrew, setShowAllSeriesCrew] = useState(false);
  const [ageOfDeath, setAgeofDeath] = useState(null);
  const [age, setAge] = useState(null);

  console.log(actorSeries)

  const toggleBiography = () => {
    setShowFullBiography(!showFullBiography);
  };

  const splitBiography = (biography) => {
    const lines = biography.split("\n");
    return showFullBiography ? lines : lines.slice(0, 2);
  };

  const toggleAllMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  const toggleAllSeries = () => {
    setShowAllSeries(!showAllSeries);
  };

  const toggleAllMoviesCrew = () => {
    setShowAllMoviesCrew(!showAllMoviesCrew);
  };

  const toggleAllSeriesCrew = () => {
    setShowAllSeriesCrew(!showAllSeriesCrew);
  };

  function calculateExactAgeAtDeath(birthdate, deathdate) {
    const birthDateObj = new Date(birthdate);
    const deathDateObj = new Date(deathdate);

    if (isNaN(birthDateObj) || isNaN(deathDateObj)) {
      return "Invalid date";
    }

    let years = deathDateObj.getFullYear() - birthDateObj.getFullYear();
    let months = deathDateObj.getMonth() - birthDateObj.getMonth();
    let days = deathDateObj.getDate() - birthDateObj.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    return ` (${years})`;
  }
  function calculateAge(birthdate) {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();

    if (isNaN(birthDateObj)) {
      return "Invalid date";
    }

    let years = currentDate.getFullYear() - birthDateObj.getFullYear();
    let months = currentDate.getMonth() - birthDateObj.getMonth();
    let days = currentDate.getDate() - birthDateObj.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    return `(${years})`;
  }

  useEffect(() => {
    if (actor) {
      if (actor.birthday && actor.deathday) {
        const ageAtDeath = calculateExactAgeAtDeath(
          actor.birthday,
          actor.deathday
        );
        setAgeofDeath(ageAtDeath);
      }
      if (actor.birthday && !actor.deathday) {
        const actorAge = calculateAge(actor.birthday);
        setAge(actorAge);
      }
    }
  }, [actor]);

  const filteredCrew = actor?.credits.crew.filter(
    (movie) => movie.job !== "Thanks"
  ) .sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });
  const filteredSeriesCrew = actorSeries?.crew.filter(
    (movie) => movie.job !== "Thanks"
  ) .sort((a, b) => {
    return new Date(b.first_air_date) - new Date(a.first_air_date);
  });

  const sortedMovies = actor?.credits.cast
  .sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date);
  });


  const sortedSeries = actorSeries?.cast
  .sort((a, b) => {
    return new Date(b.first_air_date) - new Date(a.first_air_date);
  });


  return (
    <div className="actor-page-container">
      {isLoading && <LoadingSpinner />}

      {isError && <WarningAlert message={error.message} />}

      {actor && (
        <Container className="py-3">
          <div className="actor-page-intro-content">
            <h3>{actor.name}</h3>

            <div className="actor-info-container">
              <img
                src={
                  actor.profile_path === null
                    ? ActorImage
                    : `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                }
                alt="Actor poster"
                width={300}
              ></img>

              <div className="actor-info">
                <p className="pt-2 actor-biography">
                  {splitBiography(actor.biography).join("\n")}{" "}
                </p>
                {actor.biography.split("\n").length > 4 && (
                  <button
                    className="show-biography-button"
                    onClick={toggleBiography}
                  >
                    {showFullBiography ? "Show Less" : "Show More"}
                  </button>
                )}

                <div className="info-table">
                  <div className="info-row">
                    <div className="header-column">
                      <p className="fw-bold actor-info-title">Birthday</p>
                    </div>
                    <div className="info-column">
                      <p>
                        {actor.birthday}{" "}
                        <span className="actor-age">{age}</span>
                      </p>
                    </div>
                  </div>
                  {actor.deathday ? (
                    <div className="info-row">
                      <div className="header-column">
                        <p className="fw-bold actor-info-title">Deathday</p>
                      </div>
                      <div className="info-column">
                        <p>
                          {actor.deathday}{" "}
                          <span className="actor-death-age">{ageOfDeath}</span>
                        </p>
                      </div>
                    </div>
                  ) : null}
                  <div className="info-row">
                    <div className="header-column">
                      <p className="fw-bold actor-info-title">Place of birth</p>
                    </div>
                    <div className="info-column">
                      <p>{actor.place_of_birth}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sortedMovies && sortedMovies.length > 0 ? (
              <>
                {showAllMovies ? (
                  <div className="all-movies-list">
                    <h5 className="mb-4">All Movies</h5>
                    <div className="movies-columns">
                      {sortedMovies
                        .map((movie, index) => (
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
                                {movie.release_date.substring(0, 4)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <MoviesCarousel
                    movies={sortedMovies.slice(0, 12)}
                    text="Movies (actor)"
                    type="movie"
                  />
                )}
             {sortedMovies.length > 12 ?  <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllMovies}>
                    {showAllMovies ? "Close all movies (actor)" : "All movies (actor)"}
                  </button>
                </div> : null}
              </>
            ) : null}

            {sortedSeries && sortedSeries.length > 0 ? (
              <>
                {showAllSeries ? (
                  <div className="all-movies-list">
                    <h5 className="mb-4">All Series</h5>
                    <div className="movies-columns">
                      {sortedSeries
                        .map((movie, index) => (
                          <div key={index} className="movie-item">
                            <a href={`/tv/${movie.id}`}>
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
                                to={`/tv/${movie.id}`}
                              >
                                {movie.title}
                              </Link>
                              <p className="actor-movies-year">
                                {movie.first_air_date.substring(0, 4)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <MoviesCarousel
                    movies={sortedSeries.slice(0, 12)}
                    text="Series (actor)"
                    type="tv"
                  />
                )}
             {sortedSeries.length > 12 ?  <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllSeries}>
                    {showAllSeries ? "Close all series (actor)" : "All series (actor)"}
                  </button>
                </div> : null}
              </>
            ) : null}


            {filteredCrew && filteredCrew.length > 0 ? (
              <>
                {showAllMoviesCrew ? (
                  <div className="all-movies-list">
                    <h5 className="mb-4">All Movies</h5>
                    <div className="movies-columns">
                      {filteredCrew.map((movie, index) => (
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
                            <p className="actor-movies-year mb-1">
                              {movie.release_date.substring(0, 4)}
                            </p>
                            <p className="actor-movies-job">{movie.job}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <MoviesCarouselCrew
                    movies={filteredCrew.slice(0, 12)}
                    text="Movies (crew)"
                    type="movie"
                  />
                )}
               { filteredCrew.length > 12 ? <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllMoviesCrew}>
                    {showAllMoviesCrew ? "Close all movies (crew)" : "All movies (crew)"}
                  </button>
                </div> : null }
              </>
            ) : null}

{filteredSeriesCrew && filteredSeriesCrew.length > 0 ? (
              <>
                {showAllSeriesCrew ? (
                  <div className="all-movies-list">
                    <h5 className="mb-4">All Series</h5>
                    <div className="movies-columns">
                      {filteredSeriesCrew.map((movie, index) => (
                        <div key={index} className="movie-item">
                          <a href={`/tv/${movie.id}`}>
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
                              to={`/tv/${movie.id}`}
                            >
                              {movie.title}
                            </Link>
                            <p className="actor-movies-year mb-1">
                              {movie.first_air_date.substring(0, 4)}
                            </p>
                            <p className="actor-movies-job">{movie.job}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <MoviesCarouselCrew
                    movies={filteredSeriesCrew.slice(0, 12)}
                    text="Series (crew)"
                    type="tv"
                  />
                )}
               { filteredSeriesCrew.length > 12 ? <div className="show-cast-button-container mt-4">
                  <button onClick={toggleAllSeriesCrew}>
                    {showAllSeriesCrew ? "Close all series (crew)" : "All series (crew)"}
                  </button>
                </div> : null }
              </>
            ) : null}
          </div>
        </Container>
      )}
    </div>
  );
};

export default ActorPage;
