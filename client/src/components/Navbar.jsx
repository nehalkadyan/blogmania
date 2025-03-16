import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/mode/modeSlice";
import { userLogout } from "../redux/user/userSlice";

const Navbar = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(userLogout());
    setIsOpen(false);
  };

  const toggleMode = () => {
    dispatch(toggleDarkMode());
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } shadow-md transition-all duration-300`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            } tracking-wide transition-all duration-300 hover:scale-105`}
          >
            BlogMania 🚀
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleMode}
              className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transform hover:scale-110`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? (
                <SunIcon size={24} className="animate-spin-slow" />
              ) : (
                <MoonIcon size={24} />
              )}
            </button>

            {/* Navigation Links */}
            <Link
              to="/about"
              className={`text-lg font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } hover:text-blue-500 transition-all duration-300`}
            >
              About
            </Link>

            <Link
              to="/blogs"
              className={`text-lg font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } hover:text-green-500 transition-all duration-300`}
            >
              Blogs
            </Link>

            {!currentUser ? (
              <>
                <Link
                  to="/signup"
                  className={`text-lg font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } hover:text-indigo-500 transition-all duration-300`}
                >
                  Sign Up
                </Link>

                <Link
                  to="/signin"
                  className={`text-lg font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } hover:text-purple-500 transition-all duration-300`}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${currentUser._id}`}
                  className="flex items-center space-x-2 hover:text-blue-500 transition-all duration-300"
                >
                  <img
                    className="w-10 h-10 object-cover rounded-full border-2 border-blue-500"
                    src={currentUser?.image}
                    alt="User"
                  />
                  <span
                    className={`text-lg ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Profile
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className={`text-lg font-medium ${
                    darkMode ? "text-red-400" : "text-red-500"
                  } hover:text-red-600 transition-all duration-300`}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg
              className={`w-8 h-8 ${
                darkMode ? "text-white" : "text-gray-800"
              } transition-all duration-300`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "max-h-[400px]" : "max-h-0"
          } overflow-hidden transition-all duration-500 ease-in-out`}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleMode}
              className={`p-3 rounded-full shadow-md ${
                darkMode
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-all duration-300 transform hover:scale-110`}
            >
              {darkMode ? <SunIcon size={28} /> : <MoonIcon size={28} />}
            </button>

            <Link
              to="/about"
              className="text-lg text-blue-500 hover:text-blue-400 transition-all duration-300"
              onClick={toggleMenu}
            >
              About
            </Link>

            <Link
              to="/blogs"
              className="text-lg text-green-500 hover:text-green-400 transition-all duration-300"
              onClick={toggleMenu}
            >
              Blogs
            </Link>

            {!currentUser ? (
              <>
                <Link
                  to="/signup"
                  className="text-lg text-indigo-500 hover:text-indigo-400 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
                <Link
                  to="/signin"
                  className="text-lg text-purple-500 hover:text-purple-400 transition-all duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${currentUser._id}`}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                  onClick={toggleMenu}
                >
                  <img
                    className="w-10 h-10 object-cover rounded-full border-2 border-blue-500"
                    src={currentUser?.image}
                    alt="User"
                  />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-lg text-red-500 hover:text-red-400 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
