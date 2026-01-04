import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBolt,
  FaGasPump,
  FaTint,
  FaWifi,
  FaSearch,
  FaSortAmountDown,
} from "react-icons/fa";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://utility-bill-management-server-chi.vercel.app/bills")
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        setFilteredBills(data);
      })
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  // Combined Search, Filter, and Sort Logic
  useEffect(() => {
    let result = [...bills];

    // 1. Search Filter (Title or Location)
    if (searchTerm) {
      result = result.filter(
        (bill) =>
          bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bill.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Category Filter
    if (selectedCategory) {
      result = result.filter(
        (bill) => bill.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Sorting Logic
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.amount - a.amount);
    }

    setFilteredBills(result);
  }, [searchTerm, selectedCategory, sortOrder, bills]);

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

  return (
    <section className="py-24 px-6 lg:px-20 min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent tracking-tight mb-4">
          Utility Billing Directory
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Browse, search, and manage all available utility bills with ease.
        </p>
      </div>

      {/* Advanced Controls Bar (Search, Filter, Sort) */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Input */}
        <div className="relative group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors" />
          <input
            type="text"
            placeholder="Search by title or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-[#10B981] shadow-xl dark:shadow-none outline-none transition-all text-sm font-bold dark:text-white"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-[#10B981] shadow-xl dark:shadow-none outline-none appearance-none cursor-pointer text-sm font-bold text-slate-700 dark:text-slate-200"
          >
            <option value="">All Categories</option>
            <option value="Electricity">Electricity</option>
            <option value="Gas">Gas</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-[#10B981] shadow-xl dark:shadow-none outline-none appearance-none cursor-pointer text-sm font-bold text-slate-700 dark:text-slate-200"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <FaSortAmountDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
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
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-lg font-bold">
            No matches found for your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSortOrder("");
            }}
            className="mt-4 text-sm font-black text-[#10B981] uppercase tracking-widest hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(13,148,136,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/20 flex flex-col group"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={bill.image || "https://via.placeholder.com/400x250"}
                  alt={bill.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#0D9488] text-white font-black py-2 px-4 rounded-2xl text-sm shadow-lg">
                    ৳{bill.amount}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    {getCategoryIcon(bill.category)}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {bill.category}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4 group-hover:text-[#0D9488] transition-colors line-clamp-1 italic">
                  {bill.title}
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                    <FaMapMarkerAlt className="text-[#0D9488]" />
                    <span>{bill.location}</span>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-bold gap-3">
                    <FaCalendarAlt className="text-[#10B981]" />
                    <span>
                      {new Date(bill.date).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/bill-details/${bill._id}`}
                  className="mt-auto w-full bg-[#0D9488] hover:bg-[#10B981] text-white text-center font-bold py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-xs"
                >
                  Pay Now
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
