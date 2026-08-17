import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCompass } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-[#0B0F17] via-[#111726] to-[#0B0F17] text-slate-100 overflow-hidden relative">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-6 sm:space-y-8">
        
        {/* Animated 404 Badge & Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Floating Compass Icon */}
          <motion.div 
            animate={{ rotate: [0, 15, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-amber-400 text-4xl sm:text-6xl mx-auto mb-2 flex justify-center drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            <FaCompass />
          </motion.div>

          <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 select-none">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3 sm:space-y-4 px-2"
        >
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-100 tracking-wide">
            Lost in Luxury?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page or suite you are searching for might have been moved, renamed, or is temporarily out of service.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center pt-2"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaHome className="text-lg" />
            <span>Return to Home</span>
          </Link>
        </motion.div>

        {/* Footer Hint */}
        <p className="text-xs text-slate-500 pt-4">
          Need immediate assistance? Feel free to reach out to our 24/7 front desk support.
        </p>

      </div>
    </div>
  );
};

export default NotFound;

