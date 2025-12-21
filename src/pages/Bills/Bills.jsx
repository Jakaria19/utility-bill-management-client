import React, { useEffect, useState } from "react";
import { Link } from "react-router";
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
    fetch("https://utility-bill-management.vercel.app/bills")
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
        return <FaBolt className="text-yellow-500 text-xl" />;
      case "gas":
        return <FaGasPump className="text-orange-500 text-xl" />;
      case "water":
        return <FaTint className="text-blue-500 text-xl" />;
      case "internet":
        return <FaWifi className="text-sky-500 text-xl" />;
      default:
        return <FaBolt className="text-gray-500 text-xl" />;
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
    <section className="py-16 px-6 lg:px-20 mt-10 min-h-screen bg-gradient-to-br from-[#F9F8FF] via-[#F1EEFF] to-[#E8E4FF] dark:from-[#111827] dark:via-[#1F2937] dark:to-[#111827] transition-colors duration-500">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Explore All Utility Bills
      </h2>

      {/* Category Filter */}
      <div className="max-w-xs mx-auto mb-10">
        <select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-bordered w-full bg-white dark:bg-gray-800 dark:text-gray-100 shadow-md"
        >
          <option value="">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>

      {/* Bills Grid */}
      {bills.length === 0 ? (
        <p className="flex items-center justify-center py-20">
          <span className="loading loading-bars loading-xl"></span>
        </p>
      ) : filteredBills.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          No bills found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col"
            >
              {/*  Image at the Top */}
              {bill.image && (
                <img
                  src={bill.image}
                  alt={bill.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/*  Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(bill.category)}
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                        {bill.category}
                      </span>
                    </div>
                    <span className="text-xs bg-gradient-to-r from-[#4B1CCB] to-[#8748FF] text-white py-1 px-3 rounded-full">
                      ৳{bill.amount}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-[#4B1CCB] transition-colors duration-200">
                    {bill.title}
                  </h3>

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-2 mb-1">
                    <FaMapMarkerAlt className="text-[#4B1CCB]" />
                    {bill.location}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-2">
                    <FaCalendarAlt className="text-[#8748FF]" />
                    {new Date(bill.date).toLocaleDateString("en-GB")}
                  </div>
                </div>

                {/* See Details Button */}
                <Link
                  to={`/bill-details/${bill._id}`}
                  className="mt-6 btn w-full bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] text-white border-none rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  See Details
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
