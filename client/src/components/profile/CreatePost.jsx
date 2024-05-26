import React, { useState } from "react";

const CreatePost = ({ setActiveTab }) => {
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

  const [formDataValidation, setFormDataValidation] = useState({
    titleValidation: "",
    descriptionValidation: "",
    imageValidation: "",
    captionValidation: "",
  });

  console.log(formDataValidation);

  console.log(formData);
  const [imagePreview, setImagePreview] = useState("");

  console.log(imagePreview);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    try {
      setFormData({
        ...formData,
        image: selectedFile,
      });
      setImagePreview(URL.createObjectURL(selectedFile));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.length < 2) {
      setFormDataValidation({
        ...formDataValidation,
        titleValidation: "title should contain atleast 2 characters",
      });
      return;
    }

    if (formData.description.length < 8) {
      setFormDataValidation({
        ...formDataValidation,
        descriptionValidation:
          "description should contain atleast 8 characters",
      });
      return;
    }

    // if (!formData.image) {
    //   setFormDataValidation({
    //     ...formDataValidation,
    //     imageValidation: "image must be provided in jpg, png, jpeg, etc format",
    //   });
    //   return;
    // }

    if (formData.caption.length < 12) {
      setFormDataValidation({
        ...formDataValidation,
        captionValidation: "caption should contain atleast 12 characters",
      });
      return;
    }

    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/posts/create`,
        {
          method: "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            title : formData.title,
            description : formData.description,
            category : formData.category,
            caption : formData.caption
          }),
          credentials: "include",
        }
      );

      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          category: "All",
          image: null,
          caption: "",
          email: "",
        });
        setImagePreview("");
        alert("post created");
        setActiveTab(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
          {formDataValidation.titleValidation && formData.title.length < 2 && (
            <p className="text-red-700 text-sm pl-2">
              {formDataValidation.titleValidation}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          ></textarea>
          {formDataValidation.descriptionValidation &&
            formData.description.length < 8 && (
              <p className="text-red-700 text-sm pl-2">
                {formDataValidation.descriptionValidation}
              </p>
            )}
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
{/*         <div>
          <label htmlFor="image" className="block font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 text-sm sm:text-md"
          />
          {formDataValidation.imageValidation && !formData.image && (
            <p className="text-red-700 text-sm pl-2">
              {formDataValidation.imageValidation}
            </p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected"
              className="mt-2 max-w-full h-auto"
            />
          )}{" "}
        </div> */}
        <div>
          <label htmlFor="caption" className="block font-medium">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
          {formDataValidation.captionValidation &&
            formData.caption.length < 12 && (
              <p className="text-red-700 text-sm pl-2">
                {formDataValidation.captionValidation}
              </p>
            )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
