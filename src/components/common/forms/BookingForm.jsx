import React, { useEffect, useState } from 'react'
import { inputStyles } from '../../registrations/FoodRegistration';
// import { newDate } from 'react-datepicker/dist/date_utils';

function BookingForm({handleBooking, name, setName, contact, setContact, cnic, setCnic, startDate, setStartDate, endDate, setEndDate, totalRate, loading}) {
  const [today, setToday] = useState("");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; 
    setToday(formattedDate);
  }, []);
  return (
    <form onSubmit={handleBooking} className="mt-4  flex flex-col justify-center items-center w-full">
    <input
      type="text"
      value={name}
      onChange={(e) => {
      const value = e.target.value;
      if(value.length <=15){
      setName(e.target.value);
      }
      }}
      placeholder="Name"
      className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
    />
    <input
      type="number"
      value={contact}
      onChange={(e) => {
        const value = e.target.value;
        if(value.length <= 11){
       setContact(e.target.value);
        }
      }     
       }
      placeholder="Contact Number"
      className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
    />
     <input
      type="number"
      value={cnic}
      onChange={(e) => {
        const value = e.target.value;
      if(value.length <= 13){
      setCnic(e.target.value)}
      }
      }     
      placeholder="Your Cnic no hyphens(-)"
      className={`w-full p-2 mb-2 border rounded ${inputStyles}`}
    />
    <input
      type="date"
      value={startDate}
      onChange={(e) => {
        setStartDate(e.target.value);
      //   calculateTotalRate();
      }}
      className={`w-full p-2 mb-2 border rounded ${inputStyles} `}
      max={endDate}
      min={today}
    />
    <input
      type="date"
      value={endDate}
      onChange={(e) => {
        setEndDate(e.target.value);
      }}
      className={`w-full p-2 mb-2 border rounded ${inputStyles} `}
     min={startDate}
    />
    <div>
      <p className='font-bold'>Total: ${totalRate}</p>
    </div>
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-slate-950 px-6 py-2.5 rounded-full font-bold transition duration-200 disabled:opacity-50 w-full flex items-center justify-center gap-2 mt-4"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Applying...</span>
        </>
      ) : "Apply Booking"}
    </button>
  </form>
  )
}

export default BookingForm
