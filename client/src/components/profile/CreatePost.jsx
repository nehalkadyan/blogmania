import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CreatePost = ({ setActiveTab }) => {
  const {darkMode} = useSelector((state) => state.darkmode);

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
    category: "All",
    image: null,
    caption: "",
  });


  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change and preview
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.title.length < 2) {
      toast.error("Title should contain at least 2 characters")
      setIsLoading(false);
      return;
    }

    if (formData.description.length < 8) {
      toast.error("Description should contain at least 8 characters")
      setIsLoading(false);
      return;
    }

    if (!formData.image) {
      toast.error("An image must be provided")
      setIsLoading(false);
      return;
    }

    if (formData.caption.length < 12) {
      toast.error("Caption should contain at least 12 characters")
      setIsLoading(false);
      return;
    }

    try {
      const postFormData = new FormData();
      postFormData.append("title", formData.title);
      postFormData.append("description", formData.description);
      postFormData.append("category", formData.category);
      postFormData.append("caption", formData.caption);
      postFormData.append("image", formData.image);

      const res = await fetch(`https://blogmania-2-0.onrender.com/api/posts/create`, {
        method: "POST",
        body: postFormData,
        credentials: "include",
      });

      const data = await res.json();

      if(!res.ok){
        toast.error(data.message)
      }

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          category: "All",
          image: null,
          caption: "",
        });
        setImagePreview("");
        toast.success("Post Created Successfully")
        setActiveTab(1);

    
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto px-6 py-8 transition-all ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-semibold mb-6">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                : "border-gray-300 bg-white focus:border-blue-500"
            }`}
          />

        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                : "border-gray-300 bg-white focus:border-blue-500"
            }`}
          />
 
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                : "border-gray-300 bg-white focus:border-blue-500"
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded-lg shadow-lg max-h-48"
            />
          )}

        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 text-white focus:border-blue-500"
                : "border-gray-300 bg-white focus:border-blue-500"
            }`}
          />

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-lg text-white font-medium transition ${
            isLoading
              ? "bg-blue-400"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
