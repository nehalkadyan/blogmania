import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    usernameValidation: "",
    emailValidation: "",
    passwordValidation: "",
  });

  const navigate = useNavigate();

  console.log(formData);

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.username.length < 4) {
        setValidation({
          ...validation,
          usernameValidation: "username must have atleast 4 characters",
        });
        return;
      }

      if (formData.email.length < 8) {
        setValidation({
          ...validation,
          emailValidation: "email must have atleast 8 characters",
        });
        return;
      }

      if (formData.password.length < 4) {
        setValidation({
          ...validation,
          passwordValidation: "password must have atleast 4 characters",
        });
        return;
      }
      setLoading(true);
      setError(null);
      const res = await fetch(
        `api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setLoading(false);
      if (res.ok) {
        navigate("/signin");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div className=" bg-slate-900 min-h-screen flex-col sm:flex-row flex justify-center items-center">
      <div className="flex flex-col sm:flex-row w-[80%] items-center justify-center sm:justify-around">
        <div className="sm:w-1/2">
          <h1 className="text-white text-3xl sm:text-5xl">
            It's time to boost your creativity
          </h1>
          <div className="mt-8 mb-10 sm:mb-0">
            <h1 className="text-white text-lg">Already a member?</h1>
            <div className="  text-white">
              <Link to="/signin" className="flex items-center">
                <h1 className="text-md mr-2">Sign In</h1>
                <FaSignInAlt className="mt-1" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleFormSubmit}
            className="flex gap-3 rounded-md flex-col p-10 sm:14 md:p-20 bg-white"
          >
            <h1 className="text-2xl font-semibold">Sign up</h1>
            <input
              type="text"
              name="username"
              onChange={handleFormDataChange}
              className="border border-gray-200 p-2 outline-none"
              placeholder="Full Name"
            />
            {validation.usernameValidation && (
              <p className="text-sm text-red-600 text-center">
                {validation.usernameValidation}
              </p>
            )}
            <input
              type="email"
              name="email"
              onChange={handleFormDataChange}
              className="border border-gray-200 p-2 outline-none"
              placeholder="Email"
            />
            {validation.emailValidation && (
              <p className="text-sm text-red-600 text-center">
                {validation.emailValidation}
              </p>
            )}
            <input
              type="password"
              name="password"
              onChange={handleFormDataChange}
              className="border border-gray-200 p-2 outline-none"
              placeholder="Password"
            />
            {validation.passwordValidation && (
              <p className="text-sm text-red-600 text-center">
                {validation.passwordValidation}
              </p>
            )}
            <button
              className="font-medium bg-slate-900 p-2 rounded-full text-white"
              type="submit"
            >
              {loading ? "Loading..." : "Create account"}
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
