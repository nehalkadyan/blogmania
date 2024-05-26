import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

const SeparatePost = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const containsHttp = currentUser?.image.includes("http");

  const commentImgContainsHTTp = (image) => {
    if (image?.includes("http")) {
      return true;
    } else {
      return false;
    }
  };

  const [post, setPost] = useState({});

  const [liked, setLiked] = useState(false);
  const [likeValidation, setLikeValidation] = useState(null);

  const [commentInput, setCommentInput] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentIdToBeEdited, setCommentIdToBeEdited] = useState(null);
  const [commentIdToBeDeleted, setCommentIdToBeDeleted] = useState(null);
  const [numberOfLikes, setNumberOfLikes] = useState(null);
  const [likedByUsers, setLikedByUsers] = useState([]);
  console.log("post", post);
  console.log("liked users", likedByUsers);
  console.log("numberoflikes", numberOfLikes);

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleUpdateCommentChange = (e) => {
    setUpdateComment(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://blogmania-1.onrender.com/api/posts/post/${id}`, {
            method: "GET",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
          const sortedComments = data.post.comments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setComments(sortedComments);
          setNumberOfLikes(data.post.numberOfLikes);
          setLikedByUsers(data.post.likedByUsers);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id, commentInput, updateComment, commentIdToBeDeleted, likedByUsers]);

  useEffect(() => {
    if (likedByUsers.includes(currentUser?.email)) {
      setLiked(true);
    }
  }, [likedByUsers, currentUser?.email]);

  console.log(id);

  const handleCommentPublish = async () => {
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentInput,
            email: currentUser?.email,
            image: currentUser?.image,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setCommentInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (id) => {
    setUpdateComment("");
    setCommentIdToBeEdited(id);
  };

  const handleDeleteClick = (id) => {
    setCommentIdToBeDeleted(id);
    setShowModal(true);
  };

  const handleUpdateComment = async () => {
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/${id}/${commentIdToBeEdited}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: updateComment,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setCommentIdToBeEdited(null);
        setUpdateComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/delete/${id}/${commentIdToBeDeleted}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        setCommentIdToBeDeleted(null);
        console.log("comment has been deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeClick = async () => {
    if (!currentUser) {
      setLikeValidation("You must be logged in to like and comment");
      return;
    }
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/${id}/like/postLike`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentUser?.email,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("data", data);
        setLiked(!liked);
        setNumberOfLikes(data.numberOfLikes);
        setLikedByUsers(data.likedByUsers);
        console.log("liked", liked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const formattedDate = new Date(timestamp).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="max-w-4xl mt-4 mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center text-gray-600 mb-4">
        <p>
          <span className="font-semibold">Created At :</span>{" "}
          {formatTimestamp(post.createdAt)}
        </p>
        <p>
          <span className="font-semibold">Category :</span> {post.category}
        </p>
      </div>
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <div className="flex justify-center mb-4">
{/*         <img
          src={`https://blogmania-1.onrender.com/${post?.image}`}
          alt={post.title}
          className="rounded-lg shadow-md"
        /> */}
      </div>
      <div>
        <div className="flex gap-2 items-center">
{/*           <img
            className="w-10 h-10 rounded-full object-cover"
            src={
              commentImgContainsHTTp(post?.createdBy?.image)
                ? post?.createdBy?.image
                : `https://blogmania-1.onrender.com/${post?.createdBy?.image}`
            }
            alt={post.createdBy?.email}
          /> */}
          <p className="font-semibold">{post.createdBy?.email}</p>
        </div>
        <p className="text-gray-700 p-4">{post.caption}</p>
      </div>
      <div className="flex items-center mb-4">
        <button onClick={handleLikeClick} className="mr-2">
          {liked ? (
            <BsHeartFill className="text-blue-500" size={24} />
          ) : (
            <BsHeart className="text-gray-500" size={24} />
          )}
        </button>
        <p className="text-gray-600 flex gap-2">
          <span className="hidden sm:block">Likes : </span>
          {numberOfLikes >= 0 ? numberOfLikes : numberOfLikes}
        </p>{" "}
        {likeValidation && (
          <p className="text-red-700 ml-5">
            {likeValidation}{" "}
            <Link to="/signin" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Comments</h3>
        {comments.length === 0 && (
          <p className="md:text-2xl text-xl font-semibold text-center py-2">
            No comments on this post so far
          </p>
        )}
        {currentUser && (
          <div className="mb-4">
            <textarea
              value={commentInput}
              onChange={handleCommentInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="Write a comment..."
            ></textarea>
            <button
              onClick={handleCommentPublish}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Publish
            </button>
          </div>
        )}

        <div>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-4">
              <div className="flex items-center mb-2">
{/*                 <img
                  src={
                    commentImgContainsHTTp(comment?.userImg)
                      ? comment?.userImg
                      : `https://blogmania-1.onrender.com/${comment?.userImg}`
                  }
                  alt={comment.createdBy}
                  className="w-8 h-8 rounded-full mr-2"
                /> */}
                <p className="text-gray-800 font-semibold">
                  {comment.createdBy}
                </p>
              </div>

              <p className="text-gray-700 text-xl">{comment.text}</p>
              <div className="flex items-center gap-6">
                <p className="text-gray-500 text-xs p-1">
                  {formatTimestamp(comment.createdAt)}
                </p>
                <div>
                  {currentUser?.email === comment.createdBy && (
                    <div className="flex items-center space-x-2">
                      {commentIdToBeEdited === comment._id ? (
                        <div className="w-full">
                          <textarea
                            value={updateComment}
                            onChange={handleUpdateCommentChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows="3"
                          ></textarea>
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={handleUpdateComment}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setCommentIdToBeEdited(null)}
                              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(comment._id)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(comment._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                      {showModal && (
                        <Modal
                          setShowModal={setShowModal}
                          action={handleDeleteComment}
                          text={"comment"}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeparatePost;
