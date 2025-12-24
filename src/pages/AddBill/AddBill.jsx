import React, { useContext } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";

const AddBill = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      amount: e.target.amount.value,
      location: e.target.location.value,
      image: e.target.image.value,
      date: e.target.date.value,
      description: e.target.description.value,
      created_at: new Date(),
      email: user?.email || "unknown@gmail.com",
    };

    fetch("https://utility-bill-management-server-chi.vercel.app/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Bill Added Successfully!",
          text: "Your new bill has been saved to the portal.",
          showConfirmButton: false,
          timer: 2000,
          iconColor: "#10B981",
        })
      )
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Submission Error",
          text: "Please check your database connection.",
          confirmButtonColor: "#0D9488",
        })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-6 mt-10 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-12 w-full max-w-4xl border border-white/20"
      >
        {/* Title: Using the same Teal to Emerald gradient */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent tracking-tight">
            Register New Bill
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
            Fill in the details below to add a utility bill to the PaySwift
            system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Bill Title */}
          <div className="md:col-span-2 group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981] transition-colors">
              Bill Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. June Electricity Bill"
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white appearance-none"
            >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="Electricity">Electricity</option>
              <option value="Gas">Gas</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
            </select>
          </div>

          {/* Amount */}
          <div className="group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Amount (৳)
            </label>
            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white"
            />
          </div>

          {/* Location */}
          <div className="group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white"
            />
          </div>

          {/* Bill Date */}
          <div className="group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Bill Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2 group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="Paste image link here"
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white"
            />
          </div>

          {/* Email (Read Only) */}
          <div className="md:col-span-2 group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-200 dark:bg-slate-900/50 border-none outline-none text-sm font-medium text-slate-500 cursor-not-allowed italic"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 group">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-[#10B981]">
              Bill Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Write a short summary..."
              className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium dark:text-white h-32 resize-none"
            ></textarea>
          </div>

          {/* Submit Button: Matches the Login Page Style */}
          <div className="md:col-span-2 text-center pt-4">
            <button
              type="submit"
              className="w-full md:w-64 bg-[#10B981] hover:bg-[#0D9488] text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-none transition-all duration-300 transform active:scale-[0.98] uppercase tracking-widest text-xs"
            >
              Add Bill To Portal
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBill;
