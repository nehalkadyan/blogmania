import React from "react";
import { useSelector } from "react-redux";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const {darkMode} = useSelector((state) => state.darkmode);

  const handleActiveTabChange = (index) => {
    setActiveTab(index);
  };

  const tabs = ["Profile", "View all Posts", "Create Post"];

  return (
    <div
      className={`w-full h-full p-6 rounded-lg shadow-md transition-all ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <ul className="flex flex-col gap-4">
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => handleActiveTabChange(index)}
            className={`text-lg font-semibold cursor-pointer text-center p-3 rounded-lg border transition-all duration-300 ${
              activeTab === index
                ? darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-200 border-gray-400 text-gray-900"
                : darkMode
                ? "hover:bg-gray-700 hover:border-gray-600 border-gray-700 text-gray-400"
                : "hover:bg-gray-100 hover:border-gray-300 border-gray-300 text-gray-600"
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
