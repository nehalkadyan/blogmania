import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

    const creatorImageContainsHttp = (image) => {
    if (image?.includes("http")) {
      return true;
    } else {
      return false;
    }
  };


  // Mock data for categories
  const categories = [
    "All",
    "Automobile",
    "Sports",
    "News",
    "Media",
    "Technology",
    "Environment",
  ];

  // useEffect to fetch posts and set initial data
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPosts = async () => {
      try {
        let url = `https://blogmania-1.onrender.com/api/posts/allposts`;
        const params = new URLSearchParams();
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (searchTerm) {
          params.append("search", searchTerm);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
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
  }, [selectedCategory, searchTerm]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Filter posts based on search term and selected category
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
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-8">
        <input
          type="text"
          placeholder="Search for posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded-md mr-4 focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
{/*               <img
                src={`https://blogmania-1.onrender.com/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              /> */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <div className="flex flex-row items-center gap-2">
                  <div className="text-gray-600">Created by :</div>
                  <div className="flex items-center gap-2">
{/*                     <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={creatorImageContainsHttp(post?.createdBy?.image) ? post?.createdBy?.image : `https://blogmania-1.onrender.com/${post?.createdBy?.image}`}
                      alt="user"
                    /> */}
                    <p className="font-semibold">{post?.createdBy?.email}</p>
                  </div>
                </div>
                <p>{handleDescription(post.description)}</p>
                <p className="text-gray-600 mb-2">Category: {post.category}</p>
                {/* Add more post details here */}
              </div>
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Blogs;
