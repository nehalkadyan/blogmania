import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.darkmode);

  const [post, setPost] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const categories = [
    "All",
    "Automobile",
    "Sports",
    "News",
    "Media",
    "Technology",
    "Environment",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    caption: "",
  });

  // ✅ Handle image change and preview
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData({
        ...formData,
        image: selectedFile,
      });
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  // ✅ Fetch Post Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/post/${id}`,
          {
            method: "GET",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
          setImagePreview(data.post?.image);
          setFormData({
            title: data.post?.title || "",
            description: data.post?.description || "",
            category: data.post?.category || "",
            image: null,
            caption: data.post?.caption || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate requests
    if (loading) return;

    // Basic validation
    if (formData.title.length < 2) {
      toast.error("Title should contain at least 2 characters.");
      return;
    }

    if (formData.description.length < 8) {
      toast.error("Description should contain at least 8 characters.");
      return;
    }

    if (formData.caption.length < 12) {
      toast.error("Caption should contain at least 12 characters.");
      return;
    }

    try {
      setLoading(true); // ✅ Start loading

      const updatePostData = new FormData();
      updatePostData.append("title", formData.title);
      updatePostData.append("description", formData.description);
      updatePostData.append("category", formData.category);
      if (formData.image) {
        updatePostData.append("image", formData.image);
      }
      updatePostData.append("caption", formData.caption);

      const res = await fetch(`http://localhost:5000/api/posts/${id}/update`, {
        method: "PUT",
        body: updatePostData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        setFormData({
          title: "",
          description: "",
          category: "",
          image: null,
          caption: "",
        });
        setImagePreview(null);
        toast.success("Post Updated!");
        navigate(`/profile/${post.authorId}`);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div
      className={`flex justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } transition-all duration-300`}
    >
      <div className="w-full py-10 shadow-lg max-w-5xl rounded-lg mx-auto px-8">
        {/* Header */}
        <h2 className="text-4xl font-extrabold mb-8 text-center">Edit Post</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="6"
              className={`w-full px-4 py-3 border rounded-lg transition-all ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 h-60 rounded-lg shadow-lg object-contain"
              />
            )}
          </div>

          {/* Caption */}
          <div>
            <label htmlFor="caption" className="block font-medium mb-2">
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading} // ✅ Disable while loading
            className={`w-full py-4 rounded-lg text-white font-semibold transition-all ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-400"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
