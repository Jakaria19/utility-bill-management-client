import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBolt,
  FaGasPump,
  FaTint,
  FaWifi,
} from "react-icons/fa";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("https://utility-bill-management-server-chi.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        setFilteredBills(data);
      })
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "electricity":
        return <FaBolt className="text-yellow-500 text-lg" />;
      case "gas":
        return <FaGasPump className="text-orange-500 text-lg" />;
      case "water":
        return <FaTint className="text-blue-500 text-lg" />;
      case "internet":
        return <FaWifi className="text-sky-500 text-lg" />;
      default:
        return <FaBolt className="text-emerald-500 text-lg" />;
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") setFilteredBills(bills);
    else {
      const filtered = bills.filter(
        (bill) => bill.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBills(filtered);
    }
  };

  return (
    <section className="py-16 px-6 lg:px-20 min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500 mt-10">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent tracking-tight mb-4">
          Utility Billing Directory
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Browse and manage all available utility bills. Use the filter to find
          specific services in your area.
        </p>
      </div>

      {/* Category Filter - Styled like Login inputs */}
      <div className="max-w-xs mx-auto mb-16 relative">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block text-center">
          Filter by Category
        </label>
        <select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-[#10B981] shadow-lg dark:shadow-none outline-none transition-all duration-300 text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none cursor-pointer text-center"
        >
          <option value="">All Utility Types</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>

      {/* Bills Grid */}
      {bills.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-[#10B981]"></span>
          <p className="mt-4 text-slate-400 font-medium animate-pulse">
            Syncing with server...
          </p>
        </div>
      ) : filteredBills.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-lg font-bold">
            No bills found for "
            <span className="text-[#0D9488]">{selectedCategory}</span>"
          </p>
          <button
            onClick={() => {
              setSelectedCategory("");
              setFilteredBills(bills);
            }}
            className="mt-4 text-sm font-black text-[#10B981] uppercase tracking-widest hover:underline"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(13,148,136,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/20 flex flex-col group"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden h-52">
                {bill.image ? (
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <FaBolt className="text-4xl text-slate-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#0D9488] dark:text-[#10B981] font-black py-2 px-4 rounded-2xl text-sm shadow-sm">
                    ৳{bill.amount}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {getCategoryIcon(bill.category)}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    {bill.category}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4 group-hover:text-[#0D9488] transition-colors line-clamp-1">
                  {bill.title}
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                    <FaMapMarkerAlt className="text-[#0D9488]" />
                    <span className="tracking-wide">{bill.location}</span>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                    <FaCalendarAlt className="text-[#10B981]" />
                    <span>
                      {new Date(bill.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Details Button */}
                <Link
                  to={`/bill-details/${bill._id}`}
                  className="mt-auto w-full bg-[#0D9488] hover:bg-[#10B981] text-white text-center font-bold py-4 rounded-[1.2rem] shadow-lg shadow-teal-100 dark:shadow-none transition-all duration-300 transform active:scale-[0.95] uppercase tracking-[0.1em] text-xs"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Bills;
