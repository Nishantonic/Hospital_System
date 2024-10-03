import React, { useState } from "react";
import Navbar from "./Navbar";
import img from "../images/bgImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";

const SignUp = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    image: null,
  });

  // State for validation messages
  const [validationMsg, setValidationMsg] = useState({
    emailMsg: "",
    phoneMsg: "",
    passwordMsg: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, //  Updating the specific field in formData
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // File input for image
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.email &&
      formData.phoneNo &&
      formData.password
    ) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("phoneNo", formData.phoneNo);
      if (formData.image) {
        data.append("profileImage", formData.image);
      }

      try {
        const res = await axios.post("http://localhost:5000/signup/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(res.data);
        const { token, role } = res.data;
        localStorage.setItem("token", token);
        if (role === "admin") navigate("/admin");
        else navigate("/user");
        alert("Signup successfully!");
        location.reload();
      } catch (error) {
        console.log(error);
        alert("Error during signup: " + error.message);
      }
    } else {
      alert("Please fill in all the required details.");
    }
  };

  // Handle email validation
  const handleEmail = (e) => {
    const emailValid = validator.isEmail(e.target.value);
    setValidationMsg({
      ...validationMsg,
      emailMsg: emailValid ? "✅" : "❌",
    });
  };

  // Handle phone number validation
  const handleNumber = (e) => {
    const phoneValid = validator.isMobilePhone(e.target.value);
    const phoneLength = e.target.value.length === 10; // Checking length for phone number
    setValidationMsg({
      ...validationMsg,
      phoneMsg: phoneValid && phoneLength ? "✅" : "❌",
    });
  };

  // Handle password validation
  const handlePassword = (e) => {
    const passwordValid = validator.isStrongPassword(e.target.value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    setValidationMsg({
      ...validationMsg,
      passwordMsg: passwordValid ? "✅" : "❌",
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="relative flex items-center justify-center h-full bg-cover bg-center pt-20"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 opacity-10"></div>

        <div className="relative z-10 bg-transparent p-8 rounded-lg shadow-2xl max-w-lg w-full hover:bg-opacity-100">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-white font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white"
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-semibold mb-2 text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white"
                onChange={(e) => {
                  handleChange(e);
                  handleEmail(e);
                }}
                required
              />
              <span className="text-red-600 text-sm">
                {validationMsg.emailMsg}
              </span>
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block font-semibold mb-2 text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                placeholder="Enter your Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white"
                onChange={(e) => {
                  handleChange(e);
                  handleNumber(e);
                }}
                required
              />
              <span className="text-red-600 text-sm">
                {validationMsg.phoneMsg}
              </span>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block font-semibold mb-2 text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="8 char: a-z, A-Z, 0-9, Symbols"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-transparent text-white"
                onChange={(e) => {
                  handleChange(e);
                  handlePassword(e);
                }}
                required
              />
              <span className="text-red-600 text-sm">
                {validationMsg.passwordMsg}
              </span>
            </div>

            {/* Profile Picture Upload */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-white">
                Profile Picture
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full bg-transparent text-white"
              />
            </div>

            {/* Sign Up Link */}
            <div className="mb-4 text-right">
              <Link to="/login" className="text-white hover:text-blue-800">
                Already registered? <span className="font-bold">Login</span>
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

export default SignUp;
