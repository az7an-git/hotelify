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
      <div className="tabs flex justify-center items-center mb-8 gap-3 sm:gap-4 flex-wrap">
        {['Food', 'Rental', 'Parking', 'Hall', 'Room'].map(tab => (
          <button
            key={tab}
            className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-md border ${
              activeTab === tab
                ? 'bg-blue-500 text-white border-blue-400 shadow-blue-500/30'
                : 'bg-white/50 text-slate-600 border-white/60 hover:text-blue-700 hover:bg-white/80 backdrop-blur-md hover:shadow-lg'
            }`}
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
