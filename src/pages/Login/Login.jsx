import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const { login, signInWithGoogle, resetPassword, setLoading, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const from = location.state?.from?.pathname || "/";

  const formImg = "https://via.placeholder.com/400";
  const googleIcon =
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        setLoading(false);
        Swal.fire({
          title: "Sign In Successful!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setLoading(false);
        setUser(result.user);
        navigate(from);
        Swal.fire({
          title: "Google Sign in Successful!",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your email first!",
      });
      return;
    }
    resetPassword(email)
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Check your Email to reset password!",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 transition-colors duration-500 bg-gradient-to-r from-[#E9E4FF] to-[#F8F8FF] dark:from-[#1F1F2E] dark:to-[#2C2C3A]">
      {/* Left side image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src={formImg}
          alt="illustration"
          className="max-w-[80%] h-auto object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 justify-center items-center bg-gradient-to-r from-[#8F7FF0] via-[#9E8FF5] to-[#C2BAFF] dark:from-[#3B3478] dark:via-[#4C4391] dark:to-[#5E54AC] p-6 md:rounded-l-4xl">
        <div className="bg-white/90 dark:bg-[#1E1E2A]/90 backdrop-blur-lg rounded-2xl shadow-lg w-full max-w-md p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
            Hello!
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Sign In to Continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                ref={emailRef}
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100"
                required
              />
            </div>

            <div className="relative">
              <input
                required
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-[15px] top-[16px] cursor-pointer text-gray-600 dark:text-gray-300"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:opacity-95 text-white py-3 rounded-full transition duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="divider text-gray-400 dark:text-gray-500">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline border-[#8C7BF0] text-[#6D5DEB] hover:text-white hover:bg-[#8C7BF0] w-full"
          >
            <img src={googleIcon} alt="" className="w-5 h-5 mr-2" />
            Sign In with Google
          </button>

          <div className="text-right mt-2">
            <button
              onClick={handleForgetPassword}
              className="text-sm text-[#6D5DEB] dark:text-[#B6AFFF] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#6D5DEB] font-semibold hover:underline"
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
