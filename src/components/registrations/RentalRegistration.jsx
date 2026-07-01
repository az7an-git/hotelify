import { useState } from 'react';
import { addVehicle } from '../../services/rentalRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

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
      alert('Vehicle added successfully!');
      setName('');
      setDesc('');
      setPrice('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleAddVehicle} className="flex justify-center items-center space-x-4 flex-wrap max-md:space-y-3">
      <input className={`${inputStyles} max-md:flex-1`} type="text" placeholder="Vehicle Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="number" placeholder="Price per Day" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Vehicle</button> */}
      <SubmitButton callToAction={loading ? 'Adding Vehicle...' : 'Add Vehicle'} />
    </form>
  );
};

export default RentalRegistration;
