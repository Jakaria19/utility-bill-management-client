import { motion } from "framer-motion";
// import about from "../../assets/about.png";
import { Link } from "react-router-dom";
import {
  FaCircleCheck,
  FaBoltLightning,
  FaShieldHalved,
} from "react-icons/fa6";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-20 py-24 bg-slate-50 dark:bg-[#0F172A] transition-all duration-500 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#0D9488]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Image Section */}
      <motion.div
        className="lg:w-1/2 flex justify-center lg:justify-start mb-16 lg:mb-0 relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative group">
          {/* Accent Border Box */}
          <div className="absolute -inset-4 border-2 border-[#0D9488]/20 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>

          {/* <img
            src={about}
            alt="About PaySwift"
            className="relative z-10 rounded-[2.5rem] shadow-2xl w-full max-w-lg object-cover border border-white dark:border-slate-700"
          /> */}

          {/* Small Floating Info Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#0D9488] p-3 rounded-2xl text-white">
                <FaShieldHalved />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-tighter text-slate-400">
                  Security
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  Bank-Grade Protection
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="lg:w-1/2 space-y-8 lg:pl-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-4">
          <span className="bg-[#0D9488]/10 text-[#0D9488] px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-[#0D9488]/20">
            About Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 dark:text-white leading-[1.1]">
            Empowering Your <br />
            <span className="bg-gradient-to-r from-[#0D9488] to-[#10B981] bg-clip-text text-transparent">
              Digital Economy
            </span>
          </h2>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
          PaySwift is more than just a payment portal. We are a secure ecosystem
          designed to streamline your life by unifying your utilities—
          <span className="text-slate-800 dark:text-white font-bold underline decoration-[#10B981] decoration-2 underline-offset-4">
            {" "}
            Electricity
          </span>
          ,
          <span className="text-slate-800 dark:text-white font-bold underline decoration-[#10B981] decoration-2 underline-offset-4">
            {" "}
            Gas
          </span>
          , and
          <span className="text-slate-800 dark:text-white font-bold underline decoration-[#10B981] decoration-2 underline-offset-4">
            {" "}
            Internet
          </span>{" "}
          — into one seamless dashboard.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <FaBoltLightning />, text: "Instant Processing" },
            { icon: <FaCircleCheck />, text: "Verified Security" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold"
            >
              <span className="text-[#0D9488] text-xl">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white py-5 px-10 rounded-2xl font-black shadow-xl shadow-teal-500/20 uppercase tracking-widest text-xs transition-all"
          >
            <Link to="/help">Explore Features</Link>
          </motion.button>

          <Link
            to="/register"
            className="text-slate-500 dark:text-slate-400 font-bold hover:text-[#0D9488] transition-colors flex items-center gap-2"
          >
            Get Started <span className="text-lg">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
