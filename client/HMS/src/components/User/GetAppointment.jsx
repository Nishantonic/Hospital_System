import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { jwtDecode } from "jwt-decode"; // Corrected import

const GetAppointment = () => {
  const [user, setUser] = useState({ name: "", email: "", phoneNo: "" }); // Ensure initial user object
  const [minDate, setMinDate] = useState("");
  const [doctor, setDoctor] = useState();
  const [time, setTime] = useState("");

  useEffect(() => {
    const getData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({
            name: decoded.name || "", // Adjust based on how JWT is structured
            email: decoded.email || "",
            phoneNo: decoded.phoneNo || "", // Ensure phoneNo is present in JWT
          });
        } catch (error) {
          console.error("Error decoding token: ", error.message);
        }
      } else {
        console.error("Token not found");
      }
    };
    const setTodayDate = () => {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      const dd = String(today.getDate()).padStart(2, "0");
      setMinDate(`${yyyy}-${mm}-${dd}`);
    };

    getData();
    setTodayDate();
  }, []);

  const handleSubmit = async () => {
    const appointment = {
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
      doctor: doctor,
      appointmentDate: minDate,
      appointmentTime: time,
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/appoint/form",
        appointment
      );
      res.status(200).send("Appointment Submitted");
    } catch (error) {
      res.send(error);
      console.log("Error: ", error);
    }

    alert("Appointment Booked!!!...");
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto bg-gradient-to-r from-blue-700 via-violet-400 to-yellow-200 rounded-xl shadow-md overflow-hidden pt-14">
        <div className="flex w-full justify-between items-center">
          <div className="w-full flex-col p-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white ">
              Get Appointment
            </h2>
            <form>
              {/* Patient Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="patientName"
                >
                  Patient Name
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="patientName"
                  type="text"
                  placeholder="Enter your name"
                  value={user.name}
                  readOnly
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={user.email}
                  readOnly
                />
              </div>

              {/* Phone */}
              {/* <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={user.phoneNo}
                  readOnly
                />
              </div> */}

              {/* Select Doctor */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="doctor"
                >
                  Select Doctor
                </label>
                <select
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="doctor"
                  onSelect={(e) => {
                    setDoctor(e.target.value);
                  }}
                >
                  <option value="">Select Doctor</option>
                  <option value="doctor1">Dr. Sunil Batra</option>
                  <option value="doctor2">Dr. Akash Singh</option>
                  <option value="doctor3">Dr. Emily Davis</option>
                  <option value="doctor3">Dr. Kratika Saxsena</option>
                  <option value="doctor3">Dr. Pallavi Thakur</option>
                </select>
              </div>

              {/* Appointment Date */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Appointment Date
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="date"
                  type="date"
                  min={minDate}
                />
              </div>

              {/* Appointment Time */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="time"
                >
                  Appointment Time
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  id="time"
                  type="time"
                  onSelect={setTime}
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSubmit}
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
          <div className="relative">
            <img
              src="https://www.askapollo.com/assets/images/book-appointment-bg.png"
              alt="Appointment Background"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAppointment;
