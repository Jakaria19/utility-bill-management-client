import React from "react";
import {
  FaShieldHalved,
  FaBoltLightning,
  FaChartLine,
  FaUserCheck,
  FaWallet,
  FaCircleCheck,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Secure Gateway",
    desc: "Your financial security is our priority. Every transaction is encrypted with bank-grade protocols.",
    icon: <FaShieldHalved />,
    color: "from-[#0D9488] to-[#10B981]",
  },
  {
    id: 2,
    title: "Instant Settle",
    desc: "No more waiting in lines. Settle your utility bills instantly with real-time confirmation.",
    icon: <FaBoltLightning />,
    color: "from-[#059669] to-[#34D399]",
  },
  {
    id: 3,
    title: "Insightful Tracking",
    desc: "Analyze your monthly consumption patterns with our smart visual dashboard and reports.",
    icon: <FaChartLine />,
    color: "from-[#0D9488] to-[#2DD4BF]",
  },
];

const steps = [
  {
    id: 1,
    title: "Secure Onboarding",
    desc: "Create your verified account in seconds and set up your personalized payment profile.",
    icon: <FaUserCheck />,
    color: "from-[#10B981] to-[#34D399]",
  },
  {
    id: 2,
    title: "Connect Utilities",
    desc: "Link your electricity, gas, or internet accounts once and manage them all from one hub.",
    icon: <FaWallet />,
    color: "from-[#0D9488] to-[#10B981]",
  },
  {
    id: 3,
    title: "One-Tap Payment",
    desc: "Review your dues and clear them with a single click. Receive instant digital receipts.",
    icon: <FaCircleCheck />,
    color: "from-[#059669] to-[#0D9488]",
  },
];

const ExtraSection = () => {
  return (
    <div className="space-y-0">
      {/* Section One: Why Choose PaySwift */}
      <section className="py-24 px-6 lg:px-20 bg-white dark:bg-[#0F172A] transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
            >
              Why Trust
              <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent ml-3">
                PaySwift?
              </span>
            </motion.h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
              We provide a robust ecosystem for managing your digital economy
              with speed and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 group"
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center text-4xl bg-gradient-to-br ${item.color} text-white rounded-2xl mb-8 shadow-lg shadow-teal-200 dark:shadow-none group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Two: The Payment Journey */}
      <section className="py-24 px-6 lg:px-20 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
            >
              The Payment
              <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent ml-3">
                Journey
              </span>
            </motion.h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">
              Experience the future of billing in three simple, automated steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden lg:block absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent -z-10"></div>

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-slate-50 dark:border-slate-900 mb-8 transition-all duration-500 group-hover:border-[#10B981]">
                  <div
                    className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}
                  >
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold mb-4 text-slate-800 dark:text-white uppercase tracking-tighter">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSection;
