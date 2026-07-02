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
            className="p-6 border border-white/60/80 bg-white/40 backdrop-blur-md shadow-sm border border-white/50 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-slate-700/60 max-w-sm w-full"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-3">Booking from <span className='italic capitalize text-blue-600'>{vehicle.name}</span></h3>
            <div className="text-slate-600 font-medium text-sm space-y-2 mb-4">
              <p className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Vehicle Name:</span>
                <span className="text-slate-700">{vehicle.vehicleName}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Booked From:</span>
                <span className="text-slate-700">{vehicle.startDate}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="font-semibold text-slate-600">Booked Until:</span>
                <span className="text-slate-700">{vehicle.endDate}</span>
              </p>
            </div>

            <div className="flex gap-3 mt-4 pt-3 border-t border-white/60/60">
              {vehicle.status !== 'accepted' ? (
                <>
                  <button
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'accepted', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                    className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-emerald-500/10"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'rejected', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                    className="flex-1 px-4 py-2 bg-rose-500 hover:bg-rose-450 text-slate-800 rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-rose-500/10"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'delivered', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate)}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-slate-950 rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-teal-500/10"
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
