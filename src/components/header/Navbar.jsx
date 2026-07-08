import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useAuth } from "../../contexts/authContext";
import logo from "../../assets/common/magnum.png";
import useSticky from "../../hooks/use-sticky";
import MobileNav from "./MobileNav";
import LgNav from "./LgNav";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);
  const navigate = useNavigate();
  const { headerSticky } = useSticky();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success(NOTIFICATIONS.AUTH_LOGOUT_SUCCESS);
      navigate("/login");
      setIsOpen(false)
    } catch (error) {
      toast.error(NOTIFICATIONS.AUTH_LOGOUT_ERROR(error.message));
      throw error;
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full z-50 sticky top-4 px-4 sm:px-6 lg:px-8 animate-fade-in transition-all duration-300">
      <nav className="glass-card max-w-7xl mx-auto flex flex-wrap justify-between items-center py-2.5 px-6 rounded-full shadow-lg">
        {/* Mobile Logo */}
        <NavLink to="/" className="lg:hidden flex items-center gap-2 py-1 hover:opacity-90 transition-opacity">
          <img className="w-9 h-9 object-contain" src={logo} alt="Magnum Hotel Logo" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800 bg-clip-text text-transparent font-sans">
            Magnum Hotel
          </span>
        </NavLink>

        {/* Hamburger Icon */}
        <button className="lg:hidden ms-auto text-slate-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>

        {/*Big screen nav */}
        <LgNav
          isOpen={isOpen}
          currentUser={currentUser}
          logo={logo}
          handleLogout={handleLogout}
        />
      </nav>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isOpen}
        currentUser={currentUser}
        logo={logo}
        handleLogout={handleLogout}
        setIsOpen={setIsOpen}
      />
    </header>
  );
};

export default Navbar;