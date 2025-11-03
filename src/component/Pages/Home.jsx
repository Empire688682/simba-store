/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* 🦴 Hero Section */}
      <section className="bg-yellow-500 text-white py-20 px-6 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to Simba-Store 🐶
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your one-stop shop for dog essentials, healthy supplements, and
            everything your furry friend deserves.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/shop"
              className="bg-white text-yellow-600 font-semibold py-3 px-8 rounded-full hover:bg-yellow-100 transition"
            >
              🛍️ Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 🐾 Category Highlights */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore by Category
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: "Dog Essentials", icon: "🦮" },
            { name: "Food & Supplements", icon: "🍖" },
            { name: "Health & Drugs", icon: "💊" },
            { name: "Toys & Accessories", icon: "🎾" },
            { name: "Grooming & Hygiene", icon: "🧼" },
          ].map((cat, i) => (
            <motion.div
              key={cat.name}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-gray-700">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🐕 Featured Products */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Products
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Protein Dog Kibble",
                price: "₦12,500",
                img: "/happy-dog.png",
              },
              {
                name: "Leather Dog Collar",
                price: "₦4,500",
                img: "/happy-dog.png",
              },
              {
                name: "Rubber Chew Toy",
                price: "₦2,500",
                img: "/happy-dog.png",
              },
              {
                name: "Pet Grooming Brush Set",
                price: "₦5,000",
                img: "/happy-dog.png",
              },
            ].map((product, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-yellow-600 font-bold">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/shop"
              className="bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition"
            >
              View All Products →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ❤️ About Preview */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            About Simba-Store
          </h2>
          <p className="text-gray-600 mb-8">
            At Simba-Store, we’re passionate about dogs. We believe every pet
            deserves quality care, proper nutrition, and love. Our products are
            carefully selected to keep your best friend healthy, happy, and full
            of life.
          </p>
          <Link
            to="/about"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Learn more →
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
