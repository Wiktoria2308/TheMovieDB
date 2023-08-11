import {AiFillStar, AiFillPlayCircle} from 'react-icons/ai'

const SidebarSlider = ({ movies, text, type }) => {

	return (
        <div className="slider-wrapper">
        <h4 className="slider-title">{text}</h4>
        {movies.map((movie, index) => (
        <div className="slider-card" key={index}>
         
            {type === "movies" ? 
            <a className='image-link' href={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie poster"
            />
            </a> : null}
            {type === "tv" ?   <a href={`/tv/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="TV serie poster"
              />
              </a> : null}
          
            <div className="slider-movie-card-text-content">
            <div className="slider-card-trailer">
                <AiFillPlayCircle color="white" className="play-icon"/>
                <span>Trailer</span>
              </div>
              {type === "movies" ?  <a className="slider-movie-title" href={`/movies/${movie.id}`}>{movie.title}</a> : null}
              {type === "tv" ?  <a className="slider-movie-title" href={`/tv/${movie.id}`}>{movie.name}</a> : null}
              <span className='movie-date'>{movie.release_date.slice(0,4)}</span>
              <div className="slider-movies-ratings">
                <AiFillStar color="yellow" className="rating-icon"/>
                <span>{movie.vote_average}
                </span>
              </div>
             
            </div>
          </div>
      ))}
    </div>
	);
};

export default SidebarSlider;



