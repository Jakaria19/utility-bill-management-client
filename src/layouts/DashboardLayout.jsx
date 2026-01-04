import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaHistory,
  FaPlusCircle,
  FaUserCircle,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartPie,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const [role, roleLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (roleLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#0D9488]"></span>
      </div>
    );

  const handleLogout = () => {
    logout().then(() => navigate("/"));
  };

  const menuItems =
    role === "admin"
      ? [
          { name: "Admin Stats", path: "/dashboard", icon: <FaChartPie /> },
          {
            name: "Manage All Bills",
            path: "/dashboard/all-bills",
            icon: <FaHistory />,
          },
          {
            name: "Manage Users",
            path: "/dashboard/manage-users",
            icon: <FaUsers />,
          },
          {
            name: "System Settings",
            path: "/dashboard/profile",
            icon: <FaUserCircle />,
          },
        ]
      : [
          { name: "User Overview", path: "/dashboard", icon: <FaThLarge /> },
          {
            name: "Payment History",
            path: "/dashboard/my-history",
            icon: <FaHistory />,
          },
          {
            name: "Create New Bill",
            path: "/dashboard/add-bill",
            icon: <FaPlusCircle />,
          },
          {
            name: "Account Profile",
            path: "/dashboard/profile",
            icon: <FaUserCircle />,
          },
        ];

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0F172A]">
      <div className="lg:hidden fixed top-4 right-4 z-[60]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-[#0D9488] text-white rounded-xl shadow-lg"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Area */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <Link
            to="/"
            className="flex items-center gap-2 mb-10 px-2 font-black text-xl"
          >
            <span className="text-[#0D9488]">Pay</span>
            <span className="dark:text-white">Swift</span>
            <span className="badge badge-sm badge-outline text-[8px] uppercase">
              {role || "user"}
            </span>
          </Link>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                    isActive
                      ? "bg-[#0D9488] text-white shadow-md shadow-teal-500/20"
                      : "text-slate-500 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span> {item.name}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-4 px-4 py-3.5 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 p-6 lg:p-10 transition-all duration-300">
        <Outlet />
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
