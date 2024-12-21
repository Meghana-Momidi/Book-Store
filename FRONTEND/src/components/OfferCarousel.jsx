import { useEffect, useState } from "react";

const OfferCarousel = ({ offers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + offers.length) % offers.length);
  };
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % offers.length);
  };

  return (
    <div
      className="relative overflow-hidden w-full bg-offerColor text-background font-semibold"
      role="region"
      aria-live="polite"
      aria-label="Special offers carousel"
    >
      <div className="flex items-center justify-between px-16 py-2">
        <button
          className="cursor-pointer"
          onClick={handlePrev}
          aria-label="Previous offer"
          tabIndex="0"
        >
          &#10094;
        </button>
        <div className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {offers.map((offer, index) => (
              <div key={index} className="flex-shrink-0 w-full text-center">
                {offer.title}
              </div>
            ))}
          </div>
        </div>
 
        <button
          className="cursor-pointer"
          onClick={handleNext}
          aria-label="Next offer"
          tabIndex="0"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};
export default OfferCarousel;
