import { useState } from "react";
import { addFoodItem } from "../../services/foodRegService";
import SubmitButton from "../common/button/SubmitButton";
import Loader from "../common/loader/Loader";

const FoodRegistration = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const available = true;

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (name && category && price && image && desc) {
      setLoading(true);
      await addFoodItem(name, category, price, image, available, desc);
      alert("Food Item Added Successfully");
      setLoading(false);
      setName("");
      setCategory("");
      setDesc("");
      setPrice("");
      setImage(null);
    }
  };

  return loading ? (
    <Loader msg={"Adding the Dish"} />
  ) : (
    <div className="max-w-md mx-auto p-4">
      <form
        onSubmit={handleAddFood}
        className="glass-card p-6 md:p-8 space-y-5"
      >
        <h3 className="text-xl font-bold text-center text-slate-800 pb-3 border-b border-white/60">Register Food Item</h3>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Food Name</label>
          <input
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm"
            type="text"
            placeholder="e.g., Gourmet Pizza"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Price ($)</label>
          <input
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm"
            type="number"
            placeholder="e.g., 15"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Description</label>
          <input
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm"
            type="text"
            placeholder="e.g., Delicious wood-fired crust..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Category</label>
          <div className="grid grid-cols-3 gap-2">
            {["Full Course", "Lunch", "Breakfast"].map((cat) => (
              <label 
                key={cat}
                className={`flex items-center justify-center py-2 px-1 text-xs border rounded-xl cursor-pointer font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-blue-500 text-slate-950 border-teal-300"
                    : "bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 font-medium border-white/60 hover:text-slate-700 hover:bg-slate-850"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden"
                  required
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Item Image</label>
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

        <div className="pt-2">
          <SubmitButton callToAction={"Add Food Item"} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default FoodRegistration;

export const inputStyles =
  "border border-yellow-800 rounded-lg px-2 py-1 focus:outline-none focus:border-yellow-300 focus:border-2";
