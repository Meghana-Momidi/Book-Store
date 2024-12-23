import axios from "axios";
import React, { useEffect, useState } from "react";
import getBaseURL from "../../utils/baseURL";
import Loader from "../../shared/Loader";
import { MdIncompleteCircle } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { MdTrendingUp } from "react-icons/md";

import RevenueChart from "../../components/Dashboard/RevenueChart";
import DoughnutChart from "../../components/Dashboard/DoughnutChart";
import UserOrdersDisplay from "../../components/Dashboard/UserOrdersDisplay";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${getBaseURL()}/api/admin/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error : ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-6 gap-6">
        <div className="flex xl:flex-col items-center p-8 bg-white shadow rounded-lg dark:bg-gray-800 xl:text-center bg-gradient-to-r from-blue-400 to-green-400 text-white ">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6 xl:mr-0">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="dark:dark-text xl:mt-4">
            <span className="block text-2xl font-bold">{data?.totalBooks}</span>
            <span className="block  xl:mt-1">Products</span>
          </div>
        </div>
        <div className="flex xl:flex-col items-center p-8 bg-white shadow rounded-lg dark:bg-gray-800 xl:text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6 xl:mr-0">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div className="xl:mt-4">
            <span className="block text-2xl font-bold">
              ${data?.totalSales}
            </span>
            <span className="block  xl:mt-1">Total Sales</span>
          </div>
        </div>
        <div className="flex xl:flex-col items-center p-8 bg-white shadow rounded-lg dark:bg-gray-800 xl:text-center bg-gradient-to-r from-pink-500 to-orange-400 text-white">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <MdTrendingUp className="h-6 w-6" />
          </div>
          <div className="xl:mt-4">
            <span className="inline-block text-2xl font-bold">
              {data?.trendingBooks}
            </span>
            <span className="inline-block text-xl font-semibold pl-2">
              ( {(Math.floor((data?.trendingBooks / data?.totalBooks) * 100))} %)
            </span>
            <span className="block xl:mt-1">Trending Books</span>
          </div>
        </div>
        <div className="flex xl:flex-col items-center p-8 bg-white shadow rounded-lg dark:bg-gray-800 xl:text-center bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6 xl:mr-0">
            <MdIncompleteCircle className="size-6" />
          </div>
          <div className="xl:mt-4">
            <span className="block text-2xl font-bold">
              {data?.totalOrders}
            </span>
            <span className="block xl:mt-1">Total Orders</span>
          </div>
        </div>
        <div className="flex xl:flex-col xl:col-span-2 md:col-span-2 items-center justify-center p-8 bg-white shadow rounded-lg dark:bg-gray-800 xl:text-center dark:text-white text-center">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-orange-600 bg-yellow-100 rounded-full mr-6 xl:mr-0">
            <GiBookshelf className="h-6 w-6" />
          </div>
          <div className="xl:mt-4">
            <span className="block text-2xl font-bold">
              {data?.totalBooksOrdered}
            </span>
            <span className="block xl:mt-1">Books Sold</span>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 xl:grid-flow-col gap-6">
        {/* revenue chart for no. of orders per month */}
        <div className="flex flex-col md:col-span-2 md:row-span-3 bg-white shadow rounded-lg dark:bg-gray-800">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 dark:text-gray-300">
            The number of orders per month
          </div>
          <div className="p-4 flex-grow dark:bg-gray-800">
            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md dark:bg-gray-800">
              <RevenueChart />
            </div>
          </div>
        </div>
        {/* doughnut chart for books sold by category */}
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg dark:bg-gray-800">
          <div className="px-6 py-5 font-semibold border-b border-gray-100 dark:text-gray-300 text-center">
            Books sold by category
          </div>
          <div className="p-4 flex-grow dark:bg-gray-800">
            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md dark:bg-gray-800">
              <div className="w-full h-full flex justify-center items-center">
                <DoughnutChart data={data?.booksSoldByCategory || []} />
              </div>
            </div>
          </div>
        </div>

        {/* Display users with most orders */}
        <div className="row-span-3 bg-white shadow rounded-lg dark:bg-gray-800">
          <UserOrdersDisplay data={data} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
