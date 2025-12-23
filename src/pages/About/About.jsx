import { motion } from "framer-motion";
// import about from "../../assets/about.png";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen px-6 lg:px-20 py-16 bg-gradient-to-r from-[#EAE6FF] to-[#F9F9FF] dark:from-[#1C1B29] dark:to-[#242238] transition-all duration-500 ">
      {/* Image Section */}
      <motion.div
        className="lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0"
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={about}
          alt="About Us"
          className="rounded-3xl shadow-2xl w-[85%] md:w-[80%] lg:w-[90%] xl:w-[75%] border border-white/30 dark:border-gray-700 object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="lg:w-1/2 text-center lg:text-left space-y-6 lg:pl-12 max-w-1xl mr-15"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white leading-snug">
          About Our Utility Bill System
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          Our platform is designed to make your daily life easier by helping you
          manage and pay all your utility bills —{" "}
          <span className="font-semibold text-[#7A6AE0] dark:text-[#B6AFFF]">
            electricity
          </span>
          ,{" "}
          <span className="font-semibold text-[#7A6AE0] dark:text-[#B6AFFF]">
            gas
          </span>
          ,{" "}
          <span className="font-semibold text-[#7A6AE0] dark:text-[#B6AFFF]">
            water
          </span>
          , and{" "}
          <span className="font-semibold text-[#7A6AE0] dark:text-[#B6AFFF]">
            internet
          </span>{" "}
          — in one secure and fast platform.
        </p>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
          We prioritize{" "}
          <span className="font-semibold text-[#6D5DEB] dark:text-[#A99FFF]">
            simplicity, speed, and security
          </span>{" "}
          — ensuring a seamless experience from start to finish.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-[#0D9488] to-[#10B981] hover:from-[#0F766E] hover:to-[#059669] text-white py-3 px-8 rounded-full font-medium shadow-md transition-all duration-300"
        >
          <Link to="/help">Learn More</Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;