import React, { useState, useEffect, useRef } from "react";
import "jspdf-autotable"; // For better table styling
import { getFoodOrders } from "../services/orderService";
import { getRentalVehicles } from "../services/vehicleRentalService";
import { fetchHallsBookings } from "../services/hallRegService";
import { getRoomBookings } from "../services/roomBookingService";
import { getParkingBookings } from "../services/parkingService";
import { useAuth } from "../contexts/authContext";
import FoodOrder from "../components/user-records/food/FoodOrder";
import "../components/user-records/userRecords.css";
import VehicleOrder from "../components/user-records/vehicle/VehicleOrder";
import Halls from "../components/user-records/hall/Halls";
import Rooms from "../components/user-records/rooms/Rooms";
import ParkingBookings from "../components/user-records/parking/ParkingBookings";
import Loader from "../components/common/loader/Loader";

const UserRecordsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Order");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const cacheRef = useRef({});

  // Mock: Selected fields for each booking type
  const bookingFields = {
    "Food Order": ["status", "applyDate"],
    "Rental Bookings": [
      "name",
      "vehicleName",
      "startDate",
      "endDate",
      "status",
    ],
    "Hall Bookings": ["name", "hallName", "startDate", "endDate", "status"],
    "Room Bookings": ["name", "room", "startDate", "endDate", "status"],
    "Parking Bookings": ["spotName", "spotCategory", "startDate", "endDate", "totalRate", "status"],
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      // Check cache first
      const cached = cacheRef.current[activeTab];
      if (cached) {
        setBookings(cached);
        setLoading(false);
      } else {
        setBookings([]);
        setLoading(true);
      }

      let data = [];
      if (activeTab === "Food Order") data = await getFoodOrders();
      if (activeTab === "Rental Bookings") data = await getRentalVehicles();
      if (activeTab === "Hall Bookings") data = await fetchHallsBookings();
      if (activeTab === "Room Bookings") data = await getRoomBookings();
      if (activeTab === "Parking Bookings") data = await getParkingBookings();

      // Filter bookings for the current user and sort by date descending
      if (currentUser?.uid) {
        let userBookings = data.filter((booking) => booking.userId === currentUser.uid);
        userBookings.sort((a, b) => {
          const getTimestamp = (record) => {
            if (record.applyDate?.toDate) return record.applyDate.toDate().getTime();
            if (record.startDate) return new Date(record.startDate).getTime();
            if (record.date) return new Date(record.date).getTime();
            if (record.createdAt?.toDate) return record.createdAt.toDate().getTime();
            return 0;
          };
          return getTimestamp(b) - getTimestamp(a);
        });

        cacheRef.current[activeTab] = userBookings;

        if (isMounted) {
          setBookings(userBookings);
          setLoading(false);
        }
      } else {
        if (isMounted) {
          setBookings([]);
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, [activeTab, currentUser?.uid]);

  const tabComponents = [
    {
      text: "Food Order",
      comp: FoodOrder, // Use the component reference here
    },
    {
      text: "Rental Bookings",
      comp: VehicleOrder,
    },
    {
      text: "Hall Bookings",
      comp: Halls,
    },
    {
      text: "Room Bookings",
      comp: Rooms,
    },
    {
      text: "Parking Bookings",
      comp: ParkingBookings,
    },
  ];

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 max-w-md sm:max-w-none mx-auto mb-8">
        {[
          "Food Order",
          "Rental Bookings",
          "Hall Bookings",
          "Room Bookings",
          "Parking Bookings",
        ].map((tab) => (
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
      {loading && !cacheRef.current[activeTab] ? (
        <Loader msg={"Fetching your records please wait!"} />
      ) : (
        <div>
          {bookings.length ? (
            <>
              {tabComponents.map(
                (curComp) =>
                  activeTab === curComp.text && (
                    <curComp.comp
                      key={curComp.text} // Add a unique key for each component
                      activeTab={activeTab}
                      bookingFields={bookingFields}
                      bookings={bookings}
                    />
                  )
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
              No records found for {activeTab}.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserRecordsPage;
