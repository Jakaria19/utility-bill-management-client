// src/pages/MyBills.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

export default function MyBills() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  useEffect(() => {
    document.title = "My Pay Bills";
  }, []);

  useEffect(() => {
    if (!user) return;
    api
      .get(`/myBills?email=${user.email}`)
      .then((r) => {
        const data = r.data.data || r.data;
        setBills(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`${user.displayName || user.email} - Payment Report`, 14, 18);
    const rows = bills.map((b) => [
      b.username,
      b.email,
      `৳${b.amount}`,
      b.address,
      b.phone,
      new Date(b.date).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [["Username", "Email", "Amount", "Address", "Phone", "Date"]],
      body: rows,
      startY: 28,
    });
    doc.save(`report_${user.email}_${Date.now()}.pdf`);
    toast.success("PDF downloaded");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this record?")) return;
    try {
      await api.delete(`/myBills/${id}`);
      setBills((prev) => prev.filter((b) => b._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Pay Bills</h2>
        <div>
          <button onClick={downloadPdf} className="btn btn-outline mr-2">
            Download Report
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((b) => (
              <tr key={b._id}>
                <td>{b.username}</td>
                <td>{b.email}</td>
                <td>৳{b.amount}</td>
                <td>{b.address}</td>
                <td>{b.phone}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm btn-ghost mr-2">Update</button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  No records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p>
          Total Bill Paid: <strong>{bills.length}</strong>
        </p>
        <p>
          Total Amount:{" "}
          <strong>Tk{bills.reduce((s, b) => s + (b.amount || 0), 0)}</strong>
        </p>
      </div>
    </div>
  );
}
