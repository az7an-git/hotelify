import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import ImgLoader from '../common/loader/ImgLoader';

const AboutUsSection = () => {
    const [bg, setBg] = useState(null);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchAboutImage = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'custom-pics'));
          const heroBg = snapshot.docs.map(doc => doc.data()); // Assuming `url` field contains the image link
          // if (heroBg.length > 0) {
            setBg(heroBg[0].about); // Set the first URL if it exists
            setLoading(false);
          // }
        } catch (error) {
          console.error('Error fetching about image:', error);
        }
      };
  
      fetchAboutImage();
    }, []);
    
 return ( 
  loading ? <ImgLoader/> :
 <section className="py-12 lg:py-24 bg-slate-900 text-slate-100 max-lg:mt-5 border-t border-slate-800/60">
    <div className="container mx-auto px-8 lg:flex lg:items-center lg:gap-16">
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Magnum Hotel</span>
        </h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light">
          Experience unmatched luxury and comfort at The Magnum. From the moment you step through our doors, you'll be immersed in elegance and refinement. Our dedicated staff is committed to providing a personalized and unforgettable stay.
        </p>
        <div>
          <button className="bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/30 hover:border-teal-500/60 px-6 py-2.5 rounded-full font-semibold transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 h-[45vh] lg:flex lg:justify-center mt-10 lg:mt-0 relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <img src={bg} alt="About Hotel" className="relative rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500 w-full h-full object-cover object-center border border-slate-800" />
      </div>
    </div>
  </section>
 );
};

export default AboutUsSection;
