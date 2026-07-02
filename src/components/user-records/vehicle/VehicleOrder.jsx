import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { downloadRecordPDF, formatTimestamp } from '../RecordPDF';


function VehicleOrder({bookingFields, bookings, activeTab, }) {
     const handleDownload = (booking) => {
       downloadRecordPDF(booking, activeTab, bookingFields);
     };
      
  return (
    <div className="w-full overflow-x-auto element">
    <table className="w-full border-collapse border border-gray-200 text-center">
            <thead>
              <tr>
                {bookingFields[activeTab].map((field) => (
                  <th key={field} className="border border-gray-300 px-4 py-2 text-center">
                    {field}
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody
            className='w-full max-sm:text-sm'
            >
              {bookings.map((booking, index) => (
                <tr className='w-full' key={index}>
                  {bookingFields[activeTab].map((field) => (
             
                    <td key={field} className="border border-gray-300 capitalize">
                      {booking[field]?.seconds
                        ? formatTimestamp(booking[field])
                        : booking[field]?.toString() || "N/A"}
                    </td>
                  ))}
                
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
  )
}

export default VehicleOrder
