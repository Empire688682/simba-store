
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { localProducts } from "../data";
import { UseGlobalContext } from "../Context";
import { AddReview } from "../AddReview";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = UseGlobalContext();
  const product = localProducts.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        <p>Product not found 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-28 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10"
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <p className="text-yellow-600 font-semibold">
              Category: {product.category}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              ₦{product.price.toLocaleString()}
            </p>

            <motion.button
              onClick={() => addToCart(product.id)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Related Products
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {localProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((related) => (
                <motion.div
                  key={related.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={related.image}
                    alt={related.name}
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-700">
                    {related.name}
                  </h3>
                  <p className="text-yellow-700 font-bold text-sm">
                    ₦{related.price.toLocaleString()}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
        {/* REVIEWS SECTION */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>

          {/* Reviews List */}
          <div className="space-y-4 mb-10">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-100 p-4 rounded-xl shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${s <= rev.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700">{rev.comment}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>

          {/* Add Review Form */}
          <AddReview product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
