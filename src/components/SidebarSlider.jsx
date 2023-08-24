import {AiFillStar, AiFillPlayCircle} from 'react-icons/ai'
import MovieImage from '../assets/images/movie.png'
import { useState } from "react";
import TrailerModal from "./TrailerModal";

const SidebarSlider = ({ movies, text, type }) => {
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
        <div className="slider-wrapper">
        <h4 className="slider-title">{text}</h4>
        {movies.map((movie, index) => (
        <div className="slider-card" key={index}>
         
            {type === "movie" ? 
            <a className='image-link' href={`/movies/${movie.id}`}>
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
          
            <div className="slider-movie-card-text-content">
            <div className="slider-card-trailer"  onClick={() => handleTrailer(movie)}>
                <AiFillPlayCircle color="white" className="play-icon"/>
                <span>Trailer</span>
              </div>
              {type === "movie" ?  <a className="slider-movie-title" href={`/movies/${movie.id}`}>{movie.title}</a> : null}
              {type === "tv" ?  <a className="slider-movie-title" href={`/tv/${movie.id}`}>{movie.name}</a> : null}

              <p className='movie-date'>{movie.release_date.slice(0,4)}</p>
              <div className="slider-movies-ratings">
                <AiFillStar color="yellow" className="rating-icon"/>
                <span>{movie.vote_average}
                </span>
              </div>
             
            </div>
          </div>
      ))}
      {trailerId ? <TrailerModal setTrailerId={setTrailerId} setTrailerName={setTrailerName} id={trailerId} type={type} name={trailerName}/> : null }

    </div>
	);
};

export default SidebarSlider;



