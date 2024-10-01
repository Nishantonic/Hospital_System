import React, { useEffect, useState } from "react";

const Appointment = ({ appoint }) => {
  // const [appoint, setAppoint] = useState("");

  // useEffect(() => {
  //   const getAppointment = async () => {
  //     try {
  //       const res = await axios.get("localhost://5000/appoint/");
  //       setAppoint(res.data);
  //       res.send("Get all Appointments");
  //     } catch (error) {
  //       res.send("Error at  the time of Fetching appointment ");
  //     }
  //   };
  //   getAppointment();
  // });
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* If doctor has an image */}
      {/* <img
        src={doctor.image || "https://via.placeholder.com/150"} // Placeholder if no image
        alt={doctor.name}
        className="h-40 w-full object-cover"
      /> */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{appoint.name}</h3>

        <p className="text-gray-600 ">{appoint.email}</p>
        <p className="text-gray-500 ">{appoint.doctor} </p>
        <p className="text-gray-500 ">{appoint.appointmentDate}</p>
        <p className="text-gray-500 ">{appoint.appointmentTime}</p>
        <div className="flex justify-between items-center">
          <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
            <>Update</>
          </button>
          <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
