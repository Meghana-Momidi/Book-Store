import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import BestSellers from "../components/BestSellers";
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import News from "../components/News";
import { useFetchAllBooksQuery } from "../features/books/booksApi";
 
const Home = () => {
  const { data: books = [], isFetching } = useFetchAllBooksQuery();
  console.log(books);
  

  const bestSellersId = "bestSellers-section";

  return (
    <div className="w-full h-full">
      <Banner bestSellersId={bestSellersId} />
      <Carousel />
      <BestSellers books={books} isLoading={isFetching} id={bestSellersId} />
      <Trending books={books} isLoading={isFetching} />
      <News />
    </div>
  );
};

export default Home;
