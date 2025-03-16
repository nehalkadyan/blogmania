import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { HiOutlineEmojiSad } from "react-icons/hi"; // Importing icon

const Blogs = () => {
  const { darkMode } = useSelector((state) => state.darkmode);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
        let url = `https://blogmania-2-0.onrender.com/api/posts/allposts`;
        const params = new URLSearchParams();

        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (searchTerm) params.append("search", searchTerm);
        if (params.toString()) url += `?${params.toString()}`;

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
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategory !== "All") {
      setFilteredPosts(
        filtered.filter((post) => post.category === selectedCategory)
      );
    } else {
      setFilteredPosts(filtered);
    }
  }, [searchTerm, selectedCategory, posts]);

  const handleDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) return words.slice(0, 10).join(" ") + "...";
    return description;
  };

  return (
    <div
      className={`min-h-screen flex justify-center mx-auto px-4 py-8 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl w-full">
        {/* Search and Category */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full sm:w-auto px-4 py-2 rounded-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700 focus:border-gray-400"
                : "bg-white border-gray-300 focus:border-gray-500"
            } focus:outline-none transition-all`}
          />

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full sm:w-auto px-4 py-2 rounded-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700 focus:border-gray-400"
                : "bg-white border-gray-300 focus:border-gray-500"
            } focus:outline-none transition-all`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                to={`/post/${post._id}`}
                key={post._id}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      className="w-10 h-10 object-fill rounded-full"
                      src={post?.createdBy?.image || "/default-avatar.png"}
                      alt="user"
                    />
                    <p className="text-sm font-semibold">
                      {post?.createdBy?.email}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {handleDescription(post.description)}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>
              </Link>
            ))
          ) : selectedCategory !== "All" ? (
            <div className="col-span-full flex flex-col items-center py-20">
              {/* Sad Icon */}
              <HiOutlineEmojiSad className="text-6xl text-gray-400 mb-4 animate-pulse" />
              <h3 className="text-2xl font-semibold mb-2">
                No blogs available for{" "}
                <span className="text-blue-500">{selectedCategory}</span>
              </h3>
              <p className="text-gray-500 mb-6">
                Try exploring other categories or creating your first blog post!
              </p>
              {/* Explore Other Categories Button */}
              <Link
                onClick={() => setSelectedCategory("All")}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-md ${
                  darkMode
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                View All
              </Link>
            </div>
          ) : (
            <div className="col-span-full flex justify-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
