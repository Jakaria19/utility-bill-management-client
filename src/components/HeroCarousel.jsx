import React from "react";

const slides = [
  {
    title: "Online Quick Recharge. Save Time and Money!",
    subtitle: "Pay your monthly utility bills easily.",
  },
  {
    title: "Secure Payment with Firebase Auth",
    subtitle: "Only current month bills can be paid.",
  },
  {
    title: "Generate PDF Reports",
    subtitle: "Download your paid bill history as PDF.",
  },
];

export default function HeroCarousel() {
  return (
    <div className="carousel w-full rounded-lg overflow-hidden shadow-md">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className="carousel-item w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">{s.title}</h2>
            <p className="mt-3">{s.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
