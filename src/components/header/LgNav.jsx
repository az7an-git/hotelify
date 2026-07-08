import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { adminNavs, bookingNavs, userNavs } from "./navs";
import { ADMIN_UID } from "../../firebase/Firebase";

function LgNav({ isOpen, currentUser, logo, handleLogout }) {
  const isAdmin = currentUser && currentUser.uid === ADMIN_UID;
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`hidden lg:flex ${isOpen ? "block" : "hidden"
        } lg:space-x-8 items-center justify-between w-full`}
    >
      <div className="flex items-center space-x-6">
        <NavLink to="/" className="flex items-center gap-2.5 py-1 hover:opacity-90 transition-opacity">
          <img className="w-9 h-9 object-contain" src={logo} alt="Magnum Hotel Logo" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent font-sans">
            Magnum Hotel
          </span>
        </NavLink>

        {/* Services Dropdown */}
        <div className="relative group py-2">
          <button className="flex items-center space-x-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">
            <span>Services</span>
            <FaChevronDown className="text-xs transition-transform duration-250 group-hover:rotate-180" />
          </button>
          <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
            {bookingNavs.map((nav, i) => (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({ isActive }) =>
                  `${isActive ? "text-blue-600 font-semibold bg-blue-50/80" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50/80"
                  } block px-4 py-2 text-sm transition-all duration-200`
                }
              >
                {nav.cont}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Admin/User Dashboard Dropdown */}
        {currentUser && (
          <div className="relative group py-2">
            <button className="flex items-center space-x-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">
              <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
              <FaChevronDown className="text-xs transition-transform duration-250 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              {(isAdmin ? adminNavs : userNavs).map((nav, i) => (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-600 font-semibold bg-blue-50/80" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50/80"
                    } block px-4 py-2 text-sm transition-all duration-200`
                  }
                >
                  {nav.cont}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        {!currentUser && (
          isLoginPage ? (
            <NavLink
              to="/"
              className="flex items-center py-1.5 px-4 text-slate-700 hover:text-blue-600 hover:bg-slate-100/50 rounded-full border border-slate-200 transition-all duration-200 cursor-pointer text-sm font-medium"
            >
              <span>Home</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center space-x-1 py-1.5 px-4 text-slate-700 hover:text-blue-600 hover:bg-slate-100/50 rounded-full border border-slate-200 transition-all duration-200 cursor-pointer text-sm font-medium"
            >
              <CiLogin className="text-lg" />
              <span>Login</span>
            </NavLink>
          )
        )}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 py-1.5 px-4 text-slate-700 hover:text-rose-500 hover:bg-rose-50/50 rounded-full border border-slate-200 transition-all duration-200 cursor-pointer text-sm font-medium"
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