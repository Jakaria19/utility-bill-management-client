import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageAllBills = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://utility-bill-management-server-chi.vercel.app//all-bills")
      .then((res) => res.json())
      .then((data) => setBills(data));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBills(bills.filter((bill) => bill._id !== id));
        Swal.fire("Deleted!", "Bill has been removed.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
          Manage All System Bills
        </h2>

        <div className="flex items-center bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-700 w-full md:w-96 shadow-sm">
          <FaSearch className="text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search by User or Bill Title..."
            className="bg-transparent border-none outline-none w-full text-sm font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-none">
                <th className="py-5 px-8">Client</th>
                <th>Service Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-right px-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {bills
                .filter((b) =>
                  b.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((bill) => (
                  <tr
                    key={bill._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-[#0D9488] rounded-xl flex items-center justify-center font-bold">
                          {bill.userName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">
                            {bill.userName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {bill.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-slate-600 dark:text-slate-300">
                      {bill.title}
                    </td>
                    <td className="font-black text-[#0D9488]">
                      ${bill.amount}
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm border-none font-bold ${
                          bill.status === "Paid"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="text-right px-8">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-600 rounded-lg transition-all">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(bill._id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAllBills;
