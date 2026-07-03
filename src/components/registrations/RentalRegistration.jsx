import { useState } from 'react';
import { addVehicle } from '../../services/rentalRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

import { toast } from 'sonner';

const RentalRegistration = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const available = true;

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (name && desc && price && image) {
      setLoading(true);
      await addVehicle(name, desc, price, image, available);
      setLoading(false);
      toast.success('Vehicle added successfully!');
      setName('');
      setDesc('');
      setPrice('');
      setImage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleAddVehicle} className="glass-card p-6 md:p-8 space-y-5">
        <h3 className="text-xl font-bold text-center text-slate-800 pb-3 border-b border-white/60">Register Vehicle</h3>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Vehicle Name</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm" 
            type="text" 
            placeholder="e.g., Tesla Model 3" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Description</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm" 
            type="text" 
            placeholder="e.g., Standard range rear wheel drive..." 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            required 
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Price per Day ($)</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-blue-400 focus:bg-white/80 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors text-sm" 
            type="number" 
            placeholder="e.g., 75" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Vehicle Image</label>
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
          <SubmitButton callToAction={"Add Vehicle"} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default RentalRegistration;
