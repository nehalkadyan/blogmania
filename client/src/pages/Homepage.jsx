import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [showViewMoreButton, setShowViewMoreButton] = useState(false);

  const creatorImageContainsHttp = (image) => {
    if (image?.includes("http")) {
      return true;
    } else {
      return false;
    }
  };

  const baseUrl = "https://blogmania-1.onrender.com/";

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
        let url = `https://blogmania-1.onrender.com/api/posts/allposts`;
        if (selectedCategory !== null && selectedCategory !== "All") {
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

  const handleChangeCategory = (index) => {
    setSelectedCategory(index === 0 ? null : index);
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="lg:text-5xl md:text-3xl text-xl font-medium">Blogs</h1>
        <ul className="lg:inline-flex  hidden  gap-8 bg-gray-700 rounded-full p-2">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleChangeCategory(category)}
              className={`cursor-pointer px-4 py-2 transition-all duration-300 hover:bg-white hover:text-black rounded-full ${
                selectedCategory === index
                  ? "bg-white text-black"
                  : "text-white"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>

        <select
          value={selectedCategory}
          onChange={handleSelectCategory}
          className=" lg:hidden bg-gray-600 text-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.length > 0 ? (
          displayedPosts?.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
{/*               <img
                src={`https://blogmania-1.onrender.com/${post?.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="text-gray-600">Created by :</div>
                  <div className="flex items-center gap-2">
{/*                     <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        creatorImageContainsHttp(post?.createdBy?.image)
                          ? post?.createdBy?.image
                          : `https://blogmania-1.onrender.com/${post?.createdBy?.image}`
                      }
                      alt="user"
                    /> */}
                    <p className="font-semibold">{post?.createdBy?.email}</p>
                  </div>
                </div>
                <p className="py-3 mb-2 text-gray-600">
                  {handleDescription(post.description)}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 "
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      {showViewMoreButton && (
        <Link
          to="/blogs"
          className="bg-slate-700 flex justify-center sm:w-1/3 md:w-1/4 lg:w-1/6 mx-auto text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          View More Blogs
        </Link>
      )}
    </div>
  );
};

export default Homepage;
