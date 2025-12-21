import React from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Error = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r  dark:from-[#3B3478] dark:via-[#4C4391] dark:to-[#5E54AC] text-center px-4 py-10">
        {/* 404 text */}
        <h1 className="text-[80px] sm:text-[100px] md:text-[130px] lg:text-[150px] font-extrabold text-[#6D5DEB] dark:text-[#B6AFFF] drop-shadow-lg mb-2">
          404
        </h1>
        {/* message */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-boldtext-[#6D5DEB] dark:text-[#B6AFFF] mb-4 leading-tight">
          Oops! Page Not Found
        </h2>
        {/* button */}
        <Link
          to="/"
          className=" bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] hover:opacity-95 text-white    cursor-pointer flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg
          font-semibold shadow-md transition-all duration-300 text-sm
          sm:text-base"
        >

          <FaHome className="text-lg sm:text-xl" />
          Back to Home
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Error;