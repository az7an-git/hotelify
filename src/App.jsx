import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomBooking from './pages/RoomBooking';
import Parking from './pages/Parking';
import FoodOrder from './pages/FoodOrder';
import NotFound from './pages/NotFound';
import Auth from './components/common/auth/Index';
import UserNotificationsPage from './pages/UserNotificationsPage';
import VehicleRentalPage from './components/rental/VehicalRental';
import AdminNotificationsPage from './pages/AdminNotificationsPage';
import WeddingHallsPage from './pages/WeddingHallsPage';
import ChatAdminPage from './pages/ChatAdminPage';
import ChatUserPage from './pages/ChatUserPage';
import RegistrationPage from './pages/RegistrationPage';
import ReportsPage from './pages/ReportsPage';
import UserRecordsPage from './pages/UserRecordsPage';
import AdminRecordsPage from './pages/AdminRecordsPage';
import WelcomePage from './pages/WelcomePage';

import ImgLoader from './components/common/loader/ImgLoader';
import { Toaster } from 'sonner';
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  const Layout = React.lazy(() => import('./layout/Layout'));
  const Home = React.lazy(() => import('./pages/Home'));
  return (
    <Suspense fallback={<ImgLoader />}>
      <Toaster richColors position="top-right" />
      <SpeedInsights />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="room-booking" element={<RoomBooking />} />
            <Route path="parking" element={<Parking />} />
            <Route path="rental" element={<VehicleRentalPage />} />
            <Route path="food-order" element={<FoodOrder />} />
            <Route path="admin-notifications" element={<AdminNotificationsPage />} />
            <Route path="user-notifications" element={<UserNotificationsPage />} />
            <Route path="wedding-halls" element={<WeddingHallsPage />} />
            <Route path="user-chat" element={<ChatUserPage />} />
            <Route path="admin-chat" element={<ChatAdminPage />} />
            <Route path="registrations" element={<RegistrationPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="user-records" element={<UserRecordsPage />} />
            <Route path="admin-records" element={<AdminRecordsPage />} />
            <Route path="login" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
