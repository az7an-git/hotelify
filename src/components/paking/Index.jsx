import React, { useEffect, useState } from 'react';
import ParkingCard from './ParkingCard';
import { fetchParkingSpots } from '../../services/parkingRegService';
import Loader from '../common/loader/Loader';

const ParkingMain = () => {
  const [parkingOptions, setParkingOptions] = useState([]);
      const[loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchParkingOptions = async () => {
      const options = await fetchParkingSpots();
      setParkingOptions(options);
      setLoading(false);
    };
    fetchParkingOptions();
  }, []);

  return (
    loading ? <Loader msg={"Fetching Parking Spots"} /> :
    <div className="p-6">
      <h1 className="text-2xl lg:text-3xl text-center font-bold mb-4">Parking Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parkingOptions.map((vehicle) => (
          <ParkingCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default ParkingMain;