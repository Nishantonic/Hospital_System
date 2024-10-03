import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Admin from "./components/Admin/Admin";
// import User from "./components/User";
import BuyMedicine from "../src/components/User/BuyMedicine";
import { jwtDecode } from "jwt-decode";
import Doctor from "./components/User/Doctor";
import GetAppointment from "./components/User/GetAppointment";
import Cart_product from "./components/User/Cart_product";
import CreateDoctor from "./components/Admin/CreateDoctor";
import UpdateDoctor from "./components/Admin/UpdateDoctor";

const App = () => {
  const [role, setRole] = useState("null");
  const url = useParams();
  // const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        // navigate("/login");
      }
    }
  }, [url]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/user"
            element={role === "user" ? <Home /> : <Login />}
          />
          <Route
            path="/user/medicine"
            element={role == "user" ? <BuyMedicine /> : <Login />}
          />
          <Route
            path="/user/doctor"
            element={role == "user" ? <Doctor /> : <Login />}
          />
          <Route
            path="/user/appointment"
            element={role === "user" ? <GetAppointment /> : <Login />}
          />

          <Route
            path="/user/medicine/cart/:id"
            element={role === "user" ? <Cart_product /> : <Login />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={role === "admin" ? <Admin /> : <Login />}
          />

          <Route
            path="/admin/add"
            element={role === "admin" ? <CreateDoctor /> : <Login />}
          />
          <Route
            path="/admin/update/:id"
            element={role === "admin" ? <UpdateDoctor /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
