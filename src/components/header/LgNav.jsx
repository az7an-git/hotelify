import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { adminNavs, bookingNavs, userNavs } from "./navs";
import { ADMIN_UID } from "../../firebase/Firebase";

function LgNav({ isOpen, currentUser, logo, handleLogout, isScrolled }) {
  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`hidden lg:flex ${isOpen ? "block" : "hidden"} items-center justify-between w-full`}
    >
      {/* LEFT — Logo */}
      <NavLink to="/" className="flex items-center gap-3.5 py-1 group flex-shrink-0">
        <img className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(212,164,76,0.3)]" src={logo} alt="Magnum Hotel Logo" />
        <span className="text-base font-bold tracking-[0.18em] uppercase text-gold-300 font-sans group-hover:text-gold-200 transition-colors duration-300">
          Magnum Hotel
        </span>
      </NavLink>

      {/* CENTER — Nav links in dark glass pill */}
      <div
        className="flex items-center gap-1 rounded-full transition-all duration-300"
        style={{
          padding: '6px 8px',
          background: isScrolled ? 'rgba(17,24,39,0.6)' : 'rgba(17,24,39,0.75)',
          border: isScrolled ? '1px solid rgba(217,169,79,0.18)' : '1px solid rgba(217,169,79,0.08)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.15)',
          backdropFilter: 'blur(16px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.5)',
        }}
      >
        {/* Services Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-slate-300 hover:text-gold-300 font-medium transition-all duration-200 text-sm py-2 px-5 rounded-full hover:bg-white/5">
            <span>Services</span>
            <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-50 group-hover:opacity-100" />
          </button>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50"
            style={{
              background: 'rgba(17,24,39,0.92)',
              backdropFilter: 'blur(20px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
              border: '1px solid rgba(217,169,79,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {bookingNavs.map((nav, i) => (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({ isActive }) =>
                  `${isActive ? "text-gold-300 font-semibold bg-gold-400/10" : "text-slate-300 hover:text-gold-300 hover:bg-white/5"} block px-5 py-2.5 text-sm transition-all duration-200`
                }
              >
                {nav.cont}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Divider */}
        {currentUser && <span className="w-px h-5 bg-slate-600/60" />}

        {/* Admin/User Dashboard Dropdown */}
        {currentUser && (
          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-300 hover:text-gold-300 font-medium transition-all duration-200 text-sm py-2 px-5 rounded-full hover:bg-white/5">
              <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-50 group-hover:opacity-100" />
            </button>
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50"
              style={{
                background: 'rgba(17,24,39,0.92)',
                backdropFilter: 'blur(20px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                border: '1px solid rgba(217,169,79,0.12)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              {(isAdmin ? adminNavs : userNavs).map((nav, i) => (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({ isActive }) =>
                    `${isActive ? "text-gold-300 font-semibold bg-gold-400/10" : "text-slate-300 hover:text-gold-300 hover:bg-white/5"} block px-5 py-2.5 text-sm transition-all duration-200`
                  }
                >
                  {nav.cont}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — Login/Logout */}
      <div className="flex items-center flex-shrink-0">
        {!currentUser && (
          isLoginPage ? (
            <NavLink
              to="/"
              className="flex items-center py-2 px-5 text-slate-300 hover:text-gold-300 rounded-full border border-slate-700/60 hover:border-gold-400/30 hover:bg-white/5 transition-all duration-300 cursor-pointer text-sm font-medium"
            >
              <span>Home</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-1.5 py-2 px-5 bg-gradient-to-r from-gold-400 to-gold-600 text-slate-900 rounded-full shadow-md shadow-gold-500/20 hover:shadow-lg hover:shadow-gold-500/30 transition-all duration-300 cursor-pointer text-sm font-semibold hover:scale-[1.02] active:scale-[0.98]"
            >
              <CiLogin className="text-lg" />
              <span>Login</span>
            </NavLink>
          )
        )}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 py-2 px-5 text-slate-300 hover:text-rose-400 rounded-full border border-slate-700/60 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all duration-300 cursor-pointer text-sm font-medium"
          >
            <IoIosLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default LgNav;