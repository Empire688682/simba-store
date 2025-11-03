import React, { useState } from "react";

const products = [
  // 🐕 Dog Essentials
  {
    id: 1,
    name: "Leather Dog Collar",
    price: 4500,
    category: "Dog Essentials",
    image: "/happy-dog.png",
  },
  {
    id: 2,
    name: "Adjustable Dog Leash",
    price: 6000,
    category: "Dog Essentials",
    image: "/happy-dog.png",
  },

  // 🍖 Food & Supplements
  {
    id: 3,
    name: "Protein Dog Kibble",
    price: 12500,
    category: "Food & Supplements",
    image: "/happy-dog.png",
  },
  {
    id: 4,
    name: "Vitamin & Omega-3 Supplement",
    price: 8500,
    category: "Food & Supplements",
    image: "/happy-dog.png",
  },

  // 💊 Health & Drugs
  {
    id: 5,
    name: "Anti-Tick & Flea Spray",
    price: 7500,
    category: "Health & Drugs",
    image: "/happy-dog.png",
  },
  {
    id: 6,
    name: "Deworming Tablets",
    price: 4000,
    category: "Health & Drugs",
    image: "/happy-dog.png",
  },

  // 🎾 Toys & Accessories
  {
    id: 7,
    name: "Rubber Chew Toy",
    price: 2500,
    category: "Toys & Accessories",
    image: "/happy-dog.png",
  },
  {
    id: 8,
    name: "Interactive Treat Ball",
    price: 5500,
    category: "Toys & Accessories",
    image: "/happy-dog.png",
  },

  // 🧼 Grooming & Hygiene
  {
    id: 9,
    name: "Dog Shampoo & Conditioner",
    price: 6500,
    category: "Grooming & Hygiene",
    image: "/happy-dog.png",
  },
  {
    id: 10,
    name: "Pet Grooming Brush Set",
    price: 5000,
    category: "Grooming & Hygiene",
    image: "/happy-dog.png",
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Dog Essentials",
    "Food & Supplements",
    "Health & Drugs",
    "Toys & Accessories",
    "Grooming & Hygiene",
  ];

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
        <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-gray-700 font-semibold mb-4">
                  ₦{item.price.toLocaleString()}
                </p>
                <button className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
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
