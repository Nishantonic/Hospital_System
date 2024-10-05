import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    speciality: "",
    experience: "",
    image: null,
  });

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/doctor/getSingleDoctor/${id}`
        );
        const fetchedDoctor = res.data;
        console.log("FEtchedDoctor", fetchedDoctor);

        // Set form data with fetched doctor's data
        setForm({
          name: fetchedDoctor.name || "",
          email: fetchedDoctor.email || "",
          phoneNo: fetchedDoctor.phoneNo || "",
          password: fetchedDoctor.password || "",
          speciality: fetchedDoctor.speciality || "",
          experience: fetchedDoctor.experience || "",
          image: fetchedDoctor.image,
        });
      } catch (error) {
        console.log("Error fetching doctor: ", error.message);
      }
    };

    getDoctor();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log("change in form : ", form);
  };

  // Handle file input (image)
  const handleFile = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };

  // Submit the updated form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phoneNo", form.phoneNo);
      formData.append("password", form.password);
      formData.append("speciality", form.speciality);
      formData.append("experience", form.experience);
      if (form.image) {
        formData.append("profileImage", form.image);
      }

      // Update doctor with the specific ID
      const res = await axios.put(
        `http://localhost:5000/doctor/update/${id}`, // Using PUT for updates, assuming API supports it
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Doctor updated successfully", res.data);
      alert("Doctor updated successfully");
      navigate("/admin"); // Navigate back to admin after successful update
    } catch (error) {
      console.log("Error updating doctor:", error.message);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full justify-between items-center">
        <form
          className="flex h-[80%] w-1/2 flex-col justify-between items-start"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name} // Set the value from form state
            placeholder="Enter Your Name"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email} // Set the value from form state
            placeholder="Enter Your Email"
            onChange={handleChange}
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={form.phoneNo} // Set the value from form state
            placeholder="Enter Your Number"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password} // Set the value from form state
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="speciality"
            value={form.speciality} // Set the value from form state
            placeholder="Specialization"
            onChange={handleChange}
          />

          <label htmlFor="experience">Experience</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={form.experience} // Set the value from form state
            onChange={handleChange}
          />

          <label htmlFor="image">Image</label>
          <input type="file" name="profileImage" onChange={handleFile} />

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateDoctor;
