import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[40vh] md:h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
        <div className="mt-4">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.248A7.963 7.963 0 0120 12h-4c0 2.837-1.211 5.417-3.155 7.248l1.368 2.684A10.002 10.002 0 0022 12h-4zm-8-2.043a7.957 7.957 0 013.155-7.248L8.787 4.068A9.996 9.996 0 002 12h4zm8.474 7.605l-1.369-2.684A7.963 7.963 0 0116 12h4c0 2.837-1.211 5.417-3.155 7.248z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
