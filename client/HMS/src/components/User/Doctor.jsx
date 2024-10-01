import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import DoctorList from "./DoctorList";
const Doctor = () => {
  const [doctors, setDoctor] = useState([]);

  useEffect(() => {
    const getDoctorList = async () => {
      try {
        const res = await axios.get("http://localhost:5000/doctor/");
        setDoctor(res.data);
      } catch (error) {
        alert(error.message);
        console.log("Error in doctor ", error);
      }
    };
    getDoctorList();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-500 to-sky-200 min-h-screen w-full pt-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Meet Our World-Class Doctors
          </h2>
          <p className="text-xl text-sky-100 mt-2">
            We have the most skilled professionals to take care of your health.
          </p>
        </div>
        <div className="container mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p className="text-center text-xl text-white col-span-3">
              Loading doctors...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Doctor;
