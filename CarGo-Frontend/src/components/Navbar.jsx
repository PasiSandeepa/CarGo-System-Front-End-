import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/1.webp"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Swal from 'sweetalert2';

function Navbar({ notifications }) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserLoggedIn(true);
            if (user.role === 'ADMIN' || user.email === 'pasisandeepa456@gmail.com') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } else {
            setUserLoggedIn(false);
            setIsAdmin(false);
        }

        const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
        const dropdownList = [...dropdownElementList].map(el => new bootstrap.Dropdown(el));
        
    }, [location]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0dcaf0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear(); 
                setUserLoggedIn(false);
                setIsAdmin(false);
                navigate('/login');
            }
        });
    };

    const commonLinks = [
        { name: "Home", path: "/" },
        { name: "Vehicles", path: "/vehicles" },
        { name: "Services", path: "/service" },
        { name: "FAQ", path: "/faq" },
        { name: "About", path: "/about" },
    ];

    const adminOnlyLinks = [
        { name: "Customers", path: "/customers" },
        { name: "Payment", path: "/payment" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-2 fixed-top" style={{ borderBottom: '2px solid #0dcaf0' }}>
            <div className="container">
                {/* Logo Section */}
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img src={logo} alt="CarGo Logo" width="50" height="50" className="rounded-circle me-2 border border-info" style={{ objectFit: 'cover' }} />
                    <span className="h4 text-info mb-0" style={{ letterSpacing: '1px', fontWeight: '800' }}>CarGo</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navContent">
                    {/* ms-5 භාවිතා කර මෙනු එක Logo එක දෙසට (වමට) ලං කරන ලදී */}
                    <ul className="navbar-nav ms-5 mb-2 mb-lg-0 gap-1">
                        {commonLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-warning active" : "text-white"}`}>{link.name}</Link>
                            </li>
                        ))}
                        {userLoggedIn && isAdmin && adminOnlyLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-warning" : "text-white"}`}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>

                    {/* දකුණු පස ඇති Buttons සහ Profile කොටස */}
                    <div className="ms-auto d-flex align-items-center gap-2">
                        {userLoggedIn && isAdmin && (
                            <Link to="/admin-dashboard" className="nav-link text-info fw-bold small px-2 d-flex align-items-center">
                                <i className="bi bi-speedometer2 me-1"></i> DASHBOARD
                            </Link>
                        )}

                        {!userLoggedIn ? (
                            <div className="d-flex gap-2">
                                <Link to="/login" className="btn btn-sm btn-outline-info px-4 fw-bold rounded-pill">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-info px-4 fw-bold rounded-pill text-dark">Register</Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-2">
                                
                                {userLoggedIn && !isAdmin && (
                                    <Link to="/my-bookings" className="btn btn-sm btn-outline-warning px-3 rounded-pill fw-bold">
                                        MyBookings
                                    </Link>
                                )}

                                <div className="dropdown">
                                    <button 
                                        className="btn btn-sm btn-secondary dropdown-toggle rounded-pill px-3 fw-bold" 
                                        type="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                    >
                                        User {isAdmin && <span className="badge bg-danger ms-1">ADMIN</span>}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                        <li><Link className="dropdown-item fw-bold rounded" to="/profile">Profile</Link></li>
                                    </ul>
                                </div>

                                <button 
                                    className="btn btn-sm btn-danger rounded-pill px-3 fw-bold ms-1" 
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i> Logout
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