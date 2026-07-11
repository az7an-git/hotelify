import { useState } from 'react';
import { addRoom } from '../../services/roomRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

import { toast } from 'sonner';
import { NOTIFICATIONS } from '../../constants/notifications';
import { useNavigate } from "react-router-dom";

const RoomRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);  
  const [price, setPrice] = useState(null);
  const [beds, setBeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const available = true;

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (name && description && image && price && beds) {
      setLoading(true);
      await addRoom(name, description, image, available, price, beds );
      setLoading(false);
      toast.success(NOTIFICATIONS.ROOM_REG_SUCCESS);
      navigate('/room-booking');
      setName('');
      setDescription('');
      setImage(null);
      setPrice('');
      setBeds('');
    }
    else{
      toast.error(NOTIFICATIONS.ROOM_REG_FIELDS_REQUIRED);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleAddRoom} className="glass-card p-6 md:p-8 space-y-5">
        <h3 className="text-xl font-bold text-center text-slate-800 pb-3 border-b border-white/60">Register Room</h3>
        
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Room Name</label>
          <input 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
            type="text" 
            placeholder="e.g., Deluxe Suite 204" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-end space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Price per Day ($)</label>
            <input 
              className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
              type="number" 
              placeholder="e.g., 120" 
              value={price || ''} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>

          <div className="flex flex-col justify-end space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">No. of Beds</label>
            <input 
              className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm disabled:opacity-50" 
              type="number" 
              placeholder="e.g., 2" 
              value={beds || ''} 
              onChange={(e) => setBeds(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider">Description</label>
          <textarea 
            rows={2} 
            className="bg-white/50 text-slate-800 border border-white/60 shadow-sm backdrop-blur-md focus:border-amber-400 focus:bg-white/80 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500 transition-colors text-sm resize-none disabled:opacity-50" 
            placeholder="e.g., Ocean view, king size bed..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            disabled={loading}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 font-medium uppercase tracking-wider mb-1">Room Image</label>
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
          <SubmitButton callToAction={"Add Room"} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default RoomRegistration;
