import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { inputStyles } from "../registrations/FoodRegistration";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const SubmitTestimonialForm = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !review ) {
      toast.error(NOTIFICATIONS.TESTIMONIAL_FIELDS_REQUIRED);
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await addDoc(collection(db, "testimonials"), {
        name,
        review,
        time: Timestamp.fromDate(new Date())
      });
      setName("");
      setReview("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error adding testimonial: ", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16">
      <form onSubmit={handleSubmit} className="p-6 md:p-8 glass-card space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800">Share Your Experience</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-[30%] bg-white text-slate-800 border-2 border-slate-200 shadow-sm focus:border-amber-400 focus:ring-4 focus:ring-amber-100 rounded-full px-5 py-3 outline-none transition-all text-sm disabled:opacity-50"
            disabled={loading}
          />
          <textarea
            placeholder="Your Review"
            value={review}
            rows={1}
            onChange={(e) => setReview(e.target.value)}
            className="w-full md:w-[67%] bg-white text-slate-800 border-2 border-slate-200 shadow-sm focus:border-amber-400 focus:ring-4 focus:ring-amber-100 rounded-xl px-5 py-3 outline-none transition-all text-sm resize-none disabled:opacity-50"
            disabled={loading}
          />
        </div>
      
        <div className="text-center space-y-3">
          <button
            type="submit"
            className="glass-button-primary inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-base font-bold shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 min-w-[180px]"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : "Submit Testimonial"}
          </button>

          {success && (
            <div className="text-emerald-400 text-sm font-semibold animate-fadeInUp">
              ✓ Testimonial added successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SubmitTestimonialForm;
