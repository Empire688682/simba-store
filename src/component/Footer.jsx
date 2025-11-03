import React from "react";
import { Link } from "react-router-dom";
import { PawPrint, Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PawPrint className="text-amber-500" size={28} />
            <h2 className="text-2xl font-bold text-white">
              Simba<span className="text-amber-500">-Store</span>
            </h2>
          </div>
          <p className="text-sm leading-6">
            Simba-Store is your trusted online shop for premium dog products —
            from food and toys to grooming kits. We care for your pets like
            family 🐶❤️
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-500">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-500">Shop</Link></li>
            <li><Link to="/about" className="hover:text-amber-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-amber-500">FAQs</Link></li>
            <li><Link to="/shipping" className="hover:text-amber-500">Shipping Info</Link></li>
            <li><Link to="/returns" className="hover:text-amber-500">Returns & Refunds</Link></li>
            <li><Link to="/privacy" className="hover:text-amber-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Stay Connected</h3>
          <p className="text-sm mb-4">
            Subscribe for exclusive offers and pet care tips!
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-r-md font-semibold text-sm hover:bg-amber-600 transition"
            >
              Join
            </button>
          </form>
          <div className="flex gap-4 mt-5 text-gray-400">
            <a href="#" className="hover:text-amber-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-amber-500"><Instagram size={20} /></a>
            <a href="#" className="hover:text-amber-500"><Twitter size={20} /></a>
            <a href="mailto:support@simbastore.com" className="hover:text-amber-500"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Simba-Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
