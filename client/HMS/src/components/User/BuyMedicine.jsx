import React, { useEffect, useState } from "react";
import axios from "axios";
import products from "../../../data/MedProduct.json";
import Navbar from "../Navbar";
import MedProducts from "./MedProducts";
const BuyMedicine = () => {
  // const [medicines, setMedicines] = useState([]);
  // const val = 0;
  // useEffect(() => {
  //   const fetchMedicines = async () => {
  //     try {
  //       setMedicines(products);

  //       console.log("response for med: ", products);
  //     } catch (error) {
  //       console.error("Error fetching drug data:", error);
  //     }
  //   };

  //   fetchMedicines();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-blue-500 to-sky-200 min-h-screen w-full pt-16">
        <div className="text-center mb-8">
          <h2
            className="text-4xl font-bold 
          bg-gradient-to-r from-white  to-indigo-900 inline-block text-transparent bg-clip-text
 
          "
          >
            Buy medicine here at your best price...
          </h2>
          <p className="text-xl text-sky-100 mt-2">
            We have the most skilled professionals to take care of your health.
          </p>
        </div>
        <div className="container mx-auto grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 pb-5">
          {products.length > 0 ? (
            products.map((product, index) => (
              <MedProducts index={`${index}`} product={product} />
            ))
          ) : (
            <p className="text-center text-xl text-white col-span-3">
              Loading Medicines...
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyMedicine;
