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
      <NavLink to="/" className="flex items-center gap-3 py-1 group flex-shrink-0">
        <div className="relative">
          <img className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105" src={logo} alt="Magnum Hotel Logo" />
          <div className="absolute inset-0 rounded-full bg-amber-400/10 scale-0 group-hover:scale-150 transition-transform duration-500" />
        </div>
        <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-800 font-sans">
          Magnum Hotel
        </span>
      </NavLink>

      {/* CENTER — Nav links in white pill */}
      <div
        className="flex items-center gap-1 rounded-full transition-all duration-300"
        style={{
          padding: '6px 8px',
          background: isScrolled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.92)',
          border: isScrolled ? '1px solid rgba(255,255,255,0.35)' : '1px solid rgba(203,213,225,0.5)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
            : '0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
          backdropFilter: isScrolled ? 'blur(16px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(1.8)' : 'none',
        }}
      >
        {/* Services Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 text-slate-600 hover:text-amber-700 font-medium transition-all duration-200 text-sm py-2 px-5 rounded-full hover:bg-amber-50/60">
            <span>Services</span>
            <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-50 group-hover:opacity-100" />
          </button>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50"
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {bookingNavs.map((nav, i) => (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({ isActive }) =>
                  `${isActive ? "text-amber-700 font-semibold bg-gradient-to-r from-amber-50 to-orange-50" : "text-slate-600 hover:text-amber-700 hover:bg-slate-50/80"} block px-5 py-2.5 text-sm transition-all duration-200`
                }
              >
                {nav.cont}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Divider */}
        {currentUser && <span className="w-px h-5 bg-slate-200/60" />}

        {/* Admin/User Dashboard Dropdown */}
        {currentUser && (
          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-600 hover:text-amber-700 font-medium transition-all duration-200 text-sm py-2 px-5 rounded-full hover:bg-amber-50/60">
              <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
              <FaChevronDown className="text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-50 group-hover:opacity-100" />
            </button>
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-52 rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50"
              style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              {(isAdmin ? adminNavs : userNavs).map((nav, i) => (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({ isActive }) =>
                    `${isActive ? "text-amber-700 font-semibold bg-gradient-to-r from-amber-50 to-orange-50" : "text-slate-600 hover:text-amber-700 hover:bg-slate-50/80"} block px-5 py-2.5 text-sm transition-all duration-200`
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
              className="flex items-center py-2 px-5 text-slate-600 hover:text-amber-700 rounded-full border border-slate-200/60 hover:border-amber-200 hover:bg-amber-50/40 transition-all duration-300 cursor-pointer text-sm font-medium hover:shadow-sm"
            >
              <span>Home</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center gap-1.5 py-2 px-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full shadow-md shadow-amber-600/20 hover:shadow-lg hover:shadow-amber-600/30 transition-all duration-300 cursor-pointer text-sm font-medium hover:scale-[1.02] active:scale-[0.98]"
            >
              <CiLogin className="text-lg" />
              <span>Login</span>
            </NavLink>
          )
        )}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 py-2 px-5 text-slate-600 hover:text-rose-600 rounded-full border border-slate-200/60 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-300 cursor-pointer text-sm font-medium hover:shadow-sm"
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