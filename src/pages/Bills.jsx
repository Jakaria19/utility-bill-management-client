// src/pages/Bills.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance";
import BillCard from "../components/BillCard";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Bills - Utility Bills";
  }, []);

  useEffect(() => {
    const qCategory = searchParams.get("category");
    setCategory(qCategory || "");
    fetchBills(qCategory || "");
  }, [searchParams]);

  function fetchBills(cat) {
    const q = cat ? `/bills?category=${cat}` : "/bills";
    api
      .get(q)
      .then((res) => setBills(res.data.data || res.data))
      .catch(console.error);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Bills</h2>
        <select
          className="select select-bordered w-48"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            fetchBills(e.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {bills.length ? (
          bills.map((b) => <BillCard key={b._id} bill={b} />)
        ) : (
          <div className="text-gray-500">No bills found</div>
        )}
      </div>
    </div>
  );
}
