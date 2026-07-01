import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { adminNavs, bookingNavs, userNavs } from "./navs";

function LgNav({ isOpen, currentUser, logo, handleLogout }) {
  const isAdmin = currentUser && currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2";

  return (
    <div
      className={`hidden lg:flex ${
        isOpen ? "block" : "hidden"
      } lg:space-x-8 items-center justify-between w-full`}
    >
      <div className="flex items-center space-x-6">
        <NavLink to="/" className="block py-1 hover:opacity-85 transition-opacity">
          <img className="w-10 h-8 object-contain" src={logo} alt="Logo" />
        </NavLink>

        {/* Services Dropdown */}
        <div className="relative group py-2">
          <button className="flex items-center space-x-1.5 text-slate-300 hover:text-white font-medium transition-colors duration-200">
            <span>Services</span>
            <FaChevronDown className="text-xs transition-transform duration-250 group-hover:rotate-180" />
          </button>
          <div className="absolute left-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
            {bookingNavs.map((nav, i) => (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-teal-400 font-semibold bg-slate-800/40" : "text-slate-300 hover:text-white hover:bg-slate-800/40"
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
            <button className="flex items-center space-x-1.5 text-slate-300 hover:text-white font-medium transition-colors duration-200">
              <span>{isAdmin ? "Admin Panel" : "My Account"}</span>
              <FaChevronDown className="text-xs transition-transform duration-250 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              {(isAdmin ? adminNavs : userNavs).map((nav, i) => (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-teal-400 font-semibold bg-slate-800/40" : "text-slate-300 hover:text-white hover:bg-slate-800/40"
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
          <NavLink
            to="/login"
            className="flex items-center space-x-1 py-1.5 px-4 text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-full border border-slate-800 transition-all duration-200 cursor-pointer text-sm font-medium"
          >
            <CiLogin className="text-lg" />
            <span>Login</span>
          </NavLink>
        )}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 py-1.5 px-4 text-slate-300 hover:text-rose-400 hover:bg-slate-800/40 rounded-full border border-slate-800 transition-all duration-200 cursor-pointer text-sm font-medium"
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