import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HeartIcon, MessageCircleIcon, ShareIcon, SunIcon, MoonIcon, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";


const SeparatePost = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const {darkMode} = useSelector((state) => state.darkmode)
  
  const [post, setPost] = useState({});

  console.log("post", post)

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
  console.log("comments", comments)
  // console.log("liked users", likedByUsers);
  // console.log("numberoflikes", numberOfLikes);

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
        const res = await fetch(`http://localhost:5000/api/posts/post/${id}`, {
          method: "GET",
        });

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
  }, [id, commentInput, updateComment, commentIdToBeDeleted, numberOfLikes]);

  useEffect(() => {
    if (likedByUsers.includes(currentUser?.email)) {
      setLiked(true);
    }
  }, [likedByUsers, currentUser?.email]);

  console.log(id);

  const handleCommentPublish = async () => {
    try {

      const commentData = new FormData();

      commentData.append("text", commentInput);
      commentData.append("email", currentUser?.email);

      const res = await fetch(
        `http://localhost:5000/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentInput,
            email: currentUser?.email,
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
        `http://localhost:5000/api/posts/${id}/${commentIdToBeEdited}`,
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
        `http://localhost:5000/api/posts/delete/${id}/${commentIdToBeDeleted}`,
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

      setShowModal(false)
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
        `http://localhost:5000/api/posts/${id}/like/postLike`,
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

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    return formatTimestamp(timestamp);
  };



  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with theme toggle and back button */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 ${
              darkMode 
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          

        </div>
        
        {/* Main Content Card */}
        <div className={`rounded-2xl overflow-hidden shadow-xl ${
          darkMode 
            ? "bg-gray-800 shadow-gray-800/40" 
            : "bg-white shadow-gray-200/70"
        }`}>
          {/* Post Header with Category and Date */}
          <div className={`flex justify-between items-center p-4 sm:p-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className="flex items-center">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode 
                  ? "bg-blue-600/30 text-blue-400" 
                  : "bg-blue-100 text-blue-700"
              }`}>
                {post.category || "General"}
              </div>
            </div>
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {formatTimestamp(post.createdAt)}
            </div>
          </div>
          
          {/* Post Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold p-4 sm:p-6 pb-2 sm:pb-4">
            {post.title}
          </h1>
          
          {/* Author Info */}
          <div className="px-4 sm:px-6 pb-4 flex items-center">
            <img
              src={post?.createdBy?.image}
              alt={post.createdBy?.email}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/40?text=User";
              }}
            />
            <div className="ml-3">
              <p className="font-medium">{post.createdBy?.email?.split('@')[0] || "Anonymous"}</p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Author</p>
            </div>
          </div>
          
          {/* Post Image */}
          <div className="relative  overflow-hidden">
            <div className="px-24 sm:px-2 sm:py-2  md:px-16 md:py-3 py-4">
            <img
              src={post?.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available";
              }}
            />
            </div>
          </div>
          
          {/* Post Content */}
          <div className={`p-4 sm:p-6 text-lg ${darkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed whitespace-pre-line`}>
            {post.caption || post.description}
          </div>
          
          {/* Interaction Bar */}
          <div className={`flex items-center justify-between p-4 sm:p-6 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className="flex items-center gap-6">
              {/* Like Button */}
              <button 
                onClick={handleLikeClick} 
                className={`flex items-center gap-2 transition-all duration-300 ${
                  liked
                    ? "text-red-500" 
                    : darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
                disabled={!currentUser}
              >
                <HeartIcon size={22} fill={liked ? "currentColor" : "none"} />
                <span>{numberOfLikes || 0}</span>
              </button>
              
              {/* Comment Count */}
              <div className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <MessageCircleIcon size={22} />
                <span>{comments?.length || 0}</span>
              </div>
              
              {/* Share Button */}
              <button className={`flex items-center gap-2 ${
                darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
              }`}>
                <ShareIcon size={22} />
              </button>
            </div>
            
            {/* Like validation message */}
            {likeValidation && (
              <div className={`text-sm ${darkMode ? "text-red-400" : "text-red-600"}`}>
                {likeValidation}{" "}
                <Link to="/signin" className={`font-medium ${darkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}>
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Comments Section */}
        <div className={`mt-8 rounded-2xl overflow-hidden shadow-xl ${
          darkMode 
            ? "bg-gray-800 shadow-gray-800/40" 
            : "bg-white shadow-gray-200/70"
        }`}>
          <div className={`p-4 sm:p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <MessageCircleIcon size={24} />
              Comments
            </h2>
          </div>
          
          {/* Comment Input */}
          {currentUser ? (
            <div className={`p-4 sm:p-6 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex items-start gap-3">
                <img
                  src={currentUser?.image}
                  alt={currentUser?.email}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/40?text=User";
                  }}
                />
                <div className="flex-grow">
                  <textarea
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    className={`w-full p-3 rounded-lg resize-none transition-colors duration-300 ${
                      darkMode 
                        ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" 
                        : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
                    } border focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                    rows="3"
                    placeholder="Share your thoughts..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleCommentPublish}
                      disabled={!commentInput.trim()}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        !commentInput.trim()
                          ? darkMode 
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : darkMode 
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-6 text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p className="mb-3">Sign in to join the conversation</p>
              <Link 
                to="/signin" 
                className={`inline-block px-6 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Sign in
              </Link>
            </div>
          )}
          
          {/* Comments List */}
          <div className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
            {comments.length === 0 ? (
              <div className={`p-8 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <MessageCircleIcon size={40} className="mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">No comments yet</p>
                <p className="mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="p-4 sm:p-6 animate-fadeIn">
                  <div className="flex gap-3">
                    {/* Comment author image */}
                    <img
                      src={comment?.createdBy?.image}
                      alt={comment.createdBy?.email}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40?text=User";
                      }}
                    />
                    
                    {/* Comment content */}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{comment.createdBy?.email?.split('@')[0] || comment.createdBy.email}</h3>
                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      
                      {/* Comment editing */}
                      {commentIdToBeEdited === comment._id ? (
                        <div className="mt-1">
                          <textarea
                            value={updateComment}
                            onChange={handleUpdateCommentChange}
                            className={`w-full p-3 rounded-lg resize-none transition-colors duration-300 ${
                              darkMode 
                                ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" 
                                : "bg-gray-50 text-gray-900 border-gray-300 focus:border-blue-500"
                            } border focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                            rows="3"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') {
                                setCommentIdToBeEdited(null);
                              }
                            }}
                          ></textarea>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setCommentIdToBeEdited(null)}
                              className={`px-3 py-1 rounded-lg text-sm ${
                                darkMode 
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateComment}
                              disabled={!updateComment.trim()}
                              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                !updateComment.trim()
                                  ? darkMode 
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : darkMode 
                                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {comment.text}
                        </p>
                      )}
                      
                      {/* Comment actions */}
                      {currentUser?.email === comment.createdBy?.email && commentIdToBeEdited !== comment._id && (
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => {
                              handleEditClick(comment._id);
                              setUpdateComment(comment.text);
                            }}
                            className={`text-xs font-medium ${
                              darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(comment._id)}
                            className={`text-xs font-medium ${
                              darkMode ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                            }`}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for comment deletion */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          action={handleDeleteComment}
          text={"comment"}
        />
      )}
      
      {/* CSS Animation for the component */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
export default SeparatePost;
