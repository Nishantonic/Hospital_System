import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/logo.jpg";
import logOut from "../images/logout.svg";
import { jwtDecode } from "jwt-decode"; // Fix: Remove curly braces, since it's a default import

//template literal
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token: ", decodedToken);
        setUser(decodedToken);
        setImage(
          decodedToken.image
            ? `http://localhost:5000/uploads/${decodedToken.image
                .split("\\")
                .pop()}`
            : "https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg"
        );
      } catch (error) {
        console.log("Invalid token: ", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setUser(null);
    location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 h-14 w-full bg-transparent shadow-xl z-40 fixed  top-0">
      <Link to="/" className="flex items-center">
        <img src={img} alt="Logo" className="h-10 w-10 rounded-full" />
        <h1 className="ml-3 text-xl text-white/90 font-semibold">OmniMed</h1>
      </Link>

      <div className="flex justify-between p-4 bg-transparent  ">
        <ul className="flex  w-full text-xl  font-semibold text-white px-2 justify-evenly   ">
          <li className=" transition hover:text-blue-700 duration-100">
            <Link to="/user/medicine" className="px-4 py-2 hover:underline">
              Buy Medicine
            </Link>
          </li>
          <li className="hover:text-blue-700 transition duration-300">
            <Link to="/user/doctor" className="px-4 hover:underline py-2">
              Doctors
            </Link>
          </li>
          <li className="hover:text-blue-700 transition duration-300">
            <Link to="/user/appointment" className="px-4 hover:underline py-2">
              Get Appointment
            </Link>
          </li>
          <li className="hover:text-blue-700 transition duration-300">
            <Link to="/user/reports" className="px-4 hover:underline py-2">
              Reports
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-6">
        {!user ? (
          <Link to="/login">
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              id="login"
            >
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-white/95 text-lg flex items-center cursor-pointer">
              <img
                src={image}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover mr-2 border  border-blue-700"
              />
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              id="logout"
              className="p-1 h-8 w-8 hover:bg-blue-700 hover:text-white rounded-lg bg-white text-blue-900 border border-blue-700"
            >
              <img src={logOut} alt="" />
            </button>
            {/* <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block"> */}
            {/* <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link> */}

            {/* </div> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
