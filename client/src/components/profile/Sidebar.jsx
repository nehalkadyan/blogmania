import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const handleActiveTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <ul className="p-12 flex flex-col gap-4">
        <li
          onClick={() => handleActiveTabChange(0)}
          className={`${
            activeTab === 0
              ? " bg-gray-100 text-xl font-semibold cursor-pointer text-center p-2 rounded border border-gray-300"
              : "text-xl font-semibold cursor-pointer text-center p-2  rounded border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Profile
        </li>
        <li
          onClick={() => handleActiveTabChange(1)}
          className={`${
            activeTab === 1
              ? " bg-gray-100 text-xl font-semibold cursor-pointer text-center p-2 rounded border border-gray-300"
              : "text-xl font-semibold cursor-pointer text-center p-2 rounded border border-gray-200 hover:bg-gray-100"
          }`}
        >
          View all Posts
        </li>
        <li
          onClick={() => handleActiveTabChange(2)}
          className={`${
            activeTab === 2
              ? " bg-gray-100 text-xl font-semibold cursor-pointer text-center p-2 rounded border border-gray-300"
              : "text-xl font-semibold cursor-pointer text-center p-2 rounded border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Create Post
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
