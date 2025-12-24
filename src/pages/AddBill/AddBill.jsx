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
          text: "Your new bill has been saved.",
          showConfirmButton: false,
          timer: 2000,
        })
      )
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please check your connection.",
        })
      );
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#E8E4FF] via-[#F4F2FF] to-[#FCFBFF] dark:from-[#111827] dark:via-[#1F2937] dark:to-[#111827] transition-colors duration-500 p-6 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-3xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent mb-8">
          Add a New Bill
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Bill Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter bill title"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Category
            </label>
            <select
              name="category"
              required
              className="select select-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Select Category</option>
              <option value="Electricity">Electricity</option>
              <option value="Gas">Gas</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Amount (৳)
            </label>
            <input
              type="number"
              name="amount"
              required
              placeholder="Enter amount"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="Enter location"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="Paste image link"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Bill Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="input input-bordered w-full dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Write a short description..."
              className="textarea textarea-bordered w-full h-28 dark:bg-gray-700 dark:text-gray-100"
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="btn bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] text-white px-10 text-lg rounded-xl shadow-md hover:scale-105 transition-transform"
            >
              Add Bill
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBill;
