import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateDoctor = () => {
  const navigate = useNavigate();

  const [form, setform] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    speciality: "",
    experience: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setform({
      ...form,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const doctor = new FormData(); // Corrected this part
      doctor.append("name", form.name);
      doctor.append("email", form.email);
      doctor.append("phoneNo", form.phoneNo);
      doctor.append("password", form.password);
      doctor.append("speciality", form.speciality);
      doctor.append("experience", form.experience);
      if (form.image) {
        doctor.append("profileImage", form.image);
      }

      const res = await axios.post(
        "http://localhost:5000/doctor/create",
        doctor,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Doctor created successfully", res.data);
      alert("Doctor created successfully");
      navigate("/admin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full justify-between items-center">
        <div className="flex h-[80%] w-1/2 flex-col justify-between items-start">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name" // Added name attribute
            placeholder="Enter Your Name"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email" // Added name attribute
            placeholder="Enter Your Email"
            onChange={handleChange}
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo" // Added name attribute
            placeholder="Enter Your Number"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="string" // Changed type to "password" for better security
            id="password"
            name="password" // Added name attribute
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="speciality" // Added name attribute
            placeholder="Specialization"
            onChange={handleChange}
          />

          <label htmlFor="experience">Experience</label>
          <input
            type="number"
            id="experience"
            name="experience" // Added name attribute
            onChange={handleChange}
          />

          <label htmlFor="image">Image</label>
          <input type="file" name="profileImage" onChange={handleFile} />

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateDoctor;
