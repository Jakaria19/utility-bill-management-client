import React from "react";
import { NavLink } from "react-router-dom";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative py-1 transition-all duration-300 font-bold tracking-tight text-sm uppercase ${
          isActive
            ? "text-[#0D9488] dark:text-[#10B981] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#0D9488] after:to-[#10B981]"
            : `text-slate-500 hover:text-[#0D9488] dark:text-slate-400 dark:hover:text-[#10B981] ${className}`
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
