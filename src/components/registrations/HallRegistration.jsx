import { useState } from "react";
import { addHall } from "../../services/hallRegService";
import { inputStyles } from "./FoodRegistration";
import SubmitButton from "../common/button/SubmitButton";
import Loader from "../common/loader/Loader";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const HallRegistration = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [pp, setPp] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([
    { title: "", description: "", price: "", validity: "" },
  ]);

  const available = true;

  const handleAddOffer = () => {
    setOffers([
      ...offers,
      { title: "", description: "", price: "", validity: "" },
    ]);
  };

  const handleRemoveOffer = (index) => {
    const updatedOffers = offers.filter((_, i) => i !== index);
    setOffers(updatedOffers);
  };

  const handleOfferChange = (index, field, value) => {
    const updatedOffers = [...offers];
    updatedOffers[index][field] = value;
    setOffers(updatedOffers);
  };

  const handleAddHall = async (e) => {
    e.preventDefault();
    if (name && description && pp && image) {
      setLoading(true);
      const validOffers = offers.filter((offer) => offer.title.trim() !== "");
      await addHall(name, description, pp, image, available, validOffers);
      setLoading(false);
      toast.success(NOTIFICATIONS.HALL_REG_SUCCESS);
      setName("");
      setDescription("");
      setPp("");
      setImage(null);
      setOffers([{ title: "", description: "", price: "", validity: "" }]);
    }
  };

  return loading ? (
    <Loader msg={"Adding the hall"} />
  ) : (
    <div className="max-w-xl mx-auto p-4">
      <form
        onSubmit={handleAddHall}
        className="glass-card p-6 md:p-8 space-y-5"
      >
        <h3 className="text-xl font-bold text-center text-slate-800 pb-3 border-b border-white/60">Register Hall</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Hall Name</label>
            <input
              className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm"
              type="text"
              placeholder="e.g., Grand Ballroom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Rate per Person ($)</label>
            <input
              className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm"
              type="number"
              value={pp}
              onChange={(e) => setPp(e.target.value)}
              placeholder="e.g., 25"
              required
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Description</label>
          <textarea
            rows={2}
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm resize-none"
            placeholder="e.g., Capacity up to 500 guests with catering..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Hall Image</label>
          <label className="flex flex-col items-center justify-center border border-dashed border-white/60 hover:border-teal-500/50 rounded-xl p-4 cursor-pointer bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 font-medium hover:text-slate-250 transition-all text-xs">
            <span className="font-semibold">{image ? image.name : "Select Image File"}</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
              required
            />
          </label>
        </div>

        {/* Offers Section */}
        <div className="offers-section w-full border-t border-white/60/60 pt-4 space-y-3">
          <h4 className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Add Special Offers</h4>
          {offers.map((offer, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50/40 p-3 rounded-xl border border-white/60"
            >
              <div className="grid grid-cols-3 gap-2 flex-grow">
                <input
                  className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 text-xs w-full"
                  type="text"
                  placeholder="Offer Title"
                  value={offer.title}
                  onChange={(e) =>
                    handleOfferChange(index, "title", e.target.value)
                  }
                />
                <input
                  className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 text-xs w-full"
                  type="text"
                  placeholder="Description"
                  value={offer.description}
                  onChange={(e) =>
                    handleOfferChange(index, "description", e.target.value)
                  }
                />
                <input
                  className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-lg px-2.5 py-1.5 outline-none focus:border-amber-500 text-xs w-full"
                  type="number"
                  placeholder="Price"
                  value={offer.price}
                  onChange={(e) =>
                    handleOfferChange(index, "price", e.target.value)
                  }
                />
              </div>
              {offers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOffer(index)}
                  className="text-red-400 hover:text-red-300 p-1.5 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 border border-white/60 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Remove Offer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-600 border border-amber-500/20 rounded-xl text-xs font-semibold transition-colors duration-200"
            onClick={handleAddOffer}
          >
            + Add Another Offer
          </button>
        </div>

        <div className="pt-2 border-t border-white/60/60">
          <SubmitButton callToAction="Add Hall" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default HallRegistration;
