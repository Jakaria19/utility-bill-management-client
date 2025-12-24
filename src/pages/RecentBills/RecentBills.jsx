import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBolt,
  FaGasPump,
  FaTint,
  FaWifi,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const RecentBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("https://utility-bill-management-server-chi.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data.slice(-6).reverse());
      })
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  const getCategoryIcon = (category) => {
    const iconClass = "text-lg";
    switch (category?.toLowerCase()) {
      case "electricity":
        return <FaBolt className={`${iconClass} text-yellow-500`} />;
      case "gas":
        return <FaGasPump className={`${iconClass} text-orange-500`} />;
      case "water":
        return <FaTint className={`${iconClass} text-blue-500`} />;
      case "internet":
        return <FaWifi className={`${iconClass} text-emerald-500`} />;
      default:
        return <FaBolt className={`${iconClass} text-[#0D9488]`} />;
    }
  };

  return (
    <section className="py-24 px-6 lg:px-20 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">
              Recent{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent">
                Invoices
              </span>
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium">
              Keep track of the latest utility listings and payment updates.
            </p>
          </div>
          <Link
            to="/bills"
            className="group flex items-center gap-2 text-[#0D9488] font-bold uppercase tracking-widest text-xs hover:text-[#10B981] transition-colors"
          >
            View All Bills{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {bills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#10B981]"></span>
            <p className="mt-4 text-slate-400 font-bold animate-pulse uppercase tracking-tighter">
              Syncing Recent Data...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {bills.map((bill, index) => (
              <motion.div
                key={bill._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(13,148,136,0.12)] border border-white dark:border-slate-700/50 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-2xl">
                        {getCategoryIcon(bill.category)}
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-[0.2em]">
                          {bill.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#0D9488] dark:text-[#10B981]">
                          ৳{bill.amount}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold mb-4 text-slate-800 dark:text-white group-hover:text-[#0D9488] transition-colors duration-300 line-clamp-1">
                      {bill.title}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                        <FaMapMarkerAlt className="text-[#0D9488] text-sm" />
                        <span className="truncate">{bill.location}</span>
                      </div>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                        <FaCalendarAlt className="text-[#10B981] text-sm" />
                        <span>
                          {new Date(bill.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/bill-details/${bill._id}`}
                    className="mt-8 w-full bg-[#0D9488] hover:bg-[#10B981] text-white text-center font-black py-4 rounded-[1.2rem] shadow-lg shadow-teal-100 dark:shadow-none transition-all duration-300 transform active:scale-95 uppercase tracking-[0.15em] text-[10px]"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentBills;
