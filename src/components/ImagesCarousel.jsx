import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useRef } from 'react';
import {MdOutlineClose} from 'react-icons/md'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 4,
    slidesToSlide: 4,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 3,
    slidesToSlide: 3,
  },
};

const ImagesCarousel = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imageModalRef = useRef(null);

    const handleOverlayClick = (e) => {
      if (e.target === imageModalRef.current) {
        closeImageModal();
      }
    };

    const openImageModal = (imageIndex) => {
      setSelectedImage(imageIndex);
    };
  
    const closeImageModal = () => {
      setSelectedImage(null);
    };
  return (
    <div className="movies-images-carousel">
      <h4 className="movies-images-heading">Images</h4>
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
        // removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {images.map((image, index) => (
          <div className="carousel-card" key={index}>
              <img
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt="movie image"
              onClick={() => openImageModal(index)}
            />
          </div>
        ))}
      </Carousel>
      {selectedImage !== null && (
        <div className="image-modal-overlay"
        onClick={handleOverlayClick}
          ref={imageModalRef}>
          <div className="image-modal">
             <MdOutlineClose className="close-button" onClick={closeImageModal}/>
            <img
              src={`https://image.tmdb.org/t/p/original${images[selectedImage].file_path}`}
              alt="larger movie image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesCarousel;
