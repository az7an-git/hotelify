import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { inputStyles } from "../registrations/FoodRegistration";

const SubmitTestimonialForm = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
//   const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !review ) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);

    try {
    const testimonialSubit = async () => {
        await addDoc(collection(db, "testimonials"), {
          name,
          review,
          time: Timestamp.fromDate(new Date())
        });
        setName("");
        setReview("");
        // setImage(null);
        alert('Testimonial added successfully')
      };
      testimonialSubit();
    //   reader.readAsDataURL(image);
    } catch (error) {
      console.error("Error adding testimonial: ", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center font-bold mb-4">Share your thoughts</h2>
   <div
className="flex justify-between items-center flex-wrap mb-4"
   >
   <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`w-[15%] p-2 border rounded-lg ${inputStyles} `}
      />
      <textarea
        placeholder="Your Review"
        value={review}
        rows={1}
        onChange={(e) => setReview(e.target.value)}
        className="w-[70%] p-2  border rounded-lg"
      />
     </div>
   
    <div
    className="text-center"
    >
    <button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </div>
    </form>
  );
};

export default SubmitTestimonialForm;
