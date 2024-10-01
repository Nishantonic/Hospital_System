import React from "react";
import image from "../images/bgimg.jpg";
import Navbar from "./Navbar";
import Services from "./User/Services";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen ">
        {/* Gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-black opacity-10 z-10"></div>

        <div className="absolute z-20 text-white left-10 top-1/4 max-w-md">
          <h1 className="font-bold text-5xl mb-4 leading-tight">
            Health is Wealth
          </h1>
          <p className="text-lg mb-6 leading-relaxed">
            Discover a new way to take care of your health with personalized
            care, advanced technology, and a focus on your well-being. At
            Serenity Health Center, we believe that your health is your greatest
            asset.
          </p>
          <button className="bg-blue-600 text-white p-3 px-6 rounded-full shadow-lg hover:bg-white hover:text-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out">
            Explore more ➡️
          </button>
        </div>

        {/* Background image */}
        <img
          src={image}
          alt="Background"
          className=" w-full  absolute h-full z-0"
        />
      </div>
      <div>
        <Services />
      </div>
    </>
  );
};

export default Home;
