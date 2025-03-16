import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Loader from "../Loader";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaRegSadCry } from "react-icons/fa"; // Importing an icon

const ViewPosts = ({setActiveTab}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [postIdToBeDeleted, setPostIdToBeDeleted] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState("default");

  const { darkMode } = useSelector((state) => state.darkmode);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://blogmania-2-0.onrender.com/api/posts/post`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [postIdToBeDeleted]);

  // Handle post delete
  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `https://blogmania-2-0.onrender.com/api/posts/${postIdToBeDeleted}/delete`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postIdToBeDeleted));
        setPostIdToBeDeleted(null);
        setShowModal(false);
        toast.success("Post deleted successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Toggle view mode
  const handleViewModeChange = (mode) => setViewMode(mode);

  return (
    <div
      className={`max-w-6xl mx-auto px-6 py-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Your Posts</h2>
        <div className="flex gap-3">
          {/* List View */}
          <FaThList
            onClick={() => handleViewModeChange("default")}
            className={`text-2xl cursor-pointer ${
              viewMode === "default"
                ? darkMode
                  ? "text-blue-400 scale-110"
                  : "text-blue-600 scale-110"
                : "text-gray-400 hover:text-blue-500"
            } transition-all`}
          />
          {/* Grid View */}
          <IoGrid
            onClick={() => handleViewModeChange("grid")}
            className={`text-2xl cursor-pointer ${
              viewMode === "grid"
                ? darkMode
                  ? "text-blue-400 scale-110"
                  : "text-blue-600 scale-110"
                : "text-gray-400 hover:text-blue-500"
            } transition-all`}
          />
        </div>
      </div>

      {/* Posts Grid */}
      {userPosts.length > 0 ? (
        <div
          className={`grid ${
            viewMode === "default"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          } gap-6 transition-all duration-300`}
        >
          {userPosts.map((post) => (
            <div
              key={post._id}
              className={`rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <Link to={`/post/${post._id}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                </div>
              </Link>

              {/* Action Buttons */}
              <div className="flex justify-between items-center p-4">
                {/* Edit Button */}
                <Link
                  to={`/edit/${post._id}`}
                  className={`px-4 py-2 rounded-md font-medium ${
                    darkMode
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    setPostIdToBeDeleted(post._id);
                    setShowModal(true);
                  }}
                  className={`px-4 py-2 rounded-md font-medium ${
                    darkMode
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          {/* Sad Icon */}
          <FaRegSadCry className="text-6xl text-gray-400 mb-4 animate-bounce" />
          <h3 className="text-2xl font-semibold mb-4">
            No posts created yet!
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first post and start sharing your thoughts.
          </p>
          {/* Create Post Button */}
          <Link
            onClick={() => setActiveTab(2)}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-md ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Create Post
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <Modal
          action={handleDeletePost}
          text="post?"
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default ViewPosts;
