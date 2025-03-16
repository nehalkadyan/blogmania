import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Signup = () => {
  const {darkMode} = useSelector((state) => state.darkmode);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.username.length < 4) {
      toast.error("Username must have at least 4 characters");
      return;
    }
    if (formData.email.length < 8) {
      toast.error("Email must have at least 8 characters");
      return;
    }
    if (formData.password.length < 4) {
      toast.error("Password must have at least 4 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://blogmania-2-0.onrender.com/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.user) {
        setLoading(false);
        return toast.error("Username or email already exists!");
      }

      setLoading(false);
      toast.success("User successfully created!");
      navigate("/signin");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-12">
        {/* Left Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">
            It's time to boost your creativity
          </h1>
          <p className="text-lg opacity-80 mb-6">
            Join our platform and explore endless possibilities!
          </p>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <p className="text-md">Already a member?</p>
            <Link
              to="/signin"
              className="text-blue-500 hover:text-blue-400 transition duration-200 flex items-center"
            >
              <span className="mr-1">Sign In</span>
              <FaSignInAlt />
            </Link>
          </div>
        </div>

        {/* Right Section (Signup Form) */}
        <div
          className={`w-full md:w-1/2 p-8 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormDataChange}
                className={`w-full p-3 rounded-md border focus:outline-none transition ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Username"
                aria-label="Username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormDataChange}
                className={`w-full p-3 rounded-md border focus:outline-none transition ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Email"
                aria-label="Email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormDataChange}
                className={`w-full p-3 rounded-md border focus:outline-none transition ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                    : "bg-gray-50 border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Password"
                aria-label="Password"
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className={`w-full p-3 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-300" />

          {/* Sign in Link */}
          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-500 hover:text-blue-400 transition"
              >
                Sign in here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
