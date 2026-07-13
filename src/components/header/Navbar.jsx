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
    <header
      className="w-full z-50 fixed top-0 left-0 right-0 animate-fade-in transition-all duration-300"
      style={headerSticky ? {
        backgroundColor: 'rgba(12, 18, 34, 0.75)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      } : {}}
    >
      <nav className="w-[90%] max-w-[1100px] mx-auto flex flex-wrap justify-between items-center py-3 sm:py-2 px-4 sm:px-6">
        {/* Mobile Logo */}
        <NavLink to="/" className="lg:hidden flex items-center gap-2.5 py-1 hover:opacity-90 transition-opacity">
          <img className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(212,164,76,0.3)]" src={logo} alt="Magnum Hotel Logo" />
          <span className="text-sm font-bold tracking-[0.18em] uppercase text-gold-300 font-sans">
            Magnum Hotel
          </span>
        </NavLink>

        {/* Hamburger Icon */}
        <button className="lg:hidden ms-auto text-slate-300 hover:text-gold-300 transition-colors" onClick={toggleMenu}>
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>

        {/*Big screen nav */}
        <LgNav
          isOpen={isOpen}
          currentUser={currentUser}
          logo={logo}
          handleLogout={handleLogout}
          isScrolled={headerSticky}
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