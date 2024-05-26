import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Loader from "../Loader";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const ViewPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [postIdToBeDeleted, setPostIdToBeDeleted] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [biggerView, setBiggerView] = useState("default");

  console.log("userposts", userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://blogmania-1.onrender.com/api/posts/post`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://blogmania-1.onrender.com/api/posts/post`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [postIdToBeDeleted]);

  const handleIdToDeleteChange = (id) => {
    setPostIdToBeDeleted(id);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/${postIdToBeDeleted}/delete`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        setPostIdToBeDeleted(null);
        setShowModal(false);
        return alert("post deleted!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewOption = (type) => {
    setBiggerView(type);
  };

  return (
    <div className="max-w-4xl  min-h-screen mx-auto px-4 py-8">
      <div className="flex items-center gap-4 p-2 mb-3">
        <div>
          <FaThList
            onClick={() => handleViewOption("default")}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div>
          <IoGrid
            onClick={() => handleViewOption("grid")}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Your Posts</h2>
      <div
        className={`${
          biggerView === "default"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}
      >
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <>
              <div>
                <div className="bg-white rounded-lg shadow-lg">
                  <Link key={post._id} to={`/post/${post._id}`}>
                    <div>
{/*                       <img
                        src={"https://blogmania-1.onrender.com/" + post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      /> */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                      </div>
                    </div>
                  </Link>

                  <div
                    className={`${
                      biggerView === "default"
                        ? "p-5 mt-4 flex justify-between items-center"
                        : "p-2 flex justify-between items-center"
                    }`}
                  >
                    <Link
                      to={`/edit/${post._id}`}
                      className={`${
                        biggerView === "default"
                          ? "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          : "p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      }`}
                    >
                      Edit
                    </Link>

                    <div>
                      <button
                        onClick={() => handleIdToDeleteChange(post._id)}
                        className={`${
                          biggerView === "default"
                            ? "px-4 py-2 bg-red-500 text-white rounded-md hover:red-blue-600"
                            : "p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        }`}
                      >
                        Delete
                      </button>
                    </div>
                    <div className={`${showModal ? "visible" : "hidden"}`}>
                      <Modal
                        action={handleDeletePost}
                        text={"Post"}
                        setShowModal={setShowModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : userPosts?.length > 0 ? (
          <Loader />
        ) : (
          <h1 className="md:text-2xl text-xl font-semibold mt-4">
            You have not created any posts yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default ViewPosts;
