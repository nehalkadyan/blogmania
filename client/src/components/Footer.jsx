import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    console.log("useeffect triggered");
    window.scrollTo(0, 0); // Scroll to the top when component is mounted or updated
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-sm">
              Unleash your creativity, share your thoughts, and engage your
              audience with our intuitive and versatile blog app. Elevate your
              online presence effortlessly!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8 w-full max-w-6xl" />

        {/* Copyright Section */}
        <div className="text-center text-sm">
          <p>&copy; 2024 BlogMania. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
