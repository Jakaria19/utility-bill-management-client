import React, { useEffect, useState } from "react";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/carousel.json")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Failed to load slides:", err));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <p className="flex items-center justify-center py-20">
        <span className="loading loading-bars loading-xl"></span>
      </p>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg mt-16 bg-linear-to-r from-[#8F7FF0] via-[#9E8FF5] to-[#C2BAFF]">
      <div
        className="flex transition-transform duration-3000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide.type === "hero" ? (
              <div className="w-full h-[550px] flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-6 py-20">
                <div className="text-center lg:text-left space-y-6">
                  <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-100 max-w-xl mx-auto lg:mx-0">
                    {slide.description}
                  </p>
                  <button className="btn bg-linear-to-r from-[#7A6AE0] to-[#9E8FF5] hover:from-[#6957DB] hover:to-[#8C7BF0] text-white px-8 py-3 rounded-lg font-semibold shadow-md">
                    {slide.buttonText}
                  </button>
                </div>
                <img
                  src={slide.logo}
                  alt={slide.title || "Hero Image"}
                  className="p-4 max-h-[400px]"
                />
              </div>
            ) : (
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[550px] object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* navigation buttons */}
      <div className="absolute flex justify-between top-1/2 left-5 right-5 -translate-y-1/2">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="btn btn-circle bg-linear-to-r from-[#7A6AE0] to-[#9E8FF5] border-none text-white"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="btn btn-circle bg-linear-to-l from-[#7A6AE0] to-[#9E8FF5] border-none text-white"
        >
          ❯
        </button>
      </div>

      {/* dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-white scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;