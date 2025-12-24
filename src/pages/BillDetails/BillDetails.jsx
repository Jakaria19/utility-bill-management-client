import { useParams } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";

import { FaLocationDot, FaPhoneFlip, FaUserAstronaut } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(false);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://utility-bill-management-server-chi.vercel.app/bills/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data?.result) {
          setBill(data.result);
          checkCurrentMonth(data.result.date);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching bill details:", err);
        setError(true);
      });
  }, [id]);

  const checkCurrentMonth = (billDate) => {
    const d = new Date(billDate);
    const now = new Date();
    setIsCurrentMonth(
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value.trim();

    if (phone.length !== 11) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone!",
        text: "Please enter a valid 11-digit number.",
        confirmButtonColor: "#0D9488",
      });
      return;
    }

    const paymentInfo = {
      email: user.email,
      title: bill.title,
      billId: bill._id,
      amount: bill.amount,
      username: form.username.value,
      address: form.address.value,
      date: new Date().toISOString(),
      info: form.info.value,
      phone: phone,
    };

    fetch("https://utility-bill-management.vercel.app/payments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Payment Successful!",
          text: `৳${bill.amount} settled for ${bill.title}`,
          icon: "success",
          confirmButtonColor: "#0D9488",
        });
        setIsModalOpen(false);
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Payment sync failed.",
        })
      );
  };

  if (!bill && !error)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <span className="loading loading-ring loading-lg text-[#0D9488]"></span>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Loading Bill Assets
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-40 space-y-4">
        <div className="text-6xl text-slate-200">☹️</div>
        <h2 className="text-xl font-bold text-slate-500">
          Bill record not found.
        </h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] py-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 bg-white dark:bg-slate-800/50 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-white dark:border-slate-700/50 p-6 md:p-10"
        >
          {/* Visual Side */}
          <div className="relative">
            <img
              src={bill.image || "https://i.ibb.co/q7LsWQx/default-bill.jpg"}
              alt={bill.title}
              className="w-full h-full min-h-[400px] object-cover rounded-3xl shadow-inner"
            />
            <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-5 py-2 rounded-2xl shadow-lg border border-white/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0D9488]">
                Official Statement
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex flex-col justify-between py-4">
            <div className="space-y-6">
              <div>
                <span className="bg-[#0D9488]/10 text-[#0D9488] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                  {bill.category}
                </span>
                <h1 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                  {bill.title}
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-center gap-3">
                  <FaLocationDot className="text-[#0D9488]" />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {bill.location}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl flex items-center gap-3">
                  <FaCalendarAlt className="text-[#0D9488]" />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                    {new Date(bill.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
                  <FaInfoCircle /> Details
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {bill.description}
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#0D9488] to-[#10B981] p-8 rounded-[2rem] text-white flex justify-between items-center shadow-xl shadow-emerald-500/20">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
                    Total Payable
                  </p>
                  <h3 className="text-4xl font-black italic">৳{bill.amount}</h3>
                </div>
                <FaMoneyBillWave className="text-5xl opacity-20 rotate-12" />
              </div>
            </div>

            <div className="pt-10">
              {isCurrentMonth ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0D9488] hover:text-white transition-all shadow-xl"
                >
                  Proceed to Settlement
                </button>
              ) : (
                <div className="bg-red-50 dark:bg-red-500/10 p-5 rounded-2xl border border-red-100 dark:border-red-500/20 text-center">
                  <p className="text-red-500 font-bold text-sm">
                    Action Restricted: Only current month bills are payable.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pay Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="bg-gradient-to-r from-[#0D9488] to-[#10B981] p-10 text-white">
                <h3 className="text-3xl font-black tracking-tight">
                  Safe Checkout
                </h3>
                <p className="text-emerald-50 font-medium opacity-80 mt-1">
                  Completing payment for {bill.title}
                </p>
              </div>

              <form onSubmit={handlePaySubmit} className="p-10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <FaUserAstronaut className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D9488]" />
                    <input
                      name="username"
                      defaultValue={user.displayName}
                      required
                      placeholder="Your Name"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 py-4 pl-12 pr-4 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-[#0D9488]/50"
                    />
                  </div>
                  <div className="relative group">
                    <FaPhoneFlip className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D9488]" />
                    <input
                      name="phone"
                      required
                      placeholder="Phone Number"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 py-4 pl-12 pr-4 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-[#0D9488]/50"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0D9488]" />
                  <input
                    name="address"
                    required
                    placeholder="Service Address"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 py-4 pl-12 pr-4 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-[#0D9488]/50"
                  />
                </div>

                <textarea
                  name="info"
                  rows="2"
                  placeholder="Notes (e.g. Reference No.)"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-sm font-bold border-none focus:ring-2 focus:ring-[#0D9488]/50"
                ></textarea>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#0D9488] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
                  >
                    Confirm Transaction
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    Back
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BillDetails;
