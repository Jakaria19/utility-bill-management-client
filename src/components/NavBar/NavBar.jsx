import React, { useContext, useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { ImBoxAdd } from "react-icons/im";
import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaDownload, FaGear, FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import MyLink from "../MyLink/MyLink";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSignOut = () => {
    logout()
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign out error:", error));
  };

  return (
    <div
      className={`navbar bg-base-100 shadow-sm px-5 fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <ul className="">
                <li>
                  <MyLink to="/">
                    <GoHomeFill />
                    Home
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/bills">
                    <ImBoxAdd />
                    Bills
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/my-bills">
                    <ImBoxAdd />
                    My Bills
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/add-bill">
                    <ImBoxAdd />
                    Add Bill
                  </MyLink>
                </li>
              </ul>
            ) : (
              <ul className="">
                <li>
                  <MyLink to="/">
                    <GoHomeFill />
                    Home
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/bills">
                    <ImBoxAdd />
                    Bills
                  </MyLink>
                </li>
              </ul>
            )}
          </ul>
        </div>
        {/* logo */}
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          Utility
          <span className="bg-linear-to-r from-[#7A6AE0] to-[#9E8FF5] bg-clip-text text-transparent">
            Bills
          </span>
        </Link>
      </div>

      {/* center */}
      <div className="navbar-center hidden lg:flex">
        <div>
          <ul>
            {user ? (
              <ul className="menu menu-horizontal px-1 gap-10">
                <li>
                  <MyLink to="/">
                    <GoHomeFill />
                    Home
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/bills">
                    <ImBoxAdd />
                    Bills
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/my-bills">
                    <ImBoxAdd />
                    My Bills
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/add-bill">
                    <ImBoxAdd />
                    Add Bill
                  </MyLink>
                </li>
              </ul>
            ) : (
              <ul className="menu menu-horizontal px-1 gap-10">
                <li>
                  <MyLink to="/">
                    <GoHomeFill />
                    Home
                  </MyLink>
                </li>
                <li>
                  <MyLink to="/bills">
                    <ImBoxAdd />
                    Bills
                  </MyLink>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </div>

      {/* end */}
      <div className="navbar-end gap-5">
        <div className="flex items-center gap-2">
          <label className="swap swap-rotate cursor-pointer">
            {/* theme */}
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "dark"}
              className="hidden"
            />

            {/* light mode */}
            <FaSun
              className={`swap-off text-yellow-400 text-2xl transition-transform duration-500 ${
                theme === "light" ? "rotate-0 scale-100" : "rotate-180 scale-0"
              }`}
            />

            {/*dark mode */}
            <FaMoon
              className={`swap-on text-gray-300 text-2xl transition-transform duration-500 ${
                theme === "dark" ? "rotate-0 scale-100" : "rotate-180 scale-0"
              }`}
            />
          </label>
        </div>

        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200 text-center">
                <li className="text-sm font-bold">{user?.displayName}</li>
                <li className="text-xs">{user?.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/profile"}>
                  <FaUser /> Profile
                </Link>
              </li>
              {/* <li className="">
                <Link to={""}>
                  <FaDownload />
                  Download
                </Link>
              </li>
              <li className="mb-3">
                <a>
                  <FaGear /> Settings
                </a>
              </li> */}
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn text-white hover:opacity-95 bg-gradient-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0]"
                >
                  <IoLogOut />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex">
            {/* <Link
              to="/register"
              className="btn btn-outline border-[#9F62F2] text-[#632EE3] hover:bg-linear-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:text-white "
            >
              <FaUserPlus /> Register
            </Link> */}

            <Link
              to="/login"
              className="btn bg-linear-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] border-none text-white hover:opacity-90 ml-3"
            >
              <IoLogIn /> Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   return (
//     <header className="bg-white shadow sticky top-0 z-10 border-b border-gray-100">
//       <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <div className="text-2xl font-extrabold">Quick Bill</div>
//         </Link>
//         <nav className="flex items-center gap-4 text-sm font-medium">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
//                 : "hover:text-indigo-600 transition"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/bills"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
//                 : "hover:text-indigo-600 transition"
//             }
//           >
//             Bills
//           </NavLink>
//           {user && (
//             <NavLink
//               to="/my-bills"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
//                   : "hover:text-indigo-600 transition"
//               }
//             >
//               My Pay Bills
//             </NavLink>
//           )}
//           {!user ? (
//             <>
//               <NavLink
//                 to="/login"
//                 className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-150 ml-2"
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
//               >
//                 Register
//               </NavLink>
//             </>
//           ) : (
//             <>
//               <div className="flex items-center gap-3 ml-2">
//                 <img
//                   src={
//                     user.photoURL ||
//                     `https://ui-avatars.com/api/?name=${
//                       user.displayName || user.email
//                     }`
//                   }
//                   alt="avatar"
//                   className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
//                 />
//                 <button
//                   onClick={logout}
//                   className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }
