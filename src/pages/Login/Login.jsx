import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaGoogle, FaUserShield, FaUserSecret } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const { login, signInWithGoogle, resetPassword, setLoading, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleDemoLogin = (role) => {
    const email = role === "admin" ? "admin@payswift.com" : "user@payswift.com";
    const password = "Password123";

    login(email, password).then(() => {
      Swal.fire({
        title: `${role.toUpperCase()} Demo Active`,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Welcome Back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Login Failed", text: err.message });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-6 pt-24">
      <div className="flex w-full max-w-5xl bg-white dark:bg-[#1E293B] rounded-[2.5rem] shadow-2xl overflow-hidden border dark:border-slate-800">
        {/* Left Side Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0D9488] to-[#10B981] p-12 flex-col justify-center items-center text-white text-center">
          <h2 className="text-4xl font-black mb-4">Secure Portal</h2>
          <p className="opacity-90 mb-8">
            Access your PaySwift dashboard to manage utilities instantly.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-payment-4437166-3714541.png"
            className="w-64 animate-bounce-slow"
            alt=""
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-10 lg:p-14">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-6">
            Login Access
          </h2>

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => handleDemoLogin("user")}
              className="flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-teal-50 dark:hover:bg-teal-900/20 border border-transparent hover:border-teal-500 transition-all"
            >
              <FaUserSecret className="text-teal-600" /> USER DEMO
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-teal-50 dark:hover:bg-teal-900/20 border border-transparent hover:border-teal-500 transition-all"
            >
              <FaUserShield className="text-teal-600" /> ADMIN DEMO
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email & Password Fields */}
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Email"
              required
            />
            <input
              type={show ? "text" : "password"}
              name="password"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0D9488] py-4 rounded-xl text-white font-black shadow-lg shadow-teal-200 dark:shadow-none hover:bg-teal-700 transition-all"
            >
              SIGN IN
            </button>
          </form>

          <button
            onClick={() =>
              signInWithGoogle().then(() => navigate(from, { replace: true }))
            }
            className="w-full mt-4 flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaGoogle className="text-red-500" /> Google Authorize
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
