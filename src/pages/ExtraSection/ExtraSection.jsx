import React from "react";
import {
  FaClock,
  FaCreditCard,
  FaBell,
  FaUserPlus,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Save Time",
    desc: "Pay and track your bills from one dashboard anytime, anywhere.",
    icon: <FaClock />,
    color: "from-[#4B1CCB] to-[#8748FF]",
  },
  {
    id: 2,
    title: "Easy Payment",
    desc: "Multiple payment methods with real-time confirmation system.",
    icon: <FaCreditCard />,
    color: "from-[#007bff] to-[#00C6FF]",
  },
  {
    id: 3,
    title: "Smart Reminder",
    desc: "Get notified before your due date so you never miss a bill again!",
    icon: <FaBell />,
    color: "from-[#FF7A00] to-[#FFB347]",
  },
];

const steps = [
  {
    id: 1,
    title: "1. Create Your Account",
    desc: "Sign up in seconds and set up your profile to start managing your bills easily.",
    icon: <FaUserPlus />,
    color: "from-[#4B1CCB] to-[#8748FF]",
  },
  {
    id: 2,
    title: "2. Add Your Bills",
    desc: "Add your electricity, gas, water, and internet bills all in one place with just a few clicks.",
    icon: <FaFileInvoiceDollar />,
    color: "from-[#007bff] to-[#00C6FF]",
  },
  {
    id: 3,
    title: "3. Pay & Relax",
    desc: "Make secure payments instantly and get reminders before every due date.",
    icon: <FaMoneyBillWave />,
    color: "from-[#FF7A00] to-[#FFB347]",
  },
];

const ExtraSection = () => {
  return (
    <div>
      {/* section one */}
      <section className="py-16 px-6 lg:px-20 bg-gradient-to-r from-[#B6ADEF] to-[#CDC6F2] dark:from-[#1E1E2E] dark:to-[#2A2A3C] transition-colors duration-500">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
        >
          Why Choose
          <span className="text-[#4B1CCB] dark:text-[#B6AFFF] ml-2">
            Utility Bills?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-[#1E1E2A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center p-8 flex flex-col items-center"
            >
              <div
                className={`text-5xl bg-gradient-to-r ${item.color} text-white rounded-full p-5 mb-6 shadow-md`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* section two */}
      <section className="py-16 px-6 lg:px-20 bg-gradient-to-r from-[#E3DFFF] to-[#F3F1FF] dark:from-[#232332] dark:to-[#303046] transition-colors duration-500">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12"
        >
          How
          <span className="text-[#4B1CCB] dark:text-[#B6AFFF] ml-2">
            Utility Bills
          </span>{" "}
          Works?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-[#1E1E2A] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center p-8 flex flex-col items-center"
            >
              <div
                className={`text-5xl bg-gradient-to-r ${step.color} text-white rounded-full p-5 mb-6 shadow-md`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSection;
