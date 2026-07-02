import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonialsCollection = collection(db, "testimonials");
      const testimonialsSnapshot = await getDocs(testimonialsCollection);
      const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsList);
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-12 max-md:mt-5 lg:py-24 glass-panel my-12 mx-4 rounded-3xl text-slate-800 border-t border-white/50">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-12">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Guests Say</span>
        </h2>
        {testimonials.length > 0 ? (
          <Slider {...settings}
          className="overflow-hidden"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="max-sm:p-4 p-8 glass-card space-y-3">
               <p className="text-base md:text-lg italic text-slate-600 font-light">"{testimonial.review}"</p>
                <p className="font-bold text-blue-600">{testimonial.name}</p>
                <p className="text-slate-600 font-medium text-xs">{testimonial.time.toDate().toLocaleDateString()}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-slate-600 font-medium italic">No testimonials available yet.</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
