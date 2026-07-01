import { useState } from 'react';
import { addRoom } from '../../services/roomRegService';
import { inputStyles } from './FoodRegistration';
import SubmitButton from '../common/button/SubmitButton';

const RoomRegistration = () => {
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
      alert('Room added successfully!');
      setName('');
      setDescription('');
      setImage(null);
      setPrice('');
      setBeds('');
    }
    else{
      alert('Please fill out all the fields')
    }
  };

  return (
    <form onSubmit={handleAddRoom} className="max-md:space-y-3 flex justify-center items-center space-x-4 flex-wrap">
      <input className={`${inputStyles} max-md:flex-1`} type="text" placeholder="Room Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="number" placeholder="Price Per Day" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input className={`${inputStyles} max-md:flex-1`} type="number" placeholder="No.of Beds" value={beds} onChange={(e) => setBeds(e.target.value)} required />
      <textarea rows={1} className={` ${inputStyles} max-md:flex-1 `} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      {/* <button type="submit">Add Room</button> */}
      <SubmitButton callToAction={loading ? 'Adding Room...' : 'Add Room'} />
    </form>
  );
};

export default RoomRegistration;
