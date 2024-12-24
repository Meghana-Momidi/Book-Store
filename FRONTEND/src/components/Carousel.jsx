import React, { useEffect, useState } from "react";
import image1 from "../assets/carousel-images/image-1.webp";
import image2 from "../assets/carousel-images/image-2.jpg";
import image3 from "../assets/carousel-images/image-3.jpg";
import image4 from "../assets/carousel-images/image-4.png"; 
import image5 from "../assets/carousel-images/image-5.jpg";
import image6 from "../assets/carousel-images/image-6.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1, image2, image3, image4, image5, image6];

  // Automatically switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); 
  }, [currentIndex]); 

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDots = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden pb-6 hidden lg:block" aria-label="Image Carousel">
      <div className="relative w-full h-full" aria-live="polite" aria-atomic="true">
      
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            role="tabpanel"
            aria-hidden={index !== currentIndex}
          >
            <img
              src={item}
              alt={`Slide ${index + 1} of the carousel`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 font-semibold"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 font-semibold"
        onClick={handleNext}
        aria-label="Next slide"
      >
        &#10095;
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3.5 h-3.5 rounded-full transition duration-300 border border-black ${index === currentIndex ? "bg-white" : "bg-transparent"}`}
            onClick={() => handleDots(index)}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
