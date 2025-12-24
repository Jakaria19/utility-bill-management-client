import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
// import formImg from "../../assets/img.png";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLink,
  FaLock,
  FaGoogle,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Register = () => {
  const [show, setShow] = useState(false);
  const { register, updateUserProfile, signInWithGoogle, setLoading, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const email = e.target.email?.value;
    const photoURL = e.target?.photoURL.value;
    const password = e.target?.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Security!",
        text: "Password requires 6+ characters with upper & lower case.",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    register(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(displayName, photoURL)
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            Swal.fire({
              title: "Welcome to PaySwift!",
              text: "Your account has been created successfully.",
              icon: "success",
              confirmButtonColor: "#0D9488",
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Sync Failed",
              text: err.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        Swal.fire({
          title: "Access Granted!",
          text: "Signed in successfully with Google.",
          icon: "success",
          confirmButtonColor: "#0D9488",
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Failed", text: error.message });
      });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500">
      {/* Left Side: Visual/Marketing */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#0D9488] to-[#10B981] p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          {/* <img
            src={formImg}
            alt="Registration Illustration"
            className="max-w-md h-auto drop-shadow-2xl mb-10 floating-animation"
          /> */}
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">
            Smart Utility Management
          </h1>
          <p className="text-emerald-50 max-w-sm mx-auto font-medium opacity-90">
            Join thousands of users managing their digital economy with
            PaySwift's secure ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-6 md:p-16 relative">
        {/* Background Decor */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full"></div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-800/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white dark:border-slate-700/50"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              Create <span className="text-[#0D9488]">Account</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
              Get started for free
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Input */}
            <div className="relative group">
              <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="relative group">
              <FaLink className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors" />
              <input
                type="text"
                name="photoURL"
                placeholder="Avatar URL"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-6 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0D9488] transition-colors" />
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-4 pl-14 pr-14 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#0D9488]/50 transition-all outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D9488] transition-colors"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0D9488] to-[#10B981] hover:shadow-lg hover:shadow-emerald-500/30 text-white font-black py-4 rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              Register Now
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-[#1E293B] text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 hover:border-[#0D9488] text-slate-700 dark:text-slate-200 font-bold py-4 rounded-2xl transition-all"
          >
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </button>

          <p className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#0D9488] hover:text-[#10B981] font-black underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
