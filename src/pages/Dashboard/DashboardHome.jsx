import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaWallet,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const DashboardHome = () => {
  const barData = [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3000 },
    { name: "Mar", amount: 5500 },
    { name: "Apr", amount: 4500 },
    { name: "May", amount: 6000 },
  ];

  const pieData = [
    { name: "Electricity", value: 45 },
    { name: "Water", value: 25 },
    { name: "Internet", value: 30 },
  ];

  const COLORS = ["#0D9488", "#10B981", "#F59E0B"];

  const stats = [
    {
      id: 1,
      label: "Total Balance",
      value: "$12,450",
      icon: <FaWallet />,
      color: "bg-teal-500",
    },
    {
      id: 2,
      label: "Pending Bills",
      value: "03",
      icon: <FaClock />,
      color: "bg-amber-500",
    },
    {
      id: 3,
      label: "Total Paid",
      value: "$8,200",
      icon: <FaCheckCircle />,
      color: "bg-emerald-500",
    },
    {
      id: 4,
      label: "Invoices",
      value: "12",
      icon: <FaFileInvoiceDollar />,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Monitor your monthly usage and payment analytics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 group hover:border-[#0D9488] transition-all"
          >
            <div
              className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Monthly Spending */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
            Spending Analysis
          </h3>

          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#0D9488"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
            Bill Categories (%)
          </h3>

          <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Table Section */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          Recent Bill Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-widest border-none">
                <th className="bg-transparent">Service</th>
                <th className="bg-transparent">Date</th>
                <th className="bg-transparent">Amount</th>
                <th className="bg-transparent">Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300 font-medium">
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <td className="py-4 px-4 rounded-l-2xl">Electricity Bill</td>
                <td>Dec 28, 2025</td>
                <td className="font-bold text-[#0D9488]">$120.00</td>
                <td className="rounded-r-2xl">
                  <span className="badge border-none bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold px-4 py-3">
                    Paid
                  </span>
                </td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <td className="py-4 px-4 rounded-l-2xl">Water Supply</td>
                <td>Jan 02, 2026</td>
                <td className="font-bold text-[#0D9488]">$45.50</td>
                <td className="rounded-r-2xl">
                  <span className="badge border-none bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 font-bold px-4 py-3">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
