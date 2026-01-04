import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaChartPie as FaLayout,
  FaClockRotateLeft as FaHistory,
  FaCirclePlus as FaPlusCircle,
  FaCircleUser as FaUserCircle,
  FaHouse as FaHome,
  FaRightFromBracket as FaSignOutAlt,
  FaBars,
  FaXmark as FaTimes,
} from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => navigate("/"));
  };

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: <FaLayout /> },
    { name: "My History", path: "/dashboard/my-history", icon: <FaHistory /> },
    {
      name: "Create New Bill",
      path: "/dashboard/add-bill",
      icon: <FaPlusCircle />,
    },
    { name: "My Profile", path: "/dashboard/profile", icon: <FaUserCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0F172A] transition-colors duration-500">
      {/* --- Sidebar for Desktop --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Dashboard Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#0D9488] to-[#10B981] rounded-lg flex items-center justify-center">
              <span className="text-white font-black">P</span>
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-800 dark:text-white uppercase">
              Pay<span className="text-[#0D9488]">Swift</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">
              Main Menu
            </p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#0D9488] text-white shadow-lg shadow-teal-500/20"
                      : "text-slate-500 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-[#0D9488]"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-4 px-4 py-3.5 text-slate-500 dark:text-slate-400 font-bold hover:text-[#0D9488] transition-all"
            >
              <FaHome className="text-lg" /> Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
            >
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        {/* Top Header for Mobile & Tablet */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:hidden px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-[#0D9488] bg-teal-50 dark:bg-teal-900/20 rounded-xl"
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <span className="font-black text-slate-800 dark:text-white">
            DASHBOARD
          </span>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#0D9488]">
            <img src={user?.photoURL} alt="profile" />
          </div>
        </header>

        {/* Dynamic Content Rendering */}
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
