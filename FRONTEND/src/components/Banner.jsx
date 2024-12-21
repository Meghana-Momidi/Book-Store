import React from "react"; 
import bannerImg from "../assets/banner.png";

const Banner = ({ bestSellersId }) => {
  return (
    <section
      className="flex flex-col md:flex-row-reverse lg:hidden py-16 justify-between items-center gap-12 mx-6"
      aria-labelledby="banner-heading"
    >
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img
          className="mx-auto"
          src={bannerImg}
          alt="Banner showcasing monthly bestsellers with a curated selection of top books"
          loading="lazy"
        />
      </div>

      <div className="md:w-1/2 w-full text-center">
        <h1
          id="banner-heading"
          className="md:text-5xl text-2xl font-medium mb-7 font-headings"
        >
          Discover This Month's Bestsellers
        </h1>
        <p
          className="mb-10"
          aria-live="polite"
          aria-atomic="true"
          role="status"
        >
          Explore the top picks of the month that are making waves in the
          literary scene! From gripping mysteries to heartwarming romances,
          there's a perfect read for every book lover. Dive into our curated
          selection and find your next favorite book!
        </p>

        <a
          href={`#${bestSellersId}`}
          className="btn-primary w-full mx-auto"
          aria-label="View this month's bestsellers"
        >
          View Bestsellers
        </a>
      </div>
    </section>
  );
};

export default Banner;
