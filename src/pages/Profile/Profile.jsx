import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaUser, FaImage, FaEnvelope, FaCamera } from "react-icons/fa6";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(name, photo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your identity has been synchronized successfully.",
          confirmButtonColor: "#0D9488",
          customClass: {
            popup: "rounded-[2rem]",
            confirmButton: "rounded-xl px-6 py-3 font-bold",
          },
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message,
          confirmButtonColor: "#EF4444",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-[#0F172A] px-6 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0D9488]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white dark:border-slate-700/50 w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-10">
          <div className="relative inline-block group">
            <div className="w-32 h-32 mx-auto rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <img
                src={
                  user?.photoURL ||
                  "https://ui-avatars.com/api/?name=" + user?.displayName
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#0D9488] p-2.5 rounded-2xl text-white shadow-lg border-4 border-white dark:border-slate-800 group-hover:rotate-12 transition-all">
              <FaCamera className="text-sm" />
            </div>
          </div>

          <h2 className="text-3xl font-black mt-6 text-slate-800 dark:text-white tracking-tight">
            Account{" "}
            <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent">
              Profile
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-900/50 w-fit mx-auto px-4 py-2 rounded-full">
            <FaEnvelope className="text-[#10B981]" />
            {user?.email}
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
              Full Identity
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors">
                <FaUser />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none shadow-inner"
                required
              />
            </div>
          </div>

          {/* Photo URL Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">
              Avatar URL
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors">
                <FaImage />
              </span>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Image Link"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0D9488] to-[#10B981] hover:from-[#0F766E] hover:to-[#059669] text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-500/20 hover:shadow-emerald-500/40 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Update Identity
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
