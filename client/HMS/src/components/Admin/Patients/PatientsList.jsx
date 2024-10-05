import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const PatientsList = ({ patient }) => {
  const id = patient._id;
  const image = patient.image
    ? `http://localhost:5000/uploads/${patient.image.split("\\").pop()}`
    : "https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this paitnet?")) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/patient/delete/${id}`
        );

        if (res.status === 200) {
          console.log("patient deleted successfully", res.data);
          // Add logic to refresh the list or notify the parent component
          // alert("Doctor deleted successfully");
          window.location.reload(); // or use a state update to remove the deleted doctor from the list
        } else {
          console.log("Error: patient not deleted");
        }
      } catch (error) {
        console.log("Deleting patient give an  Error:", error.message);
        alert("Failed to delete patient. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white flex shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* If patient has an image */}
      <img
        src={image} // Placeholder if no image
        alt={patient.name}
        className=" h-full w-48 "
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{patient.name}</h3>
        <p className="text-gray-600 ">{patient.phoneNo}</p>
        <p className="text-gray-600 ">{patient.email}</p>

        <div className="flex justify-evenly items-center">
          <Link to={`/admin/update/${patient._id}`}>
            <button className="mt-4 py-2 px-4 mr-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
              <>Update</>
            </button>
          </Link>

          <button
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
