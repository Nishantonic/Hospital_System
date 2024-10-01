import React from "react";
// import Cart_product from "./Cart_product.jsx";
import { Link } from "react-router-dom";
Link;
const MedProducts = ({ index, product }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-40 p-2"
        />
        <span className="absolute top-2 left-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-1 text-xs rounded-lg font-bold uppercase shadow-lg animate-pulse ring-2 ring-white">
          {product.uses[0] || "General Use"}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <Link to={`/user/medicine/cart/${index}`}>
            <button
              className="relative px-4 py-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white   rounded-full shadow-lg hover:from-white hover:to-sky-700 transition-all duration-300 ease-in-out transform hover:text-blue-700 font-semibold hover:scale-105 focus:ring-4 focus:ring-sky-300"
              // onClick={alert(key)}
            >
              Add to Cart
            </button>
          </Link>
          <span className="text-xl font-bold text-gray-800 ml-4 bg-yellow-300 rounded-lg px-4 py-2 shadow-md">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedProducts;
