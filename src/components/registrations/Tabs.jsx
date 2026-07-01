import { useState } from 'react';
import FoodRegistration from './FoodRegistration';
import RentalRegistration from './RentalRegistration';
import ParkingRegistration from './ParkingRegistration';
import HallRegistration from './HallRegistration';
import RoomRegistration from './RoomRegistration';

const RegistrationTabs = () => {
  const [activeTab, setActiveTab] = useState('Food');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Food':
        return <FoodRegistration />;
      case 'Rental':
        return <RentalRegistration />;
      case 'Parking':
        return <ParkingRegistration />;
      case 'Hall':
        return <HallRegistration />;
      case 'Room':
        return <RoomRegistration />;
      default:
        return <FoodRegistration />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="tabs flex justify-center items-center mb-5 space-x-4 flex-wrap max-md:space-y-3">
        {['Food', 'Rental', 'Parking', 'Hall', 'Room'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-1 rounded-xl  text-white ${activeTab === tab ? 'bg-blue-700' : 'bg-slate-600'}  `}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default RegistrationTabs;
