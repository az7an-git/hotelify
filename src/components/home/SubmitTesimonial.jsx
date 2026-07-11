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
    <section className="py-16 md:py-24 bg-slate-50/70">
      <div className="w-[95%] max-w-[1400px] mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 md:p-12 bg-white border border-slate-100 shadow-xl rounded-[2rem] space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Share Your Experience</h2>
            <p className="text-slate-500 mt-1 text-sm">We'd love to hear about your stay at Magnum Hotel.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-[28%] bg-white text-slate-800 border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 rounded-2xl px-5 py-3.5 outline-none transition-all text-sm disabled:opacity-50"
              disabled={loading}
            />
            <textarea
              placeholder="Tell us about your experience..."
              value={review}
              rows={3}
              onChange={(e) => setReview(e.target.value)}
              className="w-full md:flex-1 bg-white text-slate-800 border-2 border-slate-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 rounded-2xl px-5 py-3.5 outline-none transition-all text-sm resize-none disabled:opacity-50"
              disabled={loading}
            />
          </div>

          <div className="text-center space-y-3">
            <button
              type="submit"
              className="glass-button-primary inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full text-base font-bold shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 disabled:opacity-50 min-w-[200px]"
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
              <div className="text-emerald-600 text-sm font-semibold">
                ✓ Testimonial added successfully!
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubmitTestimonialForm;
