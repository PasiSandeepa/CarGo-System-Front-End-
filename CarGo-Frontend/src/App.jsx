import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicle from './pages/Vehicle';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'ADMIN' || user.email === 'pasisandeepa456@gmail.com') {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar notifications={[]} />

      <div style={{ marginTop: '70px', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehicles" element={<Vehicle />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<div className="container mt-5"><h2>About Us</h2></div>} />

       
          <Route 
            path="/admin-dashboard" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          
       
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;