import React, { useEffect, useState } from 'react';
import ParkingCard from './ParkingCard';
import { fetchParkingSpots } from '../../services/parkingRegService';
import Loader from '../common/loader/Loader';
import PageHeader from '../common/header/PageHeader';

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
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Parking Options" 
          subtitle="Secure and convenient parking spots for your vehicle." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingOptions.map((vehicle) => (
            <ParkingCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingMain;