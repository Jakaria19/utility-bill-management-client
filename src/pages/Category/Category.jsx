import React from "react";
import {
  FaBolt,
  FaFire,
  FaTint,
  FaWifi,
  // FaTv,
  // FaMobileAlt,
  // FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Electricity",
    desc: "Pay your electricity bills securely and instantly.",
    icon: <FaBolt />,
    color: "from-[#4B1CCB] to-[#8748FF]",
  },
  {
    id: 2,
    name: "Gas",
    desc: "Manage and pay your gas bills easily.",
    icon: <FaFire />,
    color: "from-[#FF7A00] to-[#FFB347]",
  },
  {
    id: 3,
    name: "Water",
    desc: "Track and pay your water bills with convenience.",
    icon: <FaTint />,
    color: "from-[#007bff] to-[#00C6FF]",
  },
  {
    id: 4,
    name: "Internet",
    desc: "Pay broadband and Wi-Fi bills without hassle.",
    icon: <FaWifi />,
    color: "from-[#28A745] to-[#85E085]",
  },
  // {
  //   id: 5,
  //   name: "Cable TV",
  //   desc: "Renew your cable or satellite subscriptions easily.",
  //   icon: <FaTv />,
  //   color: "from-[#FF4B2B] to-[#FF416C]",
  // },
  // {
  //   id: 6,
  //   name: "Mobile Recharge",
  //   desc: "Recharge any mobile number instantly.",
  //   icon: <FaMobileAlt />,
  //   color: "from-[#2DCE89] to-[#2DCECC]",
  // },
  // {
  //   id: 7,
  //   name: "Other Bills",
  //   desc: "Manage all other types of utility bills.",
  //   icon: <FaMoneyBillWave />,
  //   color: "from-[#8E2DE2] to-[#4A00E0]",
  // },
];

const Category = () => {
  return (
    <section className="py-16 px-6 lg:px-20 bg-gradient-to-r from-[#E3DFFF] to-[#F3F1FF] dark:from-[#1E1E2E] dark:to-[#2A2A3C] transition-colors duration-500">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
      >
        Choose a
        <span className="text-[#4B1CCB] dark:text-[#B6AFFF] ml-2">
          Category
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-[#1E1E2A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center"
          >
            <div
              className={`text-5xl bg-gradient-to-r ${cat.color} text-white rounded-full p-5 mb-5 shadow-md`}
            >
              {cat.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {cat.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{cat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;
