import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const { login, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        fetch(
          `https://utility-bill-management-server-chi.vercel.app/users/role/${email}`
        )
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              title: "Access Granted!",
              text: `Logged in as ${data.role}`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        Swal.fire({ icon: "error", title: "Login Failed", text: err.message });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-6 pt-24 transition-colors duration-500">
      <div className="flex w-full max-w-5xl bg-white dark:bg-[#1E293B] rounded-[2.5rem] shadow-2xl overflow-hidden border dark:border-slate-800 animate-in fade-in zoom-in duration-500">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#0D9488] to-[#10B981] p-12 flex-col justify-center items-center text-white text-center">
          <h2 className="text-4xl font-black mb-4">PaySwift Portal</h2>
          <p className="opacity-90 mb-8 font-medium">
            The most secure way to manage and pay your utility bills.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-10 lg:p-14">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
            Secure Login
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
            Enter your credentials to access the dashboard.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 dark:text-white transition-all"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-teal-500 outline-none text-slate-700 dark:text-white transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500"
                >
                  {show ? <IoEyeOff size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D9488] py-4 rounded-xl text-white font-black shadow-lg shadow-teal-200 dark:shadow-none hover:bg-teal-700 active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
            >
              Authorize Account
            </button>
          </form>

          <button
            onClick={() =>
              signInWithGoogle().then(() => navigate(from, { replace: true }))
            }
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 py-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <FaGoogle className="text-red-500" /> Google Account
          </button>

          <p className="text-center mt-8 text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
