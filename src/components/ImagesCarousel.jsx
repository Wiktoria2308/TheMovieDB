import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useRef, useEffect } from 'react';
import {MdOutlineClose} from 'react-icons/md'
import LoadingSpinner from "./LoadingSpinner";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 992 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ImagesCarousel = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const imageModalRef = useRef(null);

    const handleOverlayClick = (e) => {
      if (e.target === imageModalRef.current) {
        closeImageModal();
      }
    };

    const openImageModal = (path) => {
      setSelectedImage(path);
      setIsLoading(true);
    };
  
    const closeImageModal = () => {
      setSelectedImage(null);
      setIsLoading(false);
    };
  

    useEffect(() => {
      const handleImageLoad = () => {
        setIsLoading(false);
      };
  
      if (selectedImage) {
        const imgElement = new Image();
        imgElement.src = `https://image.tmdb.org/t/p/original${selectedImage}`;
        imgElement.addEventListener('load', handleImageLoad);
  
        return () => {
          imgElement.removeEventListener('load', handleImageLoad);
        };
      }
    }, [selectedImage]);
    
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
        {images.filter(
                (item) => item.iso_639_1 === "en" || item.iso_639_1 === null
              ).map((image, index) => (
          <div className="carousel-card" key={index}>
              <img
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt="movie image"
              onClick={() => openImageModal(image.file_path)}
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
             {isLoading ? (
              <LoadingSpinner />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/original${selectedImage}`}
                alt="larger movie image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesCarousel;
