import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccessful } from "../redux/user/userSlice";
import toast from "react-hot-toast";

const Signin = () => {
  const {darkMode} = useSelector((state) => state.darkmode);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
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
      const res = await fetch(`http://localhost:5000/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return toast.error(data.message || "Invalid login credentials");
      }

      setLoading(false);
      toast.success("You are logged in!");
      dispatch(signInSuccessful(data));
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
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
            Unlock a world of possibilities by signing in!
          </p>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <p className="text-md">Not a member yet?</p>
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-400 transition duration-200 flex items-center"
            >
              <span className="mr-1">Sign Up</span>
              <FaSignInAlt />
            </Link>
          </div>
        </div>

        {/* Right Section (Signin Form) */}
        <div
          className={`w-full md:w-1/2 p-8 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6">Sign In to your account</h2>

          <form onSubmit={handleFormSubmit} className="space-y-5">
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

            {/* Sign In Button */}
            <button
              type="submit"
              className={`w-full p-3 rounded-md text-white font-medium transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 border-t border-gray-300" />

          {/* Sign up Link */}
          <div className="mt-6 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-400 transition"
              >
                Sign up here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
