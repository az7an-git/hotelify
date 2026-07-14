import React, { useEffect, useState } from 'react'
import { getRentalVehicles, sendRentalNotification, updateRentalOrderStatus } from '../../services/vehicleRentalService'
import Loader from '../common/loader/Loader';

let rentalVehiclesCache = null;

function AdminControls({ isActive }) {
    const [appliedVehicles , setAppliedVehicles] = useState(rentalVehiclesCache || []);
    const [loading, setLoading] = useState(!rentalVehiclesCache);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        const fetchVehicleRentalInfo = async () => {
            if (!rentalVehiclesCache) {
                setLoading(true);
            }
            const rentalVehicles = await getRentalVehicles();
            rentalVehiclesCache = rentalVehicles;
            setAppliedVehicles(rentalVehicles);
            setLoading(false);
        }
        if (isActive) {
            fetchVehicleRentalInfo();
        }
    }, [isActive]);


    const handleStatusChange = async (orderId, userId, newStatus, orderedItems, userName, bookedFrom, bookedUntil, actionKey) => {
        try {
            setProcessingId(`${orderId}-${actionKey}`);
            await updateRentalOrderStatus(orderId, newStatus);
        
            const notificationMessage = {
              accepted: 'Your order has been accepted!',
              rejected: 'Your order has been rejected.',
              delivered: 'Your order has been delivered!',
            };
        
            await sendRentalNotification(userId, notificationMessage[newStatus], orderedItems, userName, bookedFrom, bookedUntil );
            
            const updatedVehicles = appliedVehicles.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            );
            rentalVehiclesCache = updatedVehicles;
            setAppliedVehicles(updatedVehicles);
        } catch (error) {
            console.error(error);
        } finally {
            setProcessingId(null);
        }
      };
  const activeVehicles = appliedVehicles.filter(
    (vehicle) => vehicle.status !== 'delivered' && vehicle.status !== 'rejected'
  );

  return loading ? (
    <Loader msg={"Fetching Rental Notifications"} />
  ) : (
    <div className="p-6">
      {activeVehicles.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No rental vehicle bookings pending action.
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {activeVehicles.map((vehicle, i) => (
            <div
              key={vehicle.id || i}
              className="glass-card p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-3">Booking from <span className='italic capitalize text-amber-700'>{vehicle.name}</span></h3>
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
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'accepted', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "accept")}
                      className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${vehicle.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'rejected', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "reject")}
                      className="flex-1 px-4 py-2 bg-rose-500 hover:bg-rose-450 text-slate-800 rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-rose-500/10 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${vehicle.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                ) : (
                  <button
                    disabled={!!processingId}
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'delivered', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "deliver")}
                    className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold transition duration-200 transform active:scale-95 text-xs shadow-md shadow-amber-500/10 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {processingId === `${vehicle.id}-deliver` ? "Processing..." : "Mark as Delivered"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminControls;
