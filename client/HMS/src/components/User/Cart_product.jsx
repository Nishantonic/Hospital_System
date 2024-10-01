import React, { useState } from "react";
import Navbar from "../Navbar";
import products from "../../../data/MedProduct.json";
import { useParams } from "react-router-dom";
import OrderComponent from "./OrderComponent";

const MedProducts = () => {
  const { id } = useParams();
  const product = products[id];
  const [qnt, setQnt] = useState(1);
  const [price, setPrice] = useState(product.price);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const updatePrice = (quantity) => {
    setPrice((product.price * quantity).toFixed(2));
  };

  const handleAdd = () => {
    const val = qnt + 1;
    setQnt(val);
    updatePrice(val);
  };

  const handleSub = () => {
    if (qnt > 1) {
      const val = qnt - 1;
      setQnt(val);
      updatePrice(val);
    }
  };

  const handleSubmit = () => {
    const addItem = { product: product, quantity: qnt, price: price };
    addToCart(addItem);
  };

  // const handleOrder = () => {
  //   // Handle the logic for completing the order
  //   console.log("Order placed for: ", cartItems);
  // };

  return (
    <>
      <Navbar />

      {cartItems.length > 0 ? (
        <OrderComponent id={id} cartItems={cartItems} />
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 pt-20 flex  w-full justify-center items-center h-screen">
          <div className="flex w-4/5 bg-gray-100 rounded-lg p-6">
            <div className="w-1/2 p-6">
              <img
                src={`${product.image}` || `https://via.placeholder.com/150`}
                alt={product.name}
                className="rounded-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="w-1/2 p-6">
              <h2 className="text-2xl font-bold flex  flex-wrap text-gray-800">
                {product.name}
                <span className="text-sm text-sky-600 ">
                  {product.uses[0]}{" "}
                </span>
              </h2>

              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={handleSub}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-red-600 focus:outline-none shadow-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={qnt}
                  readOnly
                  className="text-center w-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <button
                  onClick={handleAdd}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-green-600 focus:outline-none shadow-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-8 py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-xl font-semibold shadow-lg flex items-center space-x-2"
              >
                <span>Buy Now</span>
                <span className="bg-gray-900 text-white py-1 px-3 rounded-full ml-3">
                  ${price}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MedProducts;
