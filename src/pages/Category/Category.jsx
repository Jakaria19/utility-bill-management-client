import React from "react";
import { FaBolt, FaFire, FaTint, FaWifi } from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Energy Systems",
    desc: "Seamlessly settle your residential or commercial power dues with zero delays.",
    icon: <FaBolt />,
    color: "from-[#0D9488] to-[#10B981]",
  },
  {
    id: 2,
    name: "Gas Services",
    desc: "Smart management for your natural gas and kitchen fuel bill payments.",
    icon: <FaFire />,
    color: "from-[#059669] to-[#34D399]",
  },
  {
    id: 3,
    name: "Water Supply",
    desc: "Track consumption and clear hydraulic utility bills through our secure gateway.",
    icon: <FaTint />,
    color: "from-[#0D9488] to-[#2DD4BF]",
  },
  {
    id: 4,
    name: "Digital Connectivity",
    desc: "Keep your high-speed internet and broadband active with instant renewals.",
    icon: <FaWifi />,
    color: "from-[#10B981] to-[#6EE7B7]",
  },
];

const Category = () => {
  return (
    <section className="py-24 px-6 lg:px-20 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight"
          >
            Explore Service
            <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent ml-3">
              Categories
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Select a category to view specific billing details and manage your
            utility payments with ease.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group relative bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white dark:border-slate-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(13,148,136,0.15)] transition-all duration-500"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${cat.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-200 dark:shadow-none transition-transform duration-500 group-hover:rotate-12`}
              >
                {cat.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-3 group-hover:text-[#0D9488] transition-colors">
                {cat.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                {cat.desc}
              </p>

              {/* Subtle Arrow Indicator */}
              <div className="mt-6 flex items-center text-[#10B981] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
