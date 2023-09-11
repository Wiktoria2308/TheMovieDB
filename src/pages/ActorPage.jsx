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

const ActorPage = () => {
  const { id } = useParams();
  const { data: actor, error, isError, isLoading } = useActor(id);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [ageOfDeath, setAgeofDeath] = useState(null);

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

  useEffect(() => {
    if (actor && actor.deathday) {
      const ageAtDeath = calculateExactAgeAtDeath(
        actor.birthday,
        actor.deathday
      );
      setAgeofDeath(ageAtDeath);
    }
  }, [actor]);

  return (
    <div className="actor-page-container">
      {actor && (
        <Container className="py-3">
          {isLoading && <LoadingSpinner />}

          {isError && <WarningAlert message={error.message} />}
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
                      <p>{actor.birthday}</p>
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
            {actor.credits.cast.length > 0 ? (
              <>
                {showAllMovies ? (
                  <div className="all-movies-list">
                    <h5 className="mb-4">All Movies</h5>
                    <div className="movies-columns">
                      {actor.credits.cast.map((movie, index) => (
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
                    movies={actor.credits.cast.slice(0, 12)}
                    text="Movies"
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
          </div>
        </Container>
      )}
    </div>
  );
};

export default ActorPage;
