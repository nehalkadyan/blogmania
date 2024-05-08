import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import EditProfile from "../components/profile/EditProfile";
import ViewPosts from "../components/profile/ViewPosts";
import CreatePost from "../components/profile/CreatePost";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="flex flex-col md:flex-row">
      {" "}
      <div className="md:w-1/4 sm:w-1/3 md:flex-shrink-0">
        {" "}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex-grow">
        {" "}
        {activeTab === 0 && <EditProfile setActiveTab={setActiveTab} />}{" "}
        {activeTab === 1 && <ViewPosts setActiveTab={setActiveTab} />}{" "}
        {activeTab === 2 && <CreatePost setActiveTab={setActiveTab} />}{" "}
      </div>
    </div>
  );
};

export default Profile;
