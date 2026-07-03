export const NOTIFICATIONS = {
  // Bookings
  ROOM_BOOKING_SUCCESS: "Booking request sent successfully!",
  ROOM_BOOKING_LOGIN_REQUIRED: "Please log in to book a room",
  VEHICLE_BOOKING_SUCCESS: "Booking requested successfully!",
  VEHICLE_BOOKING_LOGIN_REQUIRED: "Please log in to apply for vehicle rental",
  HALL_BOOKING_SUCCESS: "Booking request sent!",
  HALL_BOOKING_LOGIN_REQUIRED: "Please log in to book",
  HALL_BOOKING_ERROR: "Failed to book hall. Please try again.",

  // Registrations (Admin)
  ROOM_REG_SUCCESS: "Room added successfully!",
  ROOM_REG_FIELDS_REQUIRED: "Please fill out all the fields",
  VEHICLE_REG_SUCCESS: "Vehicle added successfully!",
  PARKING_REG_SUCCESS: "Parking spot added successfully!",
  HALL_REG_SUCCESS: "Wedding Hall registered successfully!",
  FOOD_REG_SUCCESS: (name) => `Successfully added ${name}!`,

  // Food Orders
  FOOD_ORDER_SUCCESS: "Order placed successfully!",
  FOOD_ORDER_EMPTY: "Please add items to your order.",
  FOOD_ORDER_ERROR: "Something went wrong. Please try again!",
  FOOD_ORDER_FIELDS_REQUIRED: "Fill all the details, please!",

  // User Notifications
  NOTIFICATION_DELETED: "Notification deleted successfully!",

  // Reports
  REPORTS_DATE_REQUIRED: "Please select both start and end dates.",
};
