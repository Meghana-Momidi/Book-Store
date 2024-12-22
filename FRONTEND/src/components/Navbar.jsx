import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import avatarImg from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import bookIcon from "../assets/bookIcon.png";
import { clearCart } from "../features/cart/cartSlice";
import { useThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cartState.cartItems);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const navigate = useNavigate();

  const { logout } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    ...(cartItems.length >= 1 ? [{ name: "CheckOut", href: "/checkout" }] : []), // Conditionally add "CheckOut"
  ];

  const handleLogout = async () => {
    await logout();
    dispatch(clearCart());
    navigate("/", { replace: true });
  };
  console.log(currentUser);

  return (
    <header
      className="w-full px-4 py-2 mx-auto bg-gray-100 sticky top-0 z-[5000] shadow-xl dark:bg-dark-card"
      role="banner"
      aria-label="Primary navigation"
    >
      <nav className="flex justify-between items-center w-full h-full">
        {/* Left side */}
        <div className="flex items-center gap-4 md:gap-8 ml-10">
          <Link to="/" aria-label="Home" className="flex items-center">
            <img src={bookIcon} alt="Book icon" className="w-9 h-9" />
          </Link>

          {currentUser ? (
            <p className="text-lg">Hello, {currentUser?.username} !</p>
          ) : (
            <p>Hello, Please login !</p>
          )}
        </div>

        {/* Right side */}
        <div className="relative flex items-center space-x-2 md:space-x-4">
          <div>
            {currentUser ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="User menu"
                  aria-expanded={isDropdownOpen}
                  aria-controls="user-menu"
                >
                  <img
                    src={avatarImg}
                    alt="User avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40 dark:bg-gray-600"
                    role="menu"
                  >
                    <ul className="py-2">
                      {navigation.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-300 transform  hover:pl-6 dark:hover:bg-gray-500"
                            role="menuitem"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-all duration-300 transform  hover:pl-6 dark:hover:bg-gray-500"
                          role="logout"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Login">
                <FaRegUser className="size-6" />
              </Link>
            )}
          </div>

          {/* theme button */}
          <button
            onClick={toggleTheme}
            className="pl-6 flex items-center justify-center rounded-full  transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle theme" 
          >
            {isDarkMode ? (
              <BsSunFill size={22} color="yellow" />
            ) : (
              <BsMoonFill size={18} color="black" />
            )}
          </button>

          <Link
            to="/cart"
            className="relative p-2 sm:px-6 flex items-center hover:bg-gray-300 hover:rounded-full dark:hover:bg-gray-600"
            aria-label="Shopping cart"
          >
            <FiShoppingCart className="size-6" />
            {cartItems.length > 0 && (
              <span
                className="absolute top-0 right-1  bg-primary w-5 h-6 rounded-full text-center font-bold sm:ml-1 dark:text-black"
                aria-live="polite"
                aria-atomic="true"
              >
                {numItemsInCart}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
