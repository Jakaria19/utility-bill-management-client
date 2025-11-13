// src/pages/BillDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import PayModal from "../components/PayModal";

export default function BillDetails() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [showPay, setShowPay] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = bill ? bill.title : "Bill details";
  }, [bill]);

  useEffect(() => {
    api
      .get(`/bills/${id}`)
      .then((r) => setBill(r.data.data || r.data))
      .catch(() => navigate("/404"));
  }, [id]);

  if (!bill) return <div className="p-6">Loading...</div>;

  const billMonth = new Date(bill.date).getMonth();
  const currentMonth = new Date().getMonth();
  const canPay = billMonth === currentMonth;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={bill.image || "https://via.placeholder.com/900x300"}
          alt={bill.title}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{bill.title}</h2>
        <p className="text-sm text-gray-500">
          {bill.category} • {bill.location}
        </p>
        <p className="mt-4">{bill.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">৳{bill.amount}</span>
          </div>
          <div>
            <button
              disabled={!canPay}
              onClick={() => {
                if (!user) {
                  navigate("/login");
                  return;
                }
                setShowPay(true);
              }}
              className={"btn " + (canPay ? "btn-primary" : "btn-disabled")}
            >
              Pay Bill
            </button>
          </div>
        </div>
      </div>

      {showPay && <PayModal bill={bill} onClose={() => setShowPay(false)} />}
    </div>
  );
}
