import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEye, FaGoogle } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const { login, signInWithGoogle, resetPassword, setLoading, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const from = location.state?.from?.pathname || "/";

  const loginIllustration =
    "https://cdni.iconscout.com/illustration/premium/thumb/online-payment-4437166-3714541.png";

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

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setLoading(false);
        setUser(result.user);

        navigate(from, { replace: true });

        Swal.fire({
          title: "Google Sign in Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-6">
      <div className="flex w-full max-w-5xl bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-white/20">
        <div className="hidden md:flex w-1/2 bg-[#0D9488] relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>

          <div className="relative text-center z-10">
            <img
              src={loginIllustration}
              alt="PaySwift Login"
              className="w-full max-w-sm mx-auto animate-pulse-slow drop-shadow-2xl"
            />
            <h2 className="text-4xl font-extrabold text-white mt-8 tracking-tight">
              PaySwift <span className="text-emerald-200">Portal</span>
            </h2>
            <p className="text-emerald-50/80 mt-4 text-sm font-medium leading-relaxed px-6">
              Experience the future of utility management. Quick, secure, and
              smart billing solutions.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-3">
                Welcome Back
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Log in to stay connected and manage your bills.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="group">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-[#10B981]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="john@example.com"
                  className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium"
                  required
                />
              </div>

              <div className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-[#10B981]">
                  Security Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full mt-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#10B981] focus:bg-white dark:focus:bg-slate-800 outline-none transition-all duration-300 text-sm font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#10B981] p-1 transition-colors"
                  >
                    {show ? <FaEye size={20} /> : <IoEyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => resetPassword(emailRef.current.value)}
                  className="text-xs font-bold text-[#10B981] hover:text-[#0D9488] transition-colors uppercase tracking-wider"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#10B981] hover:bg-[#0D9488] text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:shadow-none transition-all duration-300 transform active:scale-[0.98]"
              >
                Sign Into Account
              </button>
            </form>

            <div className="relative my-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <span className="relative bg-white dark:bg-[#1E293B] px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Fast Login
              </span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-[#10B981] py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-200 transition-all duration-300 group"
            >
              <FaGoogle className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Authorize with Google</span>
            </button>

            <p className="text-center mt-10 text-sm font-medium text-slate-500">
              Not a member?{" "}
              <Link
                to="/register"
                className="text-[#10B981] font-black hover:underline underline-offset-4 ml-1"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
