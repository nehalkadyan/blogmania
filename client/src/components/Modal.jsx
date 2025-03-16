import React from "react";
import { useSelector } from "react-redux";

const Modal = ({ setShowModal, action, text }) => {
  const { darkMode } = useSelector((state) => state.darkmode);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ${
        darkMode ? "bg-opacity-60" : "bg-opacity-40"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-xl transform transition-all ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Modal Header */}
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Are you sure you want to delete your{" "}
          <span className="font-bold text-red-500">{text}</span>?
        </h1>

        {/* Action Buttons */}
        <div className="flex gap-6 justify-center py-4">
          {/* Confirm Button */}
          <button
            onClick={action}
            className={`px-6 py-3 rounded-md font-medium shadow-lg transition-all ${
              darkMode
                ? "bg-red-600 hover:bg-red-500 focus:ring-red-700"
                : "bg-red-500 hover:bg-red-400 focus:ring-red-600"
            } text-white focus:outline-none focus:ring-2`}
          >
            Yes, Delete
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => setShowModal(false)}
            className={`px-6 py-3 rounded-md font-medium shadow-lg transition-all ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-500 focus:ring-gray-500"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400"
            }  focus:outline-none focus:ring-2`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
