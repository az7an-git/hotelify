import React, { useEffect, useState } from 'react'
import { getRentalVehicles, sendRentalNotification, updateRentalOrderStatus } from '../../services/vehicleRentalService'
import Loader from '../common/loader/Loader';

function AdminControls() {
    const [appliedVehicles , setAppliedVehicles] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicleRentalInfo = async () => {
            const rentalVehicles = await getRentalVehicles();
             setAppliedVehicles(rentalVehicles);
             setLoading(false);
        }
        fetchVehicleRentalInfo();
    }, []);


    const handleStatusChange = async (orderId, userId, newStatus, orderedItems, userName, bookedFrom, bookedUntil) => {
        await updateRentalOrderStatus(orderId, newStatus);
    
        const notificationMessage = {
          accepted: 'Your order has been accepted!',
          rejected: 'Your order has been rejected.',
          delivered: 'Your order has been delivered!',
        };
    
        await sendRentalNotification(userId, notificationMessage[newStatus], orderedItems, userName, bookedFrom, bookedUntil );
        setAppliedVehicles((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus, } : order
          )
        );
      };
  return (
    loading ? <Loader msg={"Fetching Rental Notifications"} /> :
    <div className="space-y-6 p-6 flex justify-between items-center flex-wrap">
    {appliedVehicles &&
      appliedVehicles.map((vehicle, i) => (
        vehicle.status !== 'delivered' && vehicle.status !== 'rejected' && (
          <div
            key={i}
            className="p-5 border-l-4 border-blue-500 bg-white rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Booking from <span className='italic capitalize'>{vehicle.name}</span></h3>
            <div className="text-gray-600 mb-4">
              <p className="flex items-center space-x-4">
                <span className="font-medium text-blue-700">Vehicle Name:</span>
                <span>{vehicle.vehicleName}</span>
              </p>
              <p className="flex items-center space-x-4">
                <span className="font-medium text-blue-700">Booked From:</span>
                <span>{vehicle.startDate}</span>
              </p>
              <p className="flex items-center space-x-4">
                <span className="font-medium text-blue-700">Booked Until:</span>
                <span>{vehicle.endDate}</span>
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              {vehicle.status !== 'accepted' ? (
                <>
                  <button
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'accepted', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                    className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold transition duration-200 transform hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring focus:ring-green-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'rejected', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold transition duration-200 transform hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring focus:ring-red-200"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'delivered', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold transition duration-200 transform hover:bg-blue-600 hover:scale-110 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        )
      ))
    }
  </div>
  )
}

export default AdminControls
