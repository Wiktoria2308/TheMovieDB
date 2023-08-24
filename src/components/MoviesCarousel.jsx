import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {AiFillStar, AiFillPlayCircle} from 'react-icons/ai'
import MovieImage from '../assets/images/movie.png'
import { useState } from "react";
import TrailerModal from "./TrailerModal";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const MoviesCarousel = ({ movies, text, type }) => {

  const [trailerId, setTrailerId] = useState(null);
  const [trailerName, setTrailerName] = useState(null);

  const handleTrailer = (movie) => {
    setTrailerId(movie.id)
    if(type === 'movie') {
      setTrailerName(movie.title)
    }
    else {
      setTrailerName(movie.name)
    }
    
  }

  return (
    <div className="carousel-wrapper">
    <h4 className="carousel-title">{text}</h4>
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      keyBoardControl={true}
      transitionDuration={0}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
  {movies.map((movie, index) => (
        <div className="carousel-card" key={index}>
          <div className="carousel-card-content">
            {type === "movie" ? 
            <a href={`/movies/${movie.id}`}>
            <img
              src={movie.poster_path === null ? MovieImage : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie poster"
            />
            </a> : null}
            {type === "tv" ?   <a href={`/tv/${movie.id}`}>
              <img
                src={movie.poster_path === null ? MovieImage : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="TV serie poster"
              />
              </a> : null}
            <div className="movie-card-text-content">
              <div className="carousel-movies-ratings">
                <AiFillStar color="yellow" className="rating-icon"/>
                <span>{movie.vote_average}</span>
              </div>
              {type === "movie" ?  <a className="carousel-movie-title" href={`/movies/${movie.id}`}>{movie.title}</a> : null}
              {type === "tv" ?  <a className="carousel-movie-title" href={`/tv/${movie.id}`}>{movie.name}</a> : null}              
              <div className="carousel-card-trailer" onClick={() => handleTrailer(movie)}>
                <AiFillPlayCircle color="white" className="play-icon"/>
                <span>Trailer</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
    {trailerId ? <TrailerModal setTrailerId={setTrailerId} setTrailerName={setTrailerName} id={trailerId} type={type} name={trailerName}/> : null }
    </div>
  );
};

export default MoviesCarousel;