import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import img from "../images/bgImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// nis@gmail.com
// Nish@8888

// xyz@gmail.com
// Test@1212

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:5000/signup/login", User);
      const { token } = res.data;

      console.log("Login response", res.data);
      if (typeof token === "string") {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const role = decoded.role;
        alert("Login Successfully");

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/user");
        }
      } else {
        throw new Error("Invalid token received from server");
      }
      location.reload();
    } catch (error) {
      console.log(error);
      // res.send("Error: " + error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      {/* <div
        className="flex flex-col justify-center
       items-center h-[100vh] relative text-2xl z-10"
      >
        <div className="broder-2">
          <div className="m-2 p-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Enter your Email..."
              className="bg-transparent "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="m-2 p-2">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              placeholder="Enter your password..."
              className="bg-transparent "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="m-2 p-2">
            <Link to="/signup" className="text-blue-500">
              Not register?
              <span className="text-red-700 font-bold underline">SignUp</span>
            </Link>
          </div>
          <button
            className="m-2 p-0.5 flex ml-56 bg-white text-blue-600 hover:bg-blue-700 hover:text-white rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <img src={img} className="absolute -z-10 h-screen w-full" />
      </div> */}
      <div
        className="relative flex items-center justify-center h-[100vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black opacity-5"></div>

        {/* Card for login form */}
        <div className="relative z-10 bg-transparent p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-5xl font-bold text-center text-white mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-white text-3xl font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white text-2xl"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-white text-3xl  font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white text-2xl"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Sign Up Link */}
            <div className="mb-4 text-right">
              <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                Not registered? <span className="font-bold">Sign Up</span>
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
