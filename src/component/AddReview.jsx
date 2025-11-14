import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const AddReview = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      alert("Please add rating and comment");
      return;
    }

    // Push review into product.reviews (local update)
    product.reviews.push({ rating, comment });

    setRating(0);
    setComment("");
    alert("Review submitted!");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Add a Review</h3>

      {/* Rating Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className={`w-6 h-6 cursor-pointer transition ${
              (hover || rating) >= star
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Comment Input */}
      <textarea
        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-yellow-500"
        rows={3}
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        type="submit"
        className="mt-4 bg-yellow-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-yellow-600 transition"
      >
        Submit Review
      </button>
    </motion.form>
  );
};
