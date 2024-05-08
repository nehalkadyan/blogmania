import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccessful } from "../redux/user/userSlice";

const Signin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [validation, setValidation] = useState({
    emailValidation: "",
    passwordValidation: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        `api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      setLoading(false);
      const data = await res.json();

      if (res.ok) {
        navigate("/");
        dispatch(signInSuccessful(data));
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
            <h1 className="text-white text-lg">Not a member yet?</h1>
            <div className=" text-white">
              <Link to="/signup" className="flex items-center">
                <h1 className="text-md mr-2">Sign Up</h1>
                <FaSignInAlt className="mt-1" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleFormSubmit}
            className="flex gap-5 rounded-md flex-col p-10 sm:14 md:p-20 bg-white"
          >
            <h1 className="text-2xl font-semibold">Sign In</h1>

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
              {loading ? "Loading..." : "Login account"}
            </button>
          </form>
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signin;
