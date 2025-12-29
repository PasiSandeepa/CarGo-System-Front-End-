import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/1.webp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function Navbar() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isNotifyOpen, setIsNotifyOpen] = useState(false);
    const dropdownRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const fetchNotifications = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/notifications/customer/${userId}`);
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications", error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/v1/notifications/read/${id}`);
            if (currentUser?.id) {
                fetchNotifications(currentUser.id); 
            }
        } catch (error) {
            console.error("Error marking as read", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsNotifyOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setCurrentUser(user);
            setUserLoggedIn(true);
            const adminStatus = user.role === 'ADMIN' || user.email === 'pasisandeepa456@gmail.com' || user.id === 5;
            setIsAdmin(adminStatus);
            if (user.id) {
                fetchNotifications(user.id);
                const interval = setInterval(() => fetchNotifications(user.id), 15000); 
                return () => clearInterval(interval);
            }
        } else {
            setUserLoggedIn(false);
            setIsAdmin(false);
            setNotifications([]);
        }
    }, [location]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                setUserLoggedIn(false);
                setIsAdmin(false);
                setNotifications([]);
                navigate('/login');
            }
        });
    };

    const unreadNotifications = notifications.filter(n => n.state === 'UNREAD');
    const unreadCount = unreadNotifications.length;

    const commonLinks = [
        { name: "Home", path: "/" },
        { name: "Vehicles", path: "/vehicles" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/service" },
        { name: "Contact", path: "/contact" },
        { name: "FAQ", path: "/faq" },
        { name: "Payment", path: "/payment" }
    ];

    const adminOnlyLinks = [
        { name: "Customers", path: "/customer" }, 
        { name: "Payments", path: "/payment" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-2 fixed-top" style={{ borderBottom: '4px solid #04e3f7ff' }}>
            <div className="container-fluid px-lg-5">
                <Link className="navbar-brand fw-bold d-flex align-items-center me-0" to="/">
                    <img src={logo} alt="CarGo Logo" width="55" height="50" className="rounded-circle me-2 border border-info" />
                    <span className="h4 text-info mb-0" style={{ fontWeight: '800' }}>CarGo</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 ms-lg-4">
                        {commonLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-info active" : "text-white"}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {userLoggedIn && isAdmin && adminOnlyLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-warning" : "text-white"}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        {userLoggedIn && (
                            <span className="badge rounded-pill bg-success small px-3 py-2 text-uppercase fw-bold me-2" style={{ letterSpacing: '1px' }}>
                                <i className={`bi ${isAdmin ? 'bi-shield-lock-fill' : 'bi-person-fill'} me-1`}></i>
                                {isAdmin ? 'Admin' : 'User'}
                            </span>
                        )}

                        {userLoggedIn && (
                            <div className="position-relative" ref={dropdownRef}>
                                <button className="btn btn-dark position-relative p-2 rounded-circle border-0 shadow-none" type="button" onClick={() => setIsNotifyOpen(!isNotifyOpen)}>
                                    <i className={`bi bi-bell-fill fs-5 ${unreadCount > 0 ? 'text-warning' : 'text-secondary'}`}></i>
                                    {unreadCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {isNotifyOpen && (
                                    <div className="bg-white shadow-lg border mt-2 py-0" style={{ position: 'absolute', right: 0, width: '320px', borderRadius: '12px', zIndex: 3000, top: '50px', overflow: 'hidden' }}>
                                        <div className={`${isAdmin ? 'bg-success' : 'bg-info'} p-2 text-white text-center fw-bold small text-uppercase`}>
                                            <i className="bi bi-megaphone-fill me-2"></i>
                                            {isAdmin ? "Admin: New Bookings" : "User: Notifications"}
                                        </div>
                                        <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                                            {unreadCount === 0 ? (
                                                <div className="p-4 text-center small text-muted">
                                                    <i className="bi bi-check2-circle fs-3 d-block mb-2 text-success"></i>
                                                    No new notifications
                                                </div>
                                            ) : (
                                                unreadNotifications.map((note) => (
                                                    <div key={note.notificationId} className="p-3 border-bottom small bg-light fw-bold border-start border-4 border-info" style={{ cursor: 'pointer' }} onClick={() => handleMarkAsRead(note.notificationId)}>
                                                        <div className="text-dark mb-1" style={{ whiteSpace: 'normal', lineHeight: '1.4' }}>
                                                            {note.message}
                                                        </div>
                                                        <div className="text-muted d-flex align-items-center" style={{ fontSize: '0.7rem' }}>
                                                            <i className="bi bi-clock me-1"></i>
                                                            {new Date(note.sendDate).toLocaleString()}
                                                            <span className="ms-auto text-primary">Mark as read</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {!userLoggedIn ? (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-sm btn-outline-info px-4 rounded-pill fw-bold">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-warning px-4 rounded-pill fw-bold text-dark">Register</Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                              
                                {isAdmin && (
                                    <Link to="/admin-dashboard" className="btn btn-sm btn-outline-info px-3 rounded-pill fw-bold">
                                        <i className="bi bi-speedometer2 me-1"></i> Dashboard
                                    </Link>
                                )}
                                {!isAdmin && (
                                    <Link to="/my-bookings" className="btn btn-sm btn-outline-warning px-3 rounded-pill fw-bold">MyBookings</Link>
                                )}
                                <button className="btn btn-sm btn-danger rounded-pill px-3 fw-bold" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;