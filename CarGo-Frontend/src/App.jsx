import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicle from './pages/Vehicle';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard'; 
import MyBookings from './pages/MyBooking';
import FAQ from './pages/Faq';
import About from './pages/About';
import Contact from './pages/Contact'; 
import Services from './pages/Service';
import Customer from './pages/Customer';
import Payment from './pages/Payment';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      
      const adminStatus = user.role === 'ADMIN' || user.email === 'pasisandeepa456@gmail.com' || user.id === 5;
      setIsAdmin(adminStatus);
    } else {
      setIsAdmin(false);
    }
  }, [location]); 

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ marginTop: '70px', flex: 1 }}>
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Services />} />

          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/my-payments" element={<Payment />} />

        
          <Route 
            path="/admin-dashboard" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/customer" 
            element={isAdmin ? <Customer /> : <Navigate to="/" />} 
          />
          <Route 
            path="/payment-admin" 
            element={isAdmin ? <Payment /> : <Navigate to="/" />} 
          />

          {/* Not Found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;