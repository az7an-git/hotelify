import { useState } from 'react';
import { addParkingSpot } from '../../services/parkingRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

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
      alert('Parking spot added successfully!');
      setName('');
      setCategory('');
      setRate('');
      setIsAvailable(false);
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleAddParkingSpot} className="parking-registration-form flex justify-center items-center flex-wrap space-x-4 max-md:space-y-3">
      <input className={`${inputStyles} max-md:flex-1`} type="text" placeholder="Parking Spot Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="text" placeholder="Description" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(e.target.value)} required />
      <label>
        <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
        Available
      </label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Parking Spot</button> */}
      <SubmitButton callToAction={loading ? 'Adding Parking Spot...' : 'Add Parking Spot'} />
    </form>
  );
};

export default ParkingRegistration;
