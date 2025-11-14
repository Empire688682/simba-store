import React, { useState } from "react";
import { UseGlobalContext } from "../Context";
import { Heart } from "lucide-react";
import { categories } from "../data";
import { Link } from "react-router-dom";

const Shop = () => {
  const { products, addToCart, favorites, toggleFave, cartItems } = UseGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState("All");

  function isInCart(productId){
    const isAdded = Object.keys(cartItems).filter(id=> parseInt(id) === productId);
    console.log("isAdded:", isAdded);
  }
  

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          🐾 Simba-Store Products
        </h1>

        {/* Category Filter */}
        <div className="mb-10 flex justify-center">
          {/* Desktop Buttons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
                  selectedCategory === cat
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden w-full max-w-xs">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item) => {
            const isFav = favorites?.includes(item.id);
            isInCart(item.id)
            return (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
              >
                {/* Favorite Button (Top-right Heart) */}
                <button
                  onClick={() => toggleFave(item.id)}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFav ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                  />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />

                <Link
                to={`/shop/${item.id}`}
                 className="p-4 flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-gray-700 font-semibold mb-4">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    {
                      Object.keys(cartItems).includes(item.id) ? 
                      "Added" : "Add to Cart"
                    }
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products found in this category 🐾
          </p>
        )}
      </div>
    </div>
  );
};

export default Shop;
