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
import UserControlsParking from "../parking/UserControlsParking.jsx";
import { getParkingBookingsNotification } from "../../services/parkingService.js";
import Tabs from "./Tabs.jsx";

import { toast } from "sonner";
import { NOTIFICATIONS } from "../../constants/notifications";

const UserNotifications = () => {
  const [activeTab, setActiveTab] = useState("food-orders");
  const [foodNotifications, setFoodNotifications] = useState([]);
  const [rentalVehicles, setRentalVehicles] = useState([]);
  const [roomNotifications, setRoomNotifications] = useState([]);
  const [parkingNotifications, setParkingNotifications] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState({
    food: true,
    rental: true,
    room: true,
    parking: true,
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
    const fetchParkingInfo = async () => {
      const parkingNotis = await getParkingBookingsNotification();
      const myNotis = parkingNotis.filter((noti) => {
        return noti.userId === currentUser.uid;
      });
      setParkingNotifications(myNotis);
      setLoading((prev) => ({
        ...prev,
        parking: false,
      }));
    };
    if (currentUser) {
      getRoomNotifications();
      fetchNotifications();
      fetchRentalInfo();
      fetchParkingInfo();
    }
  }, [currentUser, activeTab]);

  const handleDelete = async (notificationId, collectionNotification) => {
    try {
      setDeletingId(notificationId);
      await deleteNotification(notificationId, collectionNotification);
      toast.success(NOTIFICATIONS.NOTIFICATION_DELETED);
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
      setParkingNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "food-orders" && (
        <UserFoodNotification
          handleDelete={handleDelete}
          notifications={foodNotifications}
          loading={loading}
          deletingId={deletingId}
        />
      )}
      {activeTab === "rental-orders" && (
        <div>
          <UserRentalNotifications
            rentalVehicles={rentalVehicles}
            handleDelete={handleDelete}
            loading={loading}
            deletingId={deletingId}
          />
        </div>
      )}
      {activeTab === "room-bookings" && (
        <div>
          <UserControlsRoom
            roomNotifications={roomNotifications}
            handleDelete={handleDelete}
            loading={loading}
            deletingId={deletingId}
          />
        </div>
      )}
      {activeTab === "hall-bookings" && (
        <div>
          <UserControlsHall handleDelete={handleDelete} />
        </div>
      )}
      {activeTab === "parking-bookings" && (
        <div>
          <UserControlsParking
            parkingNotifications={parkingNotifications}
            handleDelete={handleDelete}
            loading={loading}
            deletingId={deletingId}
          />
        </div>
      )}
    </div>
  );
};

export default UserNotifications;