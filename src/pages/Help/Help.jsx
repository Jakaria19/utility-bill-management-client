import { motion } from "framer-motion";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I pay my utility bills?",
      answer:
        "Simply log in, select your desired service (electricity, gas, water, or internet), and proceed with secure online payment directly through our system.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes! We use industry-standard encryption to ensure all your transactions and personal data remain safe and private.",
    },
    {
      question: "Can I track my past bills?",
      answer:
        "Absolutely. You can view your payment history anytime from your profile dashboard, with detailed info on each bill.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us anytime through our contact form or support email. We're here to help 24/7.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-[#F6F4FF] via-[#EEE9FF] to-[#E4DEFF] dark:from-[#12121A] dark:via-[#1E1E2A] dark:to-[#2C2C3A] transition-all duration-500">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <FaQuestionCircle className="text-[#7A6AE0] dark:text-[#B6AFFF] text-5xl mx-auto mb-4" />
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
          Help & Support
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Find answers to common questions and learn how to get the most out of
          our Utility Bill Management System.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-[#1E1E2A] shadow-md dark:shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <button
              className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-gray-800 dark:text-gray-200 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <motion.span
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#7A6AE0] text-xl"
              >
                ▼
              </motion.span>
            </button>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="px-5 pb-4 text-gray-600 dark:text-gray-400"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Still need help?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Reach out to our support team anytime.
        </p>
        <a
          href="mailto:support@utilitybills.com"
          className="inline-block bg-gradient-to-r from-[#0D9488] to-[#10B981] hover:from-[#0F766E] hover:to-[#059669] text-white py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Contact Support
        </a>
      </motion.div>
    </div>
  );
};

export default Help;