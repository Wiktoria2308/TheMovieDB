import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const NewCarousel = ({ cards }) => {

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      keyBoardControl={true}
      transitionDuration={100}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
  {cards.map((card, index) => (
        <div className="carousel-card" key={index}>
          <div className="carousel-card-content">
            <img
              src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              alt="movie poster"
            />
            <div className="movie-card-text-content">hej</div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default NewCarousel;