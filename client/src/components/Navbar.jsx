import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../redux/user/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(userLogout());
    setIsOpen(false);
  };

  const containsHttp = currentUser?.image.includes("http");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto md:px-8 px-2">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold text-white italic">
              BlogMania 🚀
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="h-6 w-6 text-white"
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
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link to="/blogs" className="text-white hover:text-gray-300">
              Blogs
            </Link>
            {currentUser && (
              <>
                <Link
                  to={`/profile/${currentUser?._id}`}
                  className={`${
                    currentUser
                      ? "visible text-white hover:text-gray-300 flex items-center"
                      : "text-white hover:text-gray-300 flex items-center"
                  }`}
                >
                  Profile
{/*                   <img
                    className="object-cover w-8 h-8 rounded-full ml-2 "
                    src={
                      containsHttp
                        ? currentUser?.image
                        : `https://blogmania-1.onrender.com/${currentUser?.image}`
                    }
                    alt="user"
                  /> */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </button>
              </>
            )}
            <Link
              to="/signup"
              className={`${
                currentUser ? "hidden" : "block"
              } text-white hover:text-gray-300`}
            >
              Sign Up
            </Link>

            <Link
              to="/signin"
              className={`${
                currentUser ? "hidden" : "block"
              } text-white hover:text-gray-300`}
            >
              Login
            </Link>
          </div>
        </div>
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} text-center`}>
          <div className="mt-4 flex flex-col justify-center">
            <Link
              to="/about"
              className="block text-white hover:text-gray-300 py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/blogs"
              className="block text-white hover:text-gray-300 py-2"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
            <Link
              to="/signup"
              className={`${
                currentUser ? "hidden" : "block"
              } text-white hover:text-gray-300 py-2`}
              onClick={toggleMenu}
            >
              Sign Up
            </Link>

            <Link
              to="/signin"
              className={`${
                currentUser ? "hidden" : "block"
              } text-white hover:text-gray-300 py-2`}
              onClick={toggleMenu}
            >
              Login
            </Link>
            {currentUser && (
              <>
                {" "}
                <Link
                  to={`/profile/${currentUser._id}`}
                  className="block text-white hover:text-gray-300 py-2 "
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link className="flex justify-center items-center text-white hover:text-gray-300 py-2 ">
{/*                   <img
                    className="object-cover w-8 h-8 rounded-full ml-2"
                    src={
                      containsHttp
                        ? currentUser?.image
                        : `https://blogmania-1.onrender.com/${currentUser?.image}`
                    }
                    alt="user"
                  /> */}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white pb-3 hover:text-gray-300"
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
