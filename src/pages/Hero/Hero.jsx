import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Failed to load slides:", err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <span className="loading loading-spinner loading-lg text-[#10B981]"></span>
        <p className="mt-4 text-slate-400 font-bold animate-pulse">
          Initializing Portal...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] mt-20 bg-slate-100 dark:bg-[#1E293B] shadow-2xl border border-white/20">
      {/* Background Glow Decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#0D9488]/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#10B981]/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div
        className="flex transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="w-full min-h-[500px] lg:h-[600px] flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-8 lg:px-20 py-16">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left space-y-8 z-10 lg:w-1/2"
              >
                <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white leading-tight">
                  {slide.title?.split(" ").map((word, i, arr) =>
                    i === arr.length - 1 ? (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent"
                      >
                        {" "}
                        {word}
                      </span>
                    ) : (
                      word + " "
                    )
                  )}
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {slide.description ||
                    "Secure and fast utility bill management at your fingertips."}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <button className="bg-[#0D9488] hover:bg-[#10B981] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-teal-200 dark:shadow-none transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                    {slide.buttonText || "Get Started"}
                  </button>
                  <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-10 py-4 rounded-2xl font-black transition-all duration-300 hover:border-[#10B981] uppercase tracking-widest text-xs">
                    Learn More
                  </button>
                </div>
              </motion.div>

              {/* Illustration Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 flex justify-center z-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0D9488] to-[#10B981] rounded-full blur-3xl opacity-20 animate-pulse"></div>

                  {slide.logo || slide.img ? (
                    <img
                      src={slide.logo || slide.img}
                      alt="Hero Illustration"
                      className="relative z-10 max-h-[350px] lg:max-h-[450px] drop-shadow-[0_35px_35px_rgba(13,148,136,0.25)] transition-transform duration-700 hover:rotate-3"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-slate-200 dark:bg-slate-700 rounded-3xl flex items-center justify-center animate-pulse">
                      <span className="text-slate-400 font-bold">
                        Image Pending...
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute hidden md:flex justify-between top-1/2 left-8 right-8 -translate-y-1/2 z-20">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 dark:text-white hover:bg-[#0D9488] hover:text-white transition-all duration-300"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 dark:text-white hover:bg-[#0D9488] hover:text-white transition-all duration-300"
        >
          ❯
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? "w-10 h-3 bg-[#0D9488]"
                : "w-3 h-3 bg-slate-300 dark:bg-slate-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
