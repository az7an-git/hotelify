import React, { useState, useEffect } from "react";
import "jspdf-autotable"; // For better table styling
import { getFoodOrders } from "../services/orderService";
import { getRentalVehicles } from "../services/vehicleRentalService";
import { fetchHallsBookings } from "../services/hallRegService";
import { getRoomBookings } from "../services/roomBookingService";
import { useAuth } from "../contexts/authContext";
import FoodOrder from "../components/user-records/food/FoodOrder";
import "../components/user-records/userRecords.css";
import VehicleOrder from "../components/user-records/vehicle/VehicleOrder";
import Halls from "../components/user-records/hall/Halls";
import Rooms from "../components/user-records/rooms/Rooms";
import Loader from "../components/common/loader/Loader";

const UserRecordsPage = () => {
  const [activeTab, setActiveTab] = useState("Food Order");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

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
  };

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      let data = [];
      if (activeTab === "Food Order") data = await getFoodOrders();
      if (activeTab === "Rental Bookings") data = await getRentalVehicles();
      if (activeTab === "Hall Bookings") data = await fetchHallsBookings();
      if (activeTab === "Room Bookings") data = await getRoomBookings();

      // Filter bookings for the current user
      if (currentUser?.uid) {
        setBookings(data.filter((booking) => booking.userId === currentUser.uid));
      } else {
        setBookings([]);
      }
      setLoading(false);
    };

    fetchBookings();
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
  ];

  return (
    <>
      {loading ? (
        <Loader msg={"Fetching your records please wait!"} />
      ) : (
        <div className="p-4 overflow-">
          {/* Tabs */}
          <div className="flex space-x-4 border-b-2 mb-4  overflow-x-auto">
            {[
              "Food Order",
              "Rental Bookings",
              "Hall Bookings",
              "Room Bookings",
            ].map((tab) => (
              <button
                key={tab}
                className={`px-4 max-md:text-sm py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Booking Records */}
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
              <p>No records found for {activeTab}.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserRecordsPage;
