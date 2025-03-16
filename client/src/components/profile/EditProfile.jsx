import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../redux/user/userSlice";
import toast from "react-hot-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const {darkMode} = useSelector((state) => state.darkmode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(currentUser?.image);

  const [formData, setFormData] = useState({
    image: null,
    username: currentUser?.username,
    password: "",
    confirmPassword: "",
  });


  // Handle input change
  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match")

      setLoading(false);
      return;
    }

    if (formData.username.length < 4) {
      toast.error("Username should have atleast 4 characters")
      setLoading(false);
      return;
    }

    try {
      const profileFormData = new FormData();
      profileFormData.append("username", formData.username);
      if (formData.password) profileFormData.append("password", formData.password);
      if (formData.image) profileFormData.append("image", formData.image);

      const res = await fetch(`http://localhost:5000/api/update/users/update`, {
        method: "PUT",
        body: profileFormData,
        credentials: "include",
      });

      const data = await res.json();

      if(!res.ok){
        toast.error(data.message)
      }
      setLoading(false);

      if (res.ok) {
        dispatch(updateUser(data.rest));
        toast.success("Profile updated successfully!")
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  // Handle account deletion
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/delete/user/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        dispatch(deleteUser());
        toast.success("Account deleted successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Error occured ☹️, while deleting account");
      console.log(err);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen items-center px-4 py-10 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <div
        className={`w-full max-w-lg p-6 rounded-lg shadow-md transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Form */}
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="imageInput" className="cursor-pointer">
              <img
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-400 hover:border-gray-500 transition-all"
                src={imagePreview}
                alt="Profile"
              />
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-sm text-gray-400">
              Click to update profile image
            </span>
          </div>

          {/* Email (Non-editable) */}
          <div>
            <label className="text-sm font-medium">Email (Cannot be changed)</label>
            <input
              type="email"
              value={currentUser?.email}
              disabled
              className="w-full mt-1 p-2 border rounded-md bg-gray-100 text-gray-400"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormDataChange}
              className={`w-full mt-1 p-2 border rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
              }`}
            />

          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              name="password"
              onChange={handleFormDataChange}
              className={`w-full mt-1 p-2 border rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleFormDataChange}
              className={`w-full mt-1 p-2 border rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
              }`}
            />

          </div>

          {/* Update Button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-md text-white font-semibold transition-all ${
              loading
                ? "bg-gray-400"
                : darkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {/* Delete Account */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-red-500 mt-2 hover:underline"
          >
            Delete Account?
          </button>
        </form>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Modal */}
        {showModal && (
          <Modal
            action={handleDeleteUser}
            setShowModal={setShowModal}
            text="Account"
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
