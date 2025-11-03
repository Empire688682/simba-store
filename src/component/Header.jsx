import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, PawPrint, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PawPrint className="text-amber-500" size={28} />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Simba<span className="text-amber-500">-Store</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-amber-500"
                    : "text-gray-700 hover:text-amber-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-amber-500"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-amber-500"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-500"
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-500"
          >
            <ShoppingCart size={20} /> Cart
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
