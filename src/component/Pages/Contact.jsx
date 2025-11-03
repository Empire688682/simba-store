import React from "react";
import { Mail, Phone, MapPin, PawPrint } from "lucide-react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-amber-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Info Section */}
        <div className="bg-amber-500 text-white flex flex-col justify-center p-8">
          <div className="flex items-center gap-2 mb-4">
            <PawPrint size={30} />
            <h2 className="text-3xl font-bold">Simba-Store</h2>
          </div>
          <p className="text-sm mb-8">
            Got a question, feedback, or need help with your order?  
            Our friendly support team is here to help you and your furry friends 🐶✨
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={18} /> support@simbastore.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} /> +234 800 123 4567
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} /> 12 Paw Lane, Ikeja, Lagos, Nigeria
            </li>
          </ul>
        </div>

        {/* Right Contact Form */}
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. johndoe@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
