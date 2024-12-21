import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import news1 from "../assets/news/news-1.png";
import news2 from "../assets/news/news-2.png";
import news3 from "../assets/news/news-3.png";
import news4 from "../assets/news/news-4.png";
import { Link } from "react-router-dom";

const news = [
  {
    id: 1,
    title: "Global Climate Summit Calls for Urgent Action",
    description:
      "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
    image: news1,
    imageAlt: "Global Climate Summit",
  },
  {
    id: 2,
    title: "Breakthrough in AI Technology Announced",
    description:
      "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
    image: news2,
    imageAlt: "AI Technology Breakthrough",
  },
  {
    id: 3,
    title: "New Space Mission Aims to Explore Distant Galaxies",
    description:
      "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
    image: news3,
    imageAlt: "New Space Mission",
  },
  {
    id: 4,
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    description:
      "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
    image: news4,
    imageAlt: "Stock Market Growth",
  },
  {
    id: 5,
    title: "Innovative New Smartphone Released by Leading Tech Company",
    description:
      "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
    image: news2,
    imageAlt: "New Smartphone Release",
  },
];

const News = () => {
  return (
    <section className="my-10" aria-labelledby="news-section">
      <div className="w-10/12 mx-auto">
        <h2 className="font-headings text-4xl mb-3 text-center" id="news-section">
          <i>News</i>
        </h2>
        <div className="w-12 h-px bg-black mx-auto mb-10 dark:bg-white" aria-hidden="true"></div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          aria-live="polite"
        >
          {news.map((item) => (
            <SwiperSlide key={item.id} aria-labelledby={`news-item-${item.id}`}>
              <article className="flex flex-col sm:flex-row sm:justify-between items-center gap-12 w-full h-full dark:bg-dark-book-card" role="article">
                <div className="py-4 px-4">
                  <Link
                    to="/"
                    aria-label={`Read more about ${item.title}`}
                    role="link"
                    id={`news-item-${item.id}`}
                    aria-describedby={`news-description-${item.id}`}
                  >
                    <h3 className="text-lg font-medium hover:text-blue-500 mb-4">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="w-12 h-[4px] bg-primary mb-5"></div>
                  <p
                    className="text-sm text-gray-600 dark:text-gray-400"
                    id={`news-description-${item.id}`}
                    aria-hidden="true"
                  >
                    {item.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full object-cover"
                    loading="lazy"
                    aria-hidden="false"
                  />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default News;
