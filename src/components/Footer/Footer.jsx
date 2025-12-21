import React from "react";
import { Link } from "react-router";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <Link to="/" className="font-bold text-xl flex items-center gap-2">
              Utility
              <span className="bg-linear-to-r from-[#7A6AE0] to-[#9E8FF5] bg-clip-text text-transparent">
                Bills
              </span>
            </Link>
          </h2>
          <p className="text-sm leading-relaxed">
            Manage your utility bills easily, track your payments, and never
            miss a due date again.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#7A6AE0] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/bills" className="hover:text-[#7A6AE0]transition">
                Bills
              </Link>
            </li>
            <li>
              <Link to="/my-bills" className="hover:text-[#7A6AE0] transition">
                My Bills
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-[#7A6AE0] transition">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#7A6AE0] transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-[#7A6AE0] transition">
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Contact & Social
          </h3>
          <p className="text-sm mb-2">Email: support@utilitybill.com</p>
          <p className="text-sm mb-3">Phone: +880 1234 567 890</p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#7A6AE0] transition">
              <FaFacebookSquare />
            </a>
            <a href="#" className="hover:text-[#7A6AE0] transition">
              <FaSquareXTwitter />
            </a>
            <a href="#" className="hover:text-[#7A6AE0] transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 py-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">UtilityBill</span>. All
          Rights Reserved. Made with by
          <span className="text-[#7A6AE0] font-medium ml-1 cursor-pointer">
            <a target="_blank" href="https://github.com/ziaullhaque">
              Ziaull Haque
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;