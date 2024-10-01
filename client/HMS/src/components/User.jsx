import React from "react";
import Navbar from "./Navbar";
import Services from "./User/Services";
const User = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen pt-20 bg-blue-700">
        <Services />
      </div>
    </>
  );
};

export default User;
