import React from "react";

const categories = [
  { key: "Electricity", label: "Electricity" },
  { key: "Gas", label: "Gas" },
  { key: "Water", label: "Water" },
  { key: "Internet", label: "Internet" },
];

export default function CategoryCards({ onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className="card card-compact bg-white p-4 shadow hover:shadow-lg"
        >
          <div className="text-center font-semibold">{c.label}</div>
        </button>
      ))}
    </div>
  );
}
