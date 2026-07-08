import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const testimonialsCollection = collection(db, "testimonials");
    const unsubscribe = onSnapshot(testimonialsCollection, (snapshot) => {
      const testimonialsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsList);
    });

    return () => unsubscribe();
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

  const fallbackTestimonials = [
    {
      id: "fallback-t1",
      name: "Sarah Jenkins",
      review: "An absolute masterpiece of a hotel! The service was impeccably professional, and the attention to detail in every aspect of the room was remarkable. We'll definitely be returning.",
      time: new Date()
    },
    {
      id: "fallback-t2",
      name: "David Chen",
      review: "Magnum exceeded all my expectations. The concierge team was incredibly helpful in booking local tours, and the dining experience at the main restaurant was top-notch.",
      time: new Date()
    },
    {
      id: "fallback-t3",
      name: "Elena Rostova",
      review: "Beautiful rooms with stunning views, a wonderful wellness spa, and an atmosphere of pure relaxation. Highly recommend to anyone seeking a luxury stay.",
      time: new Date()
    }
  ];

  const displayedTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section className="py-12 md:py-24 my-8 md:my-12 mx-4 text-slate-800">
      <div className="container mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-12">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-800 whitespace-nowrap">Guests Say</span>
        </h2>
        {displayedTestimonials.length > 0 ? (
          <Slider {...settings} className="overflow-hidden">
            {displayedTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2 md:px-3 pb-4 pt-2 h-full">
                <div className="max-sm:p-5 p-8 glass-card border border-white/60 shadow-md flex flex-col justify-between h-full min-h-[240px]">
                  <p className="text-base md:text-lg italic text-slate-600 font-light leading-relaxed line-clamp-6 mb-4">
                    "{testimonial.review}"
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-200/50">
                    <p className="font-bold text-amber-700">{testimonial.name}</p>
                    <p className="text-slate-500 font-medium text-xs">
                      {testimonial.time && (testimonial.time.toDate ? testimonial.time.toDate().toLocaleDateString() : new Date(testimonial.time).toLocaleDateString())}
                    </p>
                  </div>
                </div>
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
