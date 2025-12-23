import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="text-2xl font-black text-white flex items-center gap-1 mb-4"
            >
              <span className="text-[#10B981]">Pay</span>Swift
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The smartest way to handle your monthly utility expenses. Fast,
              secure, and transparent.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all duration-300"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#10B981] hover:text-white transition-all duration-300"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#10B981] transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/bills" className="hover:text-[#10B981] transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bills"
                  className="hover:text-[#10B981] transition"
                >
                  Payment History
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#10B981] transition">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-5">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/help" className="hover:text-[#10B981] transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#10B981] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#10B981] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#10B981] transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider text-xs mb-5">
              Get Updates
            </h3>
            <p className="text-xs mb-4">
              Subscribe for billing alerts and tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-800 border-none rounded-l-md px-3 py-2 text-sm w-full focus:ring-1 focus:ring-[#10B981] outline-none"
              />
              <button className="bg-[#10B981] text-white px-3 py-2 rounded-r-md hover:bg-[#0D9488] transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} PaySwift Inc. Made for Better
            Management.
          </p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> System
              Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
