import React from "react";
import { Link } from "react-router-dom";
import { FaHouseSignal, FaArrowLeftLong } from "react-icons/fa6";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500">
      <NavBar />

      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0D9488]/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none bg-gradient-to-b from-[#0D9488] to-[#10B981] bg-clip-text text-transparent opacity-20 dark:opacity-30 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">
              Lost in <span className="text-[#0D9488]">Space?</span>
            </h2>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 dark:text-slate-400 max-w-md mt-4 font-medium text-sm sm:text-base leading-relaxed"
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-3 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#0D9488] hover:text-white transition-all shadow-xl shadow-slate-200 dark:shadow-none"
          >
            <FaHouseSignal className="text-sm" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-[#0D9488] hover:text-[#0D9488] transition-all"
          >
            <FaArrowLeftLong className="text-sm" />
            Go Back
          </button>
        </motion.div>

        {/* Support Link */}
        <p className="mt-12 text-xs font-bold text-slate-400">
          Need help?{" "}
          <Link to="/help" className="text-[#0D9488] hover:underline">
            Contact PaySwift Support
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
