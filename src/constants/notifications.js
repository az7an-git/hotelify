export const NOTIFICATIONS = {
  // Bookings
  ROOM_BOOKING_SUCCESS: "Booking request sent successfully!",
  ROOM_BOOKING_ERROR: "Failed to book room.",
  ROOM_BOOKING_LOGIN_REQUIRED: "Please log in to book a room",
  VEHICLE_BOOKING_SUCCESS: "Booking requested successfully!",
  VEHICLE_BOOKING_ERROR: "Failed to book vehicle.",
  VEHICLE_BOOKING_LOGIN_REQUIRED: "Please log in to apply for vehicle rental",
  HALL_BOOKING_SUCCESS: "Booking request sent!",
  HALL_BOOKING_LOGIN_REQUIRED: "Please log in to book",
  HALL_BOOKING_ERROR: "Failed to book hall. Please try again.",
  PARKING_BOOKING_SUCCESS: "Parking spot booked successfully!",
  PARKING_BOOKING_ERROR: "Failed to book parking spot. Please try again.",
  PARKING_BOOKING_LOGIN_REQUIRED: "Please log in to book a parking spot.",
  PARKING_BOOKING_DATES_REQUIRED: "Please select both start and end dates.",

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

  // Authentication
  AUTH_LOGIN_SUCCESS: "Logged in successfully!",
  AUTH_SIGNUP_SUCCESS: "Signed up successfully!",
  AUTH_LOGOUT_SUCCESS: "Logged out successfully!",
  AUTH_LOGOUT_ERROR: (msg) => `Logout failed: ${msg}`,
};

export const AUTH_ERRORS = {
  "auth/invalid-credential": "Invalid email or password. Please try again.",
  "auth/user-not-found": "No account matches this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/email-already-in-use": "This email address is already in use by another account.",
  "auth/weak-password": "Password is too weak. It must be at least 6 characters long.",
  "auth/too-many-requests": "Too many failed attempts. Access has been temporarily disabled. Please try again later.",
  DEFAULT: "Authentication failed. Please check your details and try again.",
};
