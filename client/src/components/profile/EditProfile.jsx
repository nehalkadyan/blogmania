import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../redux/user/userSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const containsHttp = currentUser.image.includes("http");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    image: currentUser?.image,
    username: currentUser?.username,
    password: "",
    confirmPassword: "",
  });

  const [formValidation, setFormValidation] = useState({
    usernameValidation: "",
    passwordValidation: "",
    passwordLengthValidation: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormValidation({
        ...formValidation,
        passwordValidation: "passwords don't match",
      });
      return;
    }

    if (formData.username.length < 4) {
      setFormValidation({
        ...formValidation,
        usernameValidation: "username should at least have 4 characters",
      });
      return;
    }

    if (formData.password.length > 0 && formData.password.length < 4) {
      setFormValidation({
        ...formValidation,
        passwordValidation: "password should have at least 4 characters",
      });
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(
        `https://blogmania-1.onrender.com/api/update/users/${id}`,
        {
          method: "PUT",
          headers : {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            username : formData.username,
            password : formData.password,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();
      setLoading(false);
      setImagePreview("");

      if (res.ok) {
        dispatch(updateUser(data.rest));
        return alert("User updated!");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `https://blogmania-1.onrender.com/api/delete/user/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        dispatch(deleteUser());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center">
      <h1 className="text-3xl font-bold mt-8">Profile</h1>
      <div className="mt-4 w-full md:max-w-md">
        <form
          onSubmit={handleUpdateProfile}
          className="p-6 bg-white rounded-md shadow-md flex flex-col gap-4"
        >
{/*           <h4 className="text-sm">Click the photo to change**</h4> */}
{/*           <label
            htmlFor="imageInput"
            className="cursor-pointer flex justify-center"
          >
            <img
              className="w-20  h-20 rounded-full object-cover"
              src={
                imagePreview
                  ? imagePreview
                  : containsHttp
                  ? currentUser.image
                  : `https://blogmania-1.onrender.com/${currentUser?.image}`
              }
              alt="user"
            />
          </label>
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          /> */}
          <label>
            Email <span className="text-red-600">(can't be changed)</span>
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-sm p-2"
            value={currentUser?.email}
            disabled
          />
          <label>Username</label>
          <input
            type="text"
            onChange={handleFormDataChange}
            name="username"
            value={formData.username}
            className="border border-gray-200 rounded-sm p-2"
          />
          {formValidation.usernameValidation &&
            formData.username.length < 4 && (
              <p className="text-sm text-red-700 pl-2">
                {formValidation.usernameValidation}
              </p>
            )}
          <label>Password</label>
          <input
            type="password"
            onChange={handleFormDataChange}
            placeholder="Enter Password"
            name="password"
            className="border border-gray-200 rounded-sm p-2"
          />
          {formValidation.passwordLengthValidation && (
            <p className="text-sm text-red-700 pl-2">
              {formValidation.passwordLengthValidation}
            </p>
          )}
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={handleFormDataChange}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border border-gray-200 rounded-sm p-2"
          />
          {formValidation.passwordValidation && (
            <p className="text-sm text-red-700 pl-2">
              {formValidation.passwordValidation}
            </p>
          )}

          <button
            type="submit"
            className="bg-slate-800 px-6 py-2 text-white rounded-md"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>

          <span
            onClick={() => setShowModal(true)}
            className="text-red-800 cursor-pointer"
          >
            Delete Account ?
          </span>
        </form>
        {error && <p>{error}</p>}
        <div className={`${showModal ? "visible" : "hidden"}`}>
          <Modal
            action={handleDeleteUser}
            setShowModal={setShowModal}
            text={"Account"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
