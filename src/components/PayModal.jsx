// src/components/PayModal.jsx
import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function PayModal({ bill, onClose }) {
  const { user } = useAuth();
  const [username, setUsername] = useState(user.displayName || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      billsId: bill._id,
      username,
      phone,
      address,
      email: user.email,
      amount: bill.amount,
      date: new Date().toISOString(),
    };
    try {
      await api.post("/myBills", payload);
      toast.success("Payment saved successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to save payment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded p-6">
        <h3 className="text-lg font-semibold mb-3">Pay Bill - {bill.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input input-bordered w-full"
            value={user.email}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={bill._id}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            value={bill.amount}
            readOnly
          />
          <input
            className="input input-bordered w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
