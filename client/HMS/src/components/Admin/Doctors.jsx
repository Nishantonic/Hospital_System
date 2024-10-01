const DoctorList = ({ doctor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* If doctor has an image */}
      <img
        src={doctor.image || "https://via.placeholder.com/150"} // Placeholder if no image
        alt={doctor.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>

        <p className="text-gray-600 ">{doctor.speciality}</p>
        <p className="text-gray-500 ">{doctor.experience} years experience</p>
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

export default DoctorList;
