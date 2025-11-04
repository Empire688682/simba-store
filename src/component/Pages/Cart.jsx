import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Royal Canin Puppy Food",
    price: 12000,
    image:
      "/happy-dog.png",
    qty: 1,
  },
  {
    id: 2,
    name: "Flea & Tick Shampoo",
    price: 7500,
    image:
      "/happy-dog.png",
    qty: 2,
  },
];

const Cart = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-[80vh] bg-gray-50 pt-20 pb-28 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="text-yellow-600 w-8 h-8" />
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-yellow-700 font-bold">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="w-6 h-6 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                          -
                        </button>
                        <span className="text-gray-700">{item.qty}</span>
                        <button className="w-6 h-6 bg-yellow-400 rounded-md hover:bg-yellow-500 transition">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <Trash2 className="text-red-500 cursor-pointer hover:scale-110 transition" />
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-100 rounded-xl p-6 shadow-inner">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <p>Subtotal</p>
                <p>₦{total.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <p>Shipping</p>
                <p>₦1,500</p>
              </div>
              <div className="border-t mt-4 mb-3"></div>
              <div className="flex justify-between text-gray-900 font-bold text-lg">
                <p>Total</p>
                <p>₦{(total + 1500).toLocaleString()}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto text-gray-400 w-16 h-16 mb-4" />
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
