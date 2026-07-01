import React, { useEffect, useState } from "react";
import {
  deleteNotification,
  getUserFoodNotifications,
} from "../../services/userFoodNotifications.js";
import { useAuth } from "../../contexts/authContext";
import UserFoodNotification from "./UserFoodNotification.jsx";
import UserRentalNotifications from "../rental/UserRentalNotifications.jsx";
import { getRentalVehiclesNotification } from "../../services/vehicleRentalService.js";
import UserControlsRoom from "../room-booking/UserControlsRoom.jsx";
import { getRoomBookingsNotification } from "../../services/roomBookingService.js";
import UserControlsHall from "../wedding-hall/UserControlsHall.jsx";
import Tabs from "./Tabs.jsx";

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState("food-orders");
  const [foodNotifications, setFoodNotifications] = useState([]);
  const [rentalVehicles, setRentalVehicles] = useState([]);
  const [roomNotifications, setRoomNotifications] = useState([]);
  const [loading, setLoading] = useState({
    food: true,
    rental: true,
    room: true,
  });


  const { currentUser } = useAuth(); // Get the current user's ID

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const userNotifications = await getUserFoodNotifications(
          currentUser.uid
        );
        setFoodNotifications(userNotifications);
        setLoading((prev) => ({
          ...prev,
          food: false,
        }));
      }
    };
    const fetchRentalInfo = async () => {
      const appliedRental = await getRentalVehiclesNotification();
      const myVehicles = appliedRental.filter((vehicle) => {
        return vehicle.userId === currentUser.uid;
      });
      setRentalVehicles(myVehicles);
      setLoading((prev) => ({
        ...prev,
        rental: false,
      }))
    };
    const getRoomNotifications = async () => {
      const roomBookingNotification = await getRoomBookingsNotification();
      const myNotifications = roomBookingNotification.filter((room) => {
        return room.userId === currentUser.uid;
      });
      setRoomNotifications(myNotifications);
      setLoading((prev) => ({
        ...prev,
        room: false,
      }))
    };
    getRoomNotifications();
    fetchNotifications();
    fetchRentalInfo();
  }, [currentUser, activeTab]);

  const handleDelete = async (notificationId, collectionNotification) => {
    await deleteNotification(notificationId, collectionNotification);
    alert("Notification deleted successfully");
    setFoodNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
    setRentalVehicles((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
    setRoomNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "food-orders" && (
        <UserFoodNotification
          handleDelete={handleDelete}
          notifications={foodNotifications}
          loading={loading}
        />
      )}
      {activeTab === "rental-orders" && (
        <div>
          <UserRentalNotifications
            rentalVehicles={rentalVehicles}
            handleDelete={handleDelete}
            loading={loading}
          />
        </div>
      )}
      {activeTab === "room-bookings" && (
        <div>
          <UserControlsRoom
            roomNotifications={roomNotifications}
            handleDelete={handleDelete}
            loading={loading}

          />
        </div>
      )}
      {activeTab === "hall-bookings" && (
        <div>
          <UserControlsHall handleDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default UserNotifications;