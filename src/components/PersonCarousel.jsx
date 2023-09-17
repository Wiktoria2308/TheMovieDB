import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PersonImage from '../assets/images/actor.png'


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 6,
    slidesToSlide: 6
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 4,
    slidesToSlide: 4
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 3,
    slidesToSlide: 3
  }
};

const PersonCarousel = ({ cast, text }) => {

  return (
    <div className="carousel-wrapper carousel-person-wrapper">
    <h4 className="carousel-person-heading">{text}</h4>
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={false}
      keyBoardControl={true}
      transitionDuration={0}
      containerClass="carousel-container"
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
             <a className="carousel-movie-title carousel-person-character">{person.character ? person.character : person.job}</a>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
    </div>
  );
};

export default PersonCarousel;