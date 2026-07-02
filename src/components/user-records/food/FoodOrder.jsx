import React from "react";
import { FaDownload } from "react-icons/fa";
import { downloadRecordPDF, formatTimestamp } from "../RecordPDF";

function FoodOrder({ bookingFields, bookings, activeTab }) {
  const handleDownload = (booking) => {
    downloadRecordPDF(booking, activeTab, bookingFields);
  };

  return (
    <div className="w-full overflow-x-auto element">
    <table className="w-full border-collapse border border-gray-200 text-center">
      <thead>
        <tr>
        <th className="border border-gray-300  py-2">Name</th>
        <th className="border border-gray-300  py-2">Status</th>
          <th className="border border-gray-300  py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2 w-1/2 ">Items</th>
          <th className="border border-gray-300 px-4 py-2">Download</th>
        </tr>
      </thead>
      <tbody className="w-full max-sm:text-sm">
      
        {bookings.map((booking, index) => (
          <tr className="w-full" key={index}>
          <td className="border border-gray-300  space-x-4  capitalize element ">
            {booking.name ? 
            <span>{booking.name}</span> :
            <span>N/A</span>            
            }
            </td>
            <td className="border border-gray-300  space-x-4 capitalize   element">
            {booking.status       
            }
            </td>        
            <td className="border border-gray-300 py-2 text-center">
              {booking.applyDate?.seconds
                ? formatTimestamp(booking.applyDate)
                : booking.applyDate?.toString() || "N/A"}
            </td>
            <td className="w-[50%] border border-gray-300  space-x-4 text-start overflow-x-scroll element">
              {booking.items &&
                booking.items.map((item, i) => (
                  <ul
                    key={i}
                    className="flex justify-center items-center px-1 capitalize max-md:flex-wrap "
                  >
                    <li title="name" className="font-semibold text-start">{item.name}</li>
                    <li title="category" className="text-teal-800">{item.category}</li>
                    <li title="Quantity" className="text-gray-800">{item.quantity}</li>
                    <li title="price per item" className="italic text-green-800">{item.price}$</li>
                  </ul>
                ))}
            </td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <button
                className="px-2 py-1 bg-green-500 text-slate-800 rounded hover:bg-green-600"
                onClick={() => handleDownload(booking)}
              >
                <FaDownload />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default FoodOrder;