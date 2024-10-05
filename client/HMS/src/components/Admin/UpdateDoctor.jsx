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
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
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

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phoneNo", form.phoneNo);
    data.append("password", form.password);
    data.append("speciality", form.speciality);
    data.append("experience", form.experience);

    // const formData = {
    //   name: form.name,
    //   email: form.email,
    //   phoneNo: form.phoneNo,
    //   password: form.password,
    //   experience: form.experience,
    //   speciality: form.speciality,
    //   image: form.image,
    // };

    // Only append image if it's changed
    if (form.image) {
      data.append("profileImage", form.image);
    }

    try {
      // Update doctor with the specific ID

      for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const res = await axios.put(
        `http://localhost:5000/doctor/update/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Doctor updated successfully data : ", res.data);
      console.log("Formdata: ", form);

      alert("Doctor updated successfully");
      navigate("/admin");
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
          encType="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            placeholder="Enter Your Name"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            placeholder="Enter Your Email"
            onChange={handleChange}
          />

          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            value={form.phoneNo}
            placeholder="Enter Your Number"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="speciality"
            value={form.speciality}
            placeholder="Specialization"
            onChange={handleChange}
          />

          <label htmlFor="experience">Experience</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
          />

          <label htmlFor="image">Image</label>
          <input type="file" name="profileImage" onChange={handleFile} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UpdateDoctor;
