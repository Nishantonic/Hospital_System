import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Assuming you already have a Navbar component
import axios from "axios";
import Doctors from "../../src/components/Admin/Doctors";
import Appointment from "./Admin/Appointment";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctor, setDoctor] = useState("");
  const [appoint, setAppoint] = useState("");
  useEffect(() => {
    const handleDoctor = async () => {
      try {
        const res = await axios.get("http://localhost:5000/doctor");
        setDoctor(res.data);
      } catch (error) {
        alert("Error", error.message);
      }
    };

    const handleAppointment = async () => {
      try {
        const res = await axios.get("http://localhost:5000/appoint/");
        setAppoint(res.data);
      } catch (error) {
        alert("Error", error.message);
      }
    };
    handleDoctor();
    handleAppointment();
  });
  // Function to handle navigation between tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-sky-600 via-white to-slate-600">
        <Navbar />
        <div className="flex h-screen pt-14">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
            <ul className="space-y-4">
              <li
                onClick={() => handleTabChange("dashboard")}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-600 ${
                  activeTab === "dashboard" ? "bg-gray-600" : ""
                }`}
              >
                Dashboard
              </li>
              <li
                onClick={() => handleTabChange("doctors")}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-600 ${
                  activeTab === "doctors" ? "bg-gray-600" : ""
                }`}
              >
                Doctors Management
              </li>
              <li
                onClick={() => handleTabChange("patients")}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-600 ${
                  activeTab === "patients" ? "bg-gray-600" : ""
                }`}
              >
                Patients Management
              </li>
              <li
                onClick={() => handleTabChange("appointments")}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-600 ${
                  activeTab === "appointments" ? "bg-gray-600" : ""
                }`}
              >
                Appointments
              </li>
              <li
                onClick={() => handleTabChange("reports")}
                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-600 ${
                  activeTab === "reports" ? "bg-gray-600" : ""
                }`}
              >
                Reports
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="w-3/4 p-8 bg-gray-100">
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Overview of the hospital's performance and key stats.</p>
              </div>
            )}
            {activeTab === "doctors" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">Doctors Management</h1>
                <p>Manage doctors, add new doctors, update doctor profiles.</p>
                <div className="grid grid-cols-2 gap-6">
                  {doctor.map((doctor) => (
                    <Doctors doctor={doctor} />
                  ))}
                </div>

                {/* You can add further UI components here for managing doctors */}
              </div>
            )}
            {activeTab === "patients" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">Patients Management</h1>
                <p>View and manage patient records, add new patients.</p>
                {/* You can add further UI components here for managing patients */}
              </div>
            )}
            {activeTab === "appointments" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">Appointments</h1>
                <p>
                  Manage upcoming appointments, schedule or reschedule
                  appointments.
                </p>
                {appoint.map((appoint) => (
                  <Appointment appoint={appoint} />
                ))}
                {/* You can add further UI components here for managing appointments */}
              </div>
            )}
            {activeTab === "reports" && (
              <div>
                <h1 className="text-3xl font-bold mb-4">Reports</h1>
                <p>
                  Generate reports based on doctor performance, patient stats,
                  and more.
                </p>
                {/* You can add further UI components here for reports */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
