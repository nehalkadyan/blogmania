import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const Homepage = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [showViewMoreButton, setShowViewMoreButton] = useState(false);
  const {darkMode} = useSelector((state) => state.darkmode)
 
  console.log("darkmode", darkMode)

  const categories = [
    "All",
    "Automobile",
    "Sports",
    "News",
    "Media",
    "Technology",
    "Environment",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      try {
        let url = `http://localhost:5000/api/posts/allposts`;
        if (selectedCategory !== "All") {
          url += `?category=${selectedCategory}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const sortedPosts = data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setPosts(sortedPosts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  useEffect(() => {
    const maxPostsToShow = 15;
    const displayed = posts.slice(0, maxPostsToShow);
    setDisplayedPosts(displayed);
    setShowViewMoreButton(posts.length > maxPostsToShow);
  }, [posts]);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };



  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Hero Banner */}
      <div className="relative">
        <div className={`w-full h-64 md:h-80 ${darkMode ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}>
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover Amazing Content</h1>
            <p className="text-xl text-white/80 max-w-2xl">Explore the latest blogs across various categories curated just for you</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Theme Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Trending</span> Blogs
            </h2>
            

          </div>
          
          {/* Category Pills */}
          <div className="w-full md:w-auto overflow-x-auto hide-scrollbar">
            <ul className="inline-flex gap-2 md:gap-3 p-2 rounded-xl border-2 border-opacity-20 backdrop-blur-sm border-gray-500 overflow-x-auto whitespace-nowrap">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => handleChangeCategory(category)}
                  className={`cursor-pointer px-4 py-2 text-sm md:text-base transition-all duration-300 rounded-full ${
                    selectedCategory === category
                      ? darkMode 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
                        : "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : darkMode 
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Mobile Dropdown */}
          <select
            value={selectedCategory}
            onChange={handleSelectCategory}
            className={`md:hidden w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${
              darkMode 
                ? "bg-gray-800 text-white border-gray-700 focus:ring-blue-600" 
                : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500"
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedPosts.length > 0 ? (
            displayedPosts?.map((post) => (
              <div
                key={post._id}
                className={`overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                  darkMode 
                    ? "bg-gray-800 shadow-lg shadow-gray-900/60" 
                    : "bg-white shadow-lg shadow-gray-200/60"
                }`}
              >
                <div className="relative h-48 overflow-hidden group">
                  <img
                    src={post?.image}
                    alt={post.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute top-3 right-3 py-1 px-3 rounded-full text-xs font-semibold
                    ${darkMode 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-500 text-white"
                    }`}
                  >
                    {post.category || "General"}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}>
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-opacity-50 ring-blue-500"
                        src={post?.createdBy?.image}
                        alt="user"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40?text=User";
                        }}
                      />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {post?.createdBy?.email?.split('@')[0] || "Anonymous"}
                      </p>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", 
                          month: "short", 
                          day: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`mb-4 line-clamp-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {handleDescription(post.description)}
                  </p>
                  
                  <Link
                    to={`/post/${post._id}`}
                    className={`inline-flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      darkMode 
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30" 
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/30"
                    }`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-span-full flex items-center justify-center p-12 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="text-center">
                <p className="text-xl mb-4">No posts available in "{selectedCategory}" category</p>
                <button 
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  View All Posts
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* View More Button */}
        {showViewMoreButton && (
          <div className="flex justify-center mt-10">
            <Link
              to="/blogs"
              className={`inline-flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                darkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              }`}
            >
              View More Blogs
            </Link>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className={`mt-16 py-8 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              © {new Date().getFullYear()} BlogMania. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;