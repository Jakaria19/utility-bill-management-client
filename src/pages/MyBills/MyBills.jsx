import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaFilePdf,
  FaArrowDown,
  FaPenToSquare,
  FaTrashCan,
  FaDownload,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const MyBills = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch payments
  useEffect(() => {
    if (!user?.email) return;
    fetch(
      `https://utility-bill-management.vercel.app/payments?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPayments(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, [user]);

  // Download Single Bill (Themed PDF)
  const handleDownload = (bill) => {
    const doc = new jsPDF();
    doc.setFillColor(13, 148, 136);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("PaySwift Receipt", 14, 25);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${bill._id}`, 14, 55);
    doc.text(
      `Billing Date: ${new Date(bill.date).toLocaleDateString()}`,
      14,
      65
    );

    autoTable(doc, {
      startY: 75,
      head: [["Description", "Details"]],
      body: [
        ["Customer Name", bill.username || "N/A"],
        ["Email Address", bill.email || user.email],
        ["Phone", bill.phone || "N/A"],
        ["Service Address", bill.address || "Not provided"],
        ["Total Amount", `${bill.amount} BDT`],
        ["Status", "SUCCESSFULLY PAID"],
      ],
      theme: "striped",
      headStyles: { fillColor: [13, 148, 136] },
    });

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "This is a computer-generated receipt. No signature required.",
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save(`Receipt-${bill._id}.pdf`);
  };

  // Download All (Themed PDF)
  const handleDownloadAll = () => {
    if (payments.length === 0) return;
    const doc = new jsPDF();
    doc.text("PaySwift - Billing History Report", 14, 15);

    const rows = payments.map((b, i) => [
      i + 1,
      b.username || "N/A",
      b.amount,
      new Date(b.date).toLocaleDateString(),
      b.address || "N/A",
    ]);

    autoTable(doc, {
      head: [["#", "User", "Amount", "Date", "Address"]],
      body: rows,
      startY: 25,
      headStyles: { fillColor: [13, 148, 136] },
    });
    doc.save("Billing_History_PaySwift.pdf");
  };

  // Delete bill
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction record will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D9488",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://utility-bill-management.vercel.app/payments/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setPayments((prev) => prev.filter((bill) => bill._id !== id));
              Swal.fire("Deleted!", "Record removed.", "success");
            }
          });
      }
    });
  };

  const handleUpdate = async (bill) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Information",
      html: `
        <div class="flex flex-col gap-3 p-2">
          <input id="swal-phone" class="swal2-input !m-0 w-full" placeholder="Phone" value="${
            bill.phone || ""
          }">
          <input id="swal-address" class="swal2-input !m-0 w-full" placeholder="Address" value="${
            bill.address || ""
          }">
        </div>
      `,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#0D9488",
      showCancelButton: true,
      preConfirm: () => ({
        phone: document.getElementById("swal-phone").value,
        address: document.getElementById("swal-address").value,
      }),
    });

    if (formValues) {
      fetch(`https://utility-bill-management.vercel.app/payments/${bill._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            setPayments((prev) =>
              prev.map((p) =>
                p._id === bill._id ? { ...p, ...formValues } : p
              )
            );
            Swal.fire("Success", "Updated successfully", "success");
          }
        });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-[#0F172A]">
        <span className="loading loading-ring loading-lg text-[#0D9488]"></span>
        <p className="mt-4 font-black text-slate-400 animate-pulse tracking-widest uppercase text-xs">
          Synchronizing Records
        </p>
      </div>
    );

  const totalAmount = payments.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] py-24 px-6 lg:px-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              Transaction{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent">
                History
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
              Manage and track all your utility settlements.
            </p>
          </motion.div>

          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-[#0D9488] transition-all shadow-xl shadow-slate-200 dark:shadow-none"
          >
            <FaFilePdf className="text-lg" /> Export Full Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Total Payments
            </p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white">
              {payments.length}
            </h3>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Total Expenditure
            </p>
            <h3 className="text-3xl font-black text-[#0D9488]">
              {totalAmount}{" "}
              <span className="text-sm font-bold opacity-60">BDT</span>
            </h3>
          </div>
          <div className="bg-[#0D9488] p-6 rounded-3xl shadow-lg shadow-teal-500/20 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
              Account Status
            </p>
            <h3 className="text-3xl font-black italic">Verified</h3>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    #
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Recipient
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Contact/Email
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Amount
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Settled On
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {payments.map((bill, i) => (
                  <tr
                    key={bill._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors group"
                  >
                    <td className="p-6 font-bold text-slate-400">{i + 1}</td>
                    <td className="p-6">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {bill.username}
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-[150px]">
                        {bill.address || "No Address"}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                        {bill.phone}
                      </div>
                      <div className="text-xs text-slate-400">{bill.email}</div>
                    </td>
                    <td className="p-6">
                      <span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-black">
                        ৳{bill.amount}
                      </span>
                    </td>
                    <td className="p-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                      {new Date(bill.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleDownload(bill)}
                          className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#0D9488] hover:text-white transition-all shadow-sm"
                          title="Download Receipt"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleUpdate(bill)}
                          className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="Edit Record"
                        >
                          <FaPenToSquare />
                        </button>
                        <button
                          onClick={() => handleDelete(bill._id)}
                          className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Delete Record"
                        >
                          <FaTrashCan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBills;
