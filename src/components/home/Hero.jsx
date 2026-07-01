import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import ImgLoader from "../common/loader/ImgLoader";

const HeroSection = () => {
  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const snapshot = await getDocs(collection(db, "custom-pics"));
        const heroBg = snapshot.docs.map((doc) => doc.data()); // Assuming `url` field contains the image link
        if (heroBg.length > 0) {
          setBg(heroBg[0]); // Set the first URL if it exists
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, []);
  return loading ? (
    <div className="h-screen w-full relative flex items-center justify-center bg-slate-950">
      <ImgLoader />
    </div>
  ) : (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: bg ? `url(${bg.heroBg})` : "none",
      }}
    >
      {/* Premium dark gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40"></div>
      
      {/* Decorative ambient light source */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300 animate-fadeInDown pb-2">
          Experience Luxury & Comfort
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto font-light animate-fadeInUp">
          Welcome to <span className="text-teal-400 font-medium">Magnum</span> — Your dream luxury stay awaits!
        </p>
        <div className="pt-4">
          <Link
            to="/room-booking"
            className="inline-block relative group overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-8 py-3.5 rounded-full font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;