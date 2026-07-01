// src/pages/VehicleRentalPage.js
import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';
import { fetchVehicles } from '../../services/rentalRegService';
import Loader from '../common/loader/Loader';

const VehicleRentalPage = () => {
  const [vehicles, setVehicles] = useState([]);
      const[loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchAllVehicles = async () => {
      const allVehicles = await fetchVehicles();
      setVehicles(allVehicles);
      setLoading(false);
    }
    fetchAllVehicles();
  }, []);
 

  return (
    loading ? <Loader msg={"Fetching Vehicles"} /> :
    <div className="p-2 md:p-6">
      <h1 className="text-2xl lg:text-3xl text-center font-semibold mb-6">Available Vehicles</h1>
      <div className="flex w-full flex-wrap ">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleRentalPage;
