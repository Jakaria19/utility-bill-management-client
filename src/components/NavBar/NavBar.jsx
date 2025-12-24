import React, { useContext, useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { ImBoxAdd } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaUser, FaCircleChevronDown } from "react-icons/fa6";
import MyLink from "../MyLink/MyLink";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100)
        setShowNavbar(false);
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

  const navLinks = (
    <>
      <li>
        <MyLink to="/">
          <GoHomeFill className="text-lg" /> Home
        </MyLink>
      </li>
      <li>
        <MyLink to="/bills">
          <ImBoxAdd className="text-lg" /> All Bills
        </MyLink>
      </li>
      {user && (
        <>
          <li>
            <MyLink to="/my-bills">
              <ImBoxAdd className="text-lg" /> My History
            </MyLink>
          </li>
          <li>
            <MyLink to="/add-bill">
              <ImBoxAdd className="text-lg" /> Create Bill
            </MyLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 lg:px-10 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        lastScrollY > 20
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-[#0D9488]"
          >
            <FaBars className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-slate-800 rounded-[1.5rem] z-[1] mt-3 w-64 p-4 shadow-2xl border border-slate-100 dark:border-slate-700 gap-2"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#0D9488] to-[#10B981] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-white hidden sm:block ml-1">
            Pay
            <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent">
              Swift
            </span>
          </span>
        </Link>
      </div>

      {/* Center Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest text-[11px]">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme Switcher */}
        <label className="swap swap-rotate w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#10B981]/10 transition-colors">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            checked={theme === "dark"}
          />
          <FaSun className="swap-off text-yellow-500 text-lg" />
          <FaMoon className="swap-on text-emerald-400 text-lg" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 p-1 pr-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-transparent hover:border-[#10B981]/30"
            >
              <div className="w-9 h-9 border-2 border-[#10B981] rounded-xl overflow-hidden shadow-sm">
                <img
                  alt="User"
                  referrerPolicy="no-referrer"
                  src={
                    user?.photoURL ||
                    "https://ui-avatars.com/api/?name=" + user?.displayName
                  }
                />
              </div>
              <FaCircleChevronDown className="text-slate-400 text-xs" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white dark:bg-slate-900 rounded-[2rem] z-50 mt-4 w-72 p-5 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <div className="px-4 py-4 mb-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl text-center">
                <p className="text-sm font-black text-slate-800 dark:text-white truncate">
                  {user?.displayName}
                </p>
                <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-tight">
                  {user?.email}
                </p>
              </div>

              <li className="mb-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 py-3 font-bold text-slate-600 dark:text-slate-300 hover:text-[#0D9488]"
                >
                  <FaUser className="text-[#10B981]" /> Account Profile
                </Link>
              </li>

              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2"></div>

              <li>
                <button
                  onClick={handleSignOut}
                  className="w-full mt-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-100 dark:shadow-none transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  <IoLogOut className="text-lg" /> Sign Out Portal
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="group relative flex items-center gap-2 bg-[#0D9488] hover:bg-[#10B981] text-white px-6 py-3 rounded-xl font-black transition-all duration-300 shadow-lg shadow-teal-100 dark:shadow-none active:scale-95 uppercase tracking-widest text-xs"
          >
            <IoLogIn className="text-lg" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
