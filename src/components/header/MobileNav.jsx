import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { bookingNavs, adminNavs, userNavs } from "./navs";
import { ADMIN_UID } from "../../firebase/Firebase";

function MobileNav({ isOpen, currentUser, logo, handleLogout, setIsOpen }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isOpen && (
        <div className="lg:hidden absolute left-4 right-4 sm:left-6 sm:right-6 mt-3 glass-card rounded-3xl shadow-2xl py-4 px-4 flex flex-col gap-2 border border-white/40 animate-fade-in z-50 bg-white/70 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2">
            {/** Navs for Booking */}
            {bookingNavs.map((nav, i) => {
              return (
                <NavLink
                  key={`booking-${i}`}
                  to={`/${nav.nv}`}
                  className={({ isActive }) => `${isActive ? 'text-blue-700 font-bold bg-white/60 shadow-sm' : 'text-slate-700 hover:text-blue-600 hover:bg-white/50'} block py-2 px-2 rounded-2xl transition-all duration-300 text-center text-sm font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.cont}
                </NavLink>
              );
            })}

            {currentUser &&
              currentUser.uid === ADMIN_UID &&
              adminNavs.map((nav, i) => {
                return (
                  <NavLink
                    key={`admin-${i}`}
                    to={`/${nav.nv}`}
                    className={({ isActive }) => `${isActive ? 'text-blue-700 font-bold bg-white/60 shadow-sm' : 'text-slate-700 hover:text-blue-600 hover:bg-white/50'} block py-2 px-2 rounded-2xl transition-all duration-300 text-center text-sm font-medium`}
                    onClick={() => setIsOpen(false)}
                  >
                    {nav.cont}
                  </NavLink>
                );
              })}

            {currentUser &&
              currentUser.uid !== ADMIN_UID &&
              userNavs.map((nav, i) => {
                return (
                  <NavLink
                    key={`user-${i}`}
                    to={`/${nav.nv}`}
                    className={({ isActive }) => `${isActive ? 'text-blue-700 font-bold bg-white/60 shadow-sm' : 'text-slate-700 hover:text-blue-600 hover:bg-white/50'} block py-2 px-2 rounded-2xl transition-all duration-300 text-center text-sm font-medium`}
                    onClick={() => setIsOpen(false)}
                  >
                    {nav.cont}
                  </NavLink>
                );
              })}
          </div>

          <div className="mt-1 pt-2 border-t border-slate-200/50 flex justify-center">
            {!currentUser ? (
              isLoginPage ? (
                <NavLink
                  to="/"
                  className="py-2 px-8 text-slate-700 hover:text-blue-600 hover:bg-white/60 rounded-2xl transition-all duration-300 cursor-pointer text-sm font-semibold flex items-center justify-center w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Home</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="py-2.5 px-8 text-slate-700 hover:text-blue-600 hover:bg-white/60 rounded-2xl transition-all duration-300 cursor-pointer text-2xl flex items-center justify-center w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <CiLogin />
                </NavLink>
              )
            ) : (
              <button
                onClick={handleLogout}
                className="py-2.5 px-8 text-slate-700 hover:text-rose-600 hover:bg-rose-50/80 rounded-2xl transition-all duration-300 cursor-pointer text-2xl flex items-center justify-center w-full"
              >
                <IoIosLogOut />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNav;