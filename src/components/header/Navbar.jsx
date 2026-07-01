import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useAuth } from "../../contexts/authContext";
import logo from "../../assets/common/magnum.png";
import useSticky from "../../hooks/use-sticky";
import MobileNav from "./MobileNav";
import LgNav from "./LgNav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { headerSticky } = useSticky();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setIsOpen(false)
    } catch (error) {
      alert(`logout failed error: ${error}`);
      throw error;
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-white shadow-lg w-full z-50 transition-all duration-300 ${
        headerSticky ? "sticky top-0 shadow-slate-950/20" : "relative"
      }`}
    >
      <nav
        className="container mx-auto flex flex-wrap justify-between items-center p-4"
      >
        {/* Mobile Logo */}
        <NavLink to="/" className="lg:hidden block py-1 hover:opacity-85 transition-opacity">
          <img className="w-10 h-8 object-contain" src={logo} alt="Logo" />
        </NavLink>

        {/* Hamburger Icon */}
        <button className="lg:hidden ms-auto" onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
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