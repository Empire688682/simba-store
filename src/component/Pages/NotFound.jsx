import React from "react";
import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-6 text-center">
      {/* Icon */}
      <PawPrint size={60} className="text-amber-500 mb-4 animate-bounce" />

      {/* Text */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Oops! Page Not Found 🐾
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Looks like Simba chewed up this page. Don’t worry — let’s get you back
        to a safer place.
      </p>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-block bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition"
      >
        Go Back Home
      </Link>

      {/* Decorative paw prints */}
      <div className="absolute bottom-8 flex gap-3 opacity-30">
        <PawPrint size={28} />
        <PawPrint size={28} />
        <PawPrint size={28} />
      </div>
    </div>
  );
};

export default NotFound;
