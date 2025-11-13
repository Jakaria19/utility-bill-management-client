import React, { useEffect, useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import CategoryCards from "../components/CategoryCards";
import BillCard from "../components/BillCard";
import api from "../api/axiosInstance";

export default function Home() {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    document.title = "Home - Utility Bills";
  }, []);
  useEffect(() => {
    api
      .get("/bills?limit=6")
      .then((r) => setRecent(r.data.data || r.data))
      .catch(console.error);
  }, []);
  return (
    <div>
      <HeroCarousel />
      <div className="max-w-6xl mx-auto px-4">
        <CategoryCards
          onSelect={(c) => (window.location.href = `/bills?category=${c}`)}
        />
        <h3 className="text-2xl font-semibold mt-6 mb-4">Recent Bills</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {recent.map((b) => (
            <BillCard key={b._id} bill={b} />
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="/bills" className="btn btn-outline">
            View All Bills
          </a>
        </div>
      </div>
    </div>
  );
}
