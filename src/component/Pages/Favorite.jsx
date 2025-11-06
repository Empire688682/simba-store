import React from "react";
import { UseGlobalContext } from "../Context";

const Favorites = () => {
  const { products, favorites, toggleFave, addToCart } = UseGlobalContext();

  // Filter favorite products by IDs
  const favProducts = products.filter(p => favorites.includes(p.id));
  console.log("favProducts:", favProducts);
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-semibold mb-6 text-center">❤️ My Favorites</h1>

      {favProducts.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p>No favorite items yet.</p>
          <p className="text-sm text-gray-400">Add some products to your favorites ❤️</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mb-2">₦{product.price}</p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleFave(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
