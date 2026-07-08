import { useEffect, useState } from "react";
import { getFoodOrders } from "../../services/orderService";
import { getRentalVehicles } from "../../services/vehicleRentalService";
import { fetchHallsBookings } from "../../services/hallRegService";
import { getRoomBookings } from "../../services/roomBookingService";
import Loader from "../common/loader/Loader";
import VehicleOrder from "../user-records/vehicle/VehicleOrder";
import Halls from "../user-records/hall/Halls";
import Rooms from "../user-records/rooms/Rooms";
import FoodOrder from "../user-records/food/FoodOrder";


const AdminRecords = () => {
  const [activeTab, setActiveTab] = useState("Food Order");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  // Mock: Selected fields for each booking type
  const bookingFields = {
    "Food Order": ["userName", "status",],
    "Rental Bookings": ["name", "vehicleName", "startDate", "endDate",],
    "Hall Bookings": ["name", "hallName", "startDate", "endDate", "status"],
    "Room Bookings": ["name", "room", "startDate", "endDate", "status"],
  };

  useEffect(() => {
    const fetchBookings = async () => {
      let data = [];
      if (activeTab === "Food Order") data = await getFoodOrders();
      if (activeTab === "Rental Bookings") data = await getRentalVehicles();
      if (activeTab === "Hall Bookings") data = await fetchHallsBookings();
      if (activeTab === "Room Bookings") data = await getRoomBookings();

      // Sort bookings by date descending (newest first)
      const sortedData = data.sort((a, b) => {
        const getTimestamp = (record) => {
          if (record.applyDate?.toDate) return record.applyDate.toDate().getTime();
          if (record.startDate) return new Date(record.startDate).getTime();
          if (record.date) return new Date(record.date).getTime();
          if (record.createdAt?.toDate) return record.createdAt.toDate().getTime();
          return 0;
        };
        return getTimestamp(b) - getTimestamp(a);
      });
      setBookings(sortedData);
      setLoading(false);
    };

    fetchBookings();
  }, [activeTab]);

  const records = [
    {
      name: "Food Order",
      comp: FoodOrder,
    },
    {
      name: "Rental Bookings",
      comp: VehicleOrder,
    },
    {
      name: "Hall Bookings",
      comp: Halls,
    },
    {
      name: "Room Bookings",
      comp: Rooms,
    },
  ]

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 max-w-md sm:max-w-none mx-auto mb-8">
        {["Food Order", "Rental Bookings", "Hall Bookings", "Room Bookings"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2.5 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md border text-center ${activeTab === tab
                ? 'bg-amber-600 text-white border-amber-500 shadow-amber-500/10'
                : 'bg-white/50 text-slate-600 border-white/60 hover:text-amber-700 hover:bg-white/80 backdrop-blur-md hover:shadow-lg'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Records */}
      {
        loading ? <Loader msg={"Fetching Records"} /> :
          <div>
            {bookings.length ? (
              <>
                {
                  records.map((record) => (
                    activeTab === record.name && <record.comp
                      activeTab={activeTab}
                      bookingFields={bookingFields}
                      bookings={bookings}
                    />
                  ))

                }
              </>
            ) : (
              <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
                No records found for {activeTab}.
              </div>
            )}
          </div>
      }
    </div>
  );
};

export default AdminRecords