import React from "react";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { bookingNavs, adminNavs, userNavs } from "./navs";

function MobileNav({ isOpen, currentUser, logo, handleLogout, setIsOpen }) {
  return (
    <div>
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 border-t border-slate-800/80 pb-4 text-center">
          <NavLink to="/" className="block py-2 px-4 hover:bg-slate-800/50">
            <img className="w-10 h-8 mx-auto object-contain" src={logo} alt="Logo" />
          </NavLink>
          {/** Navs for Booking */}
          {bookingNavs.map((nav, i) => {
            return (
              <NavLink
                key={i}
                to={`/${nav.nv}`}
                className={({isActive}) =>  `${isActive ? 'text-teal-400 font-semibold bg-slate-800/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'} block py-2 px-4 rounded transition-all duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {nav.cont}
              </NavLink>
            );
          })}
          {/** Navs for Admin */}
          {currentUser &&
            currentUser.uid === "6HVNgEkgDfXnco34ujwrVfpmwbx2" &&
            adminNavs.map((nav, i) => {
              return (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({isActive}) =>  `${isActive ? 'text-teal-400 font-semibold bg-slate-800/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'} block py-2 px-4 rounded transition-all duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.cont}
                </NavLink>
              );
            })}
          {/** Navs for Users */}
          {currentUser &&
            currentUser.uid !== "6HVNgEkgDfXnco34ujwrVfpmwbx2" &&
            userNavs.map((nav, i) => {
              return (
                <NavLink
                  key={i}
                  to={`/${nav.nv}`}
                  className={({isActive}) =>  `${isActive ? 'text-teal-400 font-semibold bg-slate-800/40' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'} block py-2 px-4 rounded transition-all duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.cont}
                </NavLink>
              );
            })}
          {!currentUser && (
            <NavLink
              to="/login"
              className="block py-2 px-4 text-slate-300 hover:text-white hover:bg-slate-800/40 rounded transition-all duration-200 cursor-pointer text-xl mx-auto"
              onClick={() => setIsOpen(false)}
            >
              <CiLogin />
            </NavLink>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-slate-300 hover:text-rose-400 hover:bg-slate-800/40 rounded transition-all duration-200 cursor-pointer text-xl mx-auto "
            >
              <IoIosLogOut />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileNav;