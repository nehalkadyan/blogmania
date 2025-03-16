import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[40vh] md:h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Circular Loader */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Loading Text */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Loading<span className="animate-pulse">...</span>
        </h2>
        {/* Subtle Animated Progress Bar */}
        <div className="w-36 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-slide"></div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-slide {
            animation: slide 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
