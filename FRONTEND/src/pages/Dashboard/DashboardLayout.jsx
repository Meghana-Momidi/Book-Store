import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FiSun} from "react-icons/fi";
import { PiMoon } from "react-icons/pi";
import { HiShoppingBag } from "react-icons/hi2";
import { ThemeProvider, useThemeContext } from "../../context/ThemeContext";
import { CssBaseline } from "@mui/material";

const DashboardContext = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const user = localStorage.getItem("currentUser");
  const { isDarkMode, toggleTheme } = useThemeContext();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <section className="flex md:bg-gray-200 min-h-screen overflow-hidden">
        <aside className="hidden sm:flex sm:flex-col bg-white md:w-20 lg:w-60 dark:bg-gray-900">
          <a
            href="/"
            className="flex items-center justify-center h-20 transform hover:scale-110 transition duration-300"
          >
            <HiShoppingBag className="text-4xl lg:text-3xl text-purple-500 transform hover:scale-110 transition duration-300" />
            <span className="hidden lg:block ml-3 font-semibold text-xl italic pt-2">
              Book Store
            </span>
          </a>
          <h2 className="border-y border-gray-400 py-3 w-full text-center uppercase text-purple-500 font-bold">menu</h2>
          <div className="flex-grow flex flex-col justify-between text-gray-500 ">
            <nav className="flex flex-col mx-4 my-6 space-y-4 text-center">
              <Link
                to="/dashboard"
                className="flex items-center justify-center lg:justify-start py-3 lg:pl-3 text-black hover:text-blue-600 rounded-lg transform hover:scale-110 transition duration-300 hover:bg-blue-100 w-full dark:text-gray-400 hover:dark:text-blue-800"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="hidden lg:flex pl-4 hover:dark:text-blue-800">Dashboard</span>
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="flex items-center justify-center lg:justify-start py-3 lg:pl-3 text-black hover:text-blue-600 rounded-lg transform hover:scale-110 transition duration-300 hover:bg-blue-100 w-full dark:text-gray-400 hover:dark:text-blue-800" 
              >
                <HiViewGridAdd className="h-6 w-6 text-blue-600" />
                <span className="hidden lg:flex pl-4 hover:dark:text-blue-800">Add Book</span>
              </Link>
              <Link
                to="/dashboard/manage-books"
                className="flex items-center justify-center lg:justify-start py-3 lg:pl-3 text-black hover:text-blue-600 rounded-lg transform hover:scale-110 transition duration-300 hover:bg-blue-100 w-full dark:text-gray-400 hover:dark:text-blue-800"
              >
                <span className="sr-only">Folders</span>
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <span className="hidden lg:flex pl-4 ">Manage Books</span>
              </Link>
            </nav>
          </div>
        </aside>
        <div className="flex-grow text-gray-800 h-screen overflow-y-auto dark:bg-dark-book-card">
          <header className="flex items-center justify-between h-20 px-6 sm:px-10 mt-2">
            <div>
              <h1 className="text-lg font-semibold dark:text-white">Hi Meghana</h1>
              <h3 className="text-gray-400">Welcome Back!</h3>
            </div>
            <div className="flex justify-between">
              <div className="relative max-w-md ">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  role="search"
                  placeholder="Search..."
                  className="py-1 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg dark:bg-gray-800"
                />
              </div>

              <div className="pl-3 ml-3 space-x-1">
                <button
                  onClick={toggleTheme}
                  className="relative p-2 text-gray-400 hover:bg-gray-100 hover:bg-blue-100 focus:bg-blue-100 focus:text-blue-100 rounded-full"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <FiSun size={24} color="blue" />
                  ) : (
                    <PiMoon size={22} color="black" />
                  )}
                </button>
                <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:bg-blue-100 focus:bg-gray-100 focus:text-gray-600 rounded-full ">
                  <span className="sr-only">Notifications</span>
                  <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                  <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleLogout}
                  className="relative p-2 text-gray-400 hover:bg-gray-100 hover:bg-blue-100 focus:bg-gray-100 focus:text-gray-600 rounded-full"
                >
                  <span className="sr-only">Log out</span>
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          <main className="p-6 sm:p-10 space-y-6 ">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2 dark:text-purple-500">Dashboard</h1>
              </div>
              <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                <Link
                  to="/dashboard/manage-books"
                  className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-200 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Manage Books
                </Link>
                <Link
                  to="/dashboard/add-new-book"
                  className="inline-flex px-5 py-3 text-white bg-purple-600 
                   hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New Book
                </Link>
              </div>
            </div>
            <Outlet />
          </main>
        </div>
      </section>
    </>
  );
};
const DashboardLayout = () => {
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <DashboardContext />
      </ThemeProvider>
    </>
  );
};

export default DashboardLayout;
