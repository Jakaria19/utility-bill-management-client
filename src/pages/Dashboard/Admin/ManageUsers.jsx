import React, { useState, useEffect } from "react";
import { FaUserShield, FaUserEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://utility-bill-management-server-chi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const makeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.name} an Admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      confirmButtonText: "Yes, Update Role",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", `${user.name} is now an admin.`, "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
        System User Management
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-b border-slate-50 dark:border-slate-700/50">
                <th className="py-5 px-8">User Info</th>
                <th>Current Role</th>
                <th className="text-right px-8">Promote / Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-slate-50 dark:border-slate-700/50 last:border-none"
                >
                  <td className="py-5 px-8 font-bold text-slate-700 dark:text-slate-200">
                    {user.email}
                  </td>
                  <td>
                    <div
                      className={`badge font-bold uppercase text-[9px] ${
                        user.role === "admin"
                          ? "badge-primary bg-[#0D9488]"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role || "user"}
                    </div>
                  </td>
                  <td className="text-right px-8">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(user)}
                        className="btn btn-sm bg-[#0D9488] hover:bg-teal-700 text-white border-none rounded-lg font-bold flex items-center gap-2 ml-auto"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
