import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/profile/Sidebar";
import EditProfile from "../components/profile/EditProfile";
import ViewPosts from "../components/profile/ViewPosts";
import CreatePost from "../components/profile/CreatePost";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {darkMode} = useSelector((state) => state.darkmode);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`md:w-1/4 sm:w-1/3 md:flex-shrink-0 p-4 ${
          darkMode ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-300"
        }`}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {activeTab === 0 && <EditProfile setActiveTab={setActiveTab} />}
        {activeTab === 1 && <ViewPosts setActiveTab={setActiveTab} />}
        {activeTab === 2 && <CreatePost setActiveTab={setActiveTab} />}
      </div>
    </div>
  );
};

export default Profile;
