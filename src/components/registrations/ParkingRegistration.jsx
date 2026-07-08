import { useState } from 'react';
import { addParkingSpot } from '../../services/parkingRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

import { toast } from 'sonner';
import { NOTIFICATIONS } from '../../constants/notifications';

const ParkingRegistration = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState(null);

  const handleAddParkingSpot = async (e) => {
    e.preventDefault();
    if (name && category && rate && image) {
      setLoading(true);
      await addParkingSpot(name, category, rate, isAvailable, image, );
      setLoading(false);
      toast.success(NOTIFICATIONS.PARKING_REG_SUCCESS);
      setName('');
      setCategory('');
      setRate('');
      setIsAvailable(false);
      setImage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleAddParkingSpot} className="glass-card p-6 md:p-8 space-y-5">
        <h3 className="text-xl font-bold text-center text-slate-800 pb-3 border-b border-white/60">Register Parking Spot</h3>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Spot Name / Code</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
            type="text" 
            placeholder="e.g., A-101" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Description</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
            type="text" 
            placeholder="e.g., Basement Level 1, near elevator..." 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Rate ($)</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
            type="number" 
            placeholder="e.g., 10" 
            value={rate} 
            onChange={(e) => setRate(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>

        <div className="flex items-center space-x-3 bg-white/40 backdrop-blur-md border border-white/50/60 p-3 rounded-xl border border-white/60">
          <input 
            type="checkbox" 
            id="isAvailable"
            checked={isAvailable} 
            onChange={(e) => setIsAvailable(e.target.checked)} 
            className="w-4 h-4 rounded border-white/60 bg-white/40 backdrop-blur-md border border-white/50 text-amber-600 focus:ring-amber-500 disabled:opacity-50"
            disabled={loading}
          />
          <label htmlFor="isAvailable" className="text-sm font-semibold text-slate-600 cursor-pointer">
            Mark Spot as Available Immediately
          </label>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Spot Location Image</label>
          <label className={`flex flex-col items-center justify-center border border-dashed border-white/60 hover:border-teal-500/50 rounded-xl p-4 cursor-pointer bg-white/40 backdrop-blur-md border border-white/50 text-slate-600 font-medium hover:text-slate-250 transition-all text-xs ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>
            <span className="font-semibold">{image ? image.name : "Select Image File"}</span>
            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="hidden"
              required 
              disabled={loading}
            />
          </label>
        </div>

        <div className="pt-2">
          <SubmitButton callToAction={"Add Parking Spot"} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ParkingRegistration;
