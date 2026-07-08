import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-10 pb-6 mt-auto text-sm w-full font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 pb-8">
        {/* Brand Column */}
        <div className="space-y-2 text-center md:text-left max-w-sm mx-auto md:mx-0">
          <span className="block text-xl font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
            Magnum Hotel
          </span>
          <p className="text-slate-500 leading-relaxed font-light text-xs">
            Experience refined luxury, curated style, and timeless hospitality. Nestled in prime elegance, offering you an unforgettable retreat.
          </p>
        </div>

        {/* Divider on mobile */}
        <hr className="border-slate-800 md:hidden" />

        {/* Quick Links Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold uppercase tracking-wider text-xs border-l-2 border-amber-500 pl-3">
            Quick Links
          </h4>
          <ul className="font-light grid grid-cols-2 md:flex md:flex-row md:items-center gap-x-6 gap-y-2 md:gap-8 whitespace-nowrap">
            <li>
              <NavLink to="/" className="hover:text-amber-500 underline decoration-amber-500/40 hover:decoration-amber-500 underline-offset-4 transition-all">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/food-order" className="hover:text-amber-500 underline decoration-amber-500/40 hover:decoration-amber-500 underline-offset-4 transition-all">
                Gourmet Dining
              </NavLink>
            </li>
            <li>
              <NavLink to="/wedding-halls" className="hover:text-amber-500 underline decoration-amber-500/40 hover:decoration-amber-500 underline-offset-4 transition-all">
                Wedding Halls
              </NavLink>
            </li>
            <li>
              <NavLink to="/parking" className="hover:text-amber-500 underline decoration-amber-500/40 hover:decoration-amber-500 underline-offset-4 transition-all">
                Secure Parking
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 text-center">
        <p>&copy; {new Date().getFullYear()} Magnum Hotel. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
