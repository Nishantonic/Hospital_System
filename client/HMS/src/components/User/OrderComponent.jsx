import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const OrderComponent = ({ cartItems }) => {
  const navigate = useNavigate();
  const handleOrder = async () => {
    alert("Order Confirmed!!!..");
    navigate("/user/medicine");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg  w-4/5 mx-auto pt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-gray-600">
                  Quantity: {item.quantity} | Price: ${item.price}
                </p>
              </div>
              <div>
                <img
                  src={item.product.image || `https://via.placeholder.com/150`}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty</p>
        )}
      </div>

      {/* Buy Now Button */}
      {cartItems.length > 0 && (
        <button
          onClick={handleOrder}
          className="mt-8 py-3 px-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all text-xl font-semibold shadow-lg w-full"
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default OrderComponent;
