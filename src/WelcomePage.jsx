import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    showWelcome && (
      <motion.div
        className="h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500 text-slate-800"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to the</h1>
          <h2 className="text-3xl italic">Official Website of</h2>
          <h1 className="max-sm:text-4xl text-5xl font-extrabold mt-2">The Magnum Hotel</h1>
        </motion.div>
      </motion.div>
    )
  );
};

export default WelcomePage;
