// src/pages/VehicleRentalPage.js
import React, { useEffect, useState } from 'react';
import VehicleCard from './VehicleCard';
import { fetchVehicles } from '../../services/rentalRegService';
import Loader from '../common/loader/Loader';
import PageHeader from '../common/header/PageHeader';

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
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Available Vehicles" 
          subtitle="Explore our premium fleet for your transportation needs." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleRentalPage;
