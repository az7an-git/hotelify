import React, { useEffect, useState } from 'react'
import { getRentalVehicles, sendRentalNotification, updateRentalOrderStatus } from '../../services/vehicleRentalService'
import Loader from '../common/loader/Loader';

let rentalVehiclesCache = null;

function AdminControls({ isActive }) {
  const [appliedVehicles, setAppliedVehicles] = useState(rentalVehiclesCache || []);
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

      await sendRentalNotification(userId, notificationMessage[newStatus], orderedItems, userName, bookedFrom, bookedUntil);

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
    <div className="p-4 sm:p-6">
      {activeVehicles.length === 0 ? (
        <div className="text-center py-12 bg-white/40 backdrop-blur-md shadow-sm border border-white/60 rounded-2xl text-slate-600 font-bold text-sm sm:text-base max-w-md mx-auto animate-fade-in">
          No rental vehicle bookings pending action.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch w-full">
          {activeVehicles.map((vehicle, i) => (
            <div
              key={vehicle.id || i}
              className="glass-card p-6 rounded-2xl w-full h-full flex flex-col justify-between border border-gold-400/20 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Booking from <span className="text-amber-400 font-semibold">{vehicle.name}</span>
                  </h3>
                  <div className="text-sm space-y-2 mb-4 text-slate-300">
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Vehicle Name:</span>
                      <span className="text-slate-100 font-semibold">{vehicle.vehicleName}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked From:</span>
                      <span className="text-slate-100 font-semibold">{vehicle.startDate}</span>
                    </p>
                    <p className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-400">Booked Until:</span>
                      <span className="text-slate-100 font-semibold">{vehicle.endDate}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                {vehicle.status !== 'accepted' ? (
                  <>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'accepted', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "accept")}
                      className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${vehicle.id}-accept` ? "Processing..." : "Accept"}
                    </button>
                    <button
                      disabled={!!processingId}
                      onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'rejected', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "reject")}
                      className="flex-1 px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-rose-600/20 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {processingId === `${vehicle.id}-reject` ? "Processing..." : "Reject"}
                    </button>
                  </>
                ) : (
                  <button
                    disabled={!!processingId}
                    onClick={() => handleStatusChange(vehicle.id, vehicle.userId, 'delivered', vehicle.vehicleName, vehicle.name, vehicle.startDate, vehicle.endDate, "deliver")}
                    className="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition duration-200 active:scale-95 text-xs shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-wait"
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
