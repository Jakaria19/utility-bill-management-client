import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
// import google from "../../assets/icon-google.png";
// import formImg from "../../assets/img.png";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";

const Register = () => {
  const [show, setShow] = useState(false);
  const { register, updateUserProfile, signInWithGoogle, setLoading, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const email = e.target.email?.value;
    const photoURL = e.target?.photoURL.value;
    const password = e.target?.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password!",
        text: "Password must have at least 6 characters including uppercase & lowercase letters.",
      });
      return;
    }

    // Create user
    register(email, password)
      .then((result) => {
        const user = result.user;
        // Update user profile
        updateUserProfile(displayName, photoURL)
          .then(() => {
            setUser({ ...user, displayName, photoURL });
            Swal.fire({
              title: "Registration Successful!",
              icon: "success",
              draggable: true,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed!",
              text: err.message,
            });
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

  // Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        Swal.fire({
          title: "Google Sign-In Successful!",
          icon: "success",
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed!",
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
            Welcome!
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Sign Up to Get Started
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C7BF0] bg-white dark:bg-[#2B2B3D] dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                required
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
              className="w-full bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] hover:opacity-95 text-white py-3 rounded-full transition duration-200 cursor-pointer"
            >
              Register
            </button>
          </form>

          <div className="divider text-gray-400 dark:text-gray-500">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline border-[#8C7BF0] text-[#6D5DEB] hover:text-white hover:bg-gradient-to-r hover:from-[#7A6AE0] hover:to-[#9E8FF5] w-full"
          >
            <img src={google} alt="" className="w-5 h-5 mr-2" />
            Sign Up with Google
          </button>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6D5DEB] dark:text-[#B6AFFF] hover:underline font-semibold"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
