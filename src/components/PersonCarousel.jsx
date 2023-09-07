import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PersonImage from '../assets/images/actor.png'


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 6,
    slidesToSlide: 6 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  }
};

const PersonCarousel = ({ cast }) => {

  return (
    <div className="carousel-wrapper">
    <h4 className="carousel-person-heading">Cast</h4>
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={false}
      keyBoardControl={true}
      transitionDuration={5000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
  {cast.slice(0, 12).map((person, index) => (
        <div className="carousel-card" key={index}>
          <div className="carousel-card-content">
            
            <a href={`/person/${person.id}`}>
            <img
              src={person.profile_path === null ? PersonImage : `https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt="movie poster"
            />
            </a>
            <div className="movie-card-text-content person-card-text-content">
             <a className="carousel-movie-title carousel-person-title" href={`/person/${person.id}`}>{person.name}</a>
             <a className="carousel-movie-title carousel-person-character">{person.character}</a>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
    <button>Show more cast</button>
    </div>
  );
};

export default PersonCarousel;