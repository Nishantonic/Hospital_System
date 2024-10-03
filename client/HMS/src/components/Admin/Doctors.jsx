import { useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorList = ({ doctor, key }) => {
  const image = doctor.image
    ? `http://localhost:5000/uploads/${doctor.image.split("\\").pop()}`
    : "https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg";

  useEffect(() => {
    console.log(doctor);
  }, []);
  return (
    <div className="bg-white flex shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* If doctor has an image */}
      <img
        src={image} // Placeholder if no image
        alt={doctor.name}
        className=" h-full w-48 "
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
        <p className="text-gray-600 ">{doctor.phoneNo}</p>

        <p className="text-gray-600 ">{doctor.speciality}</p>
        <p className="text-gray-500 ">{doctor.experience} years experience</p>
        <div className="flex justify-evenly items-center">
          <Link to={`/admin/update/${doctor._id}`}>
            <button className="mt-4 py-2 px-4 mr-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
              <>Update</>
            </button>
          </Link>

          <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
