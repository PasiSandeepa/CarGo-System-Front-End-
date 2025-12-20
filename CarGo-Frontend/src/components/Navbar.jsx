import React, { useState, useEffect } from "react"; // 1. useEffect එකතු කළා
import { Link, useLocation, useNavigate } from "react-router-dom"; // 2. useNavigate එකතු කළා
import logo from "../assets/1.webp";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar({ notifications }) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [location]);


    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserLoggedIn(false);
        navigate('/login');
    };

    const links = [
        { name: "Home", path: "/" },
        { name: "Vehicles", path: "/vehicles" },
        { name: "Bookings", path: "/bookings" },
        { name: "Customers", path: "/customers" },
        { name: "About", path: "/about" },
        { name: "Payment", path: "/payment" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow py-1 fixed-top">
            <div className="container d-flex align-items-center">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img src={logo} alt="logo" width="60" height="60" className="rounded me-3 shadow-sm" />
                    <span className="h3 text-info mb-0" style={{ fontWeight: '700' }}>CarGo</span>
                </Link>

                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-3 mb-lg-0 fw-bold">
                        {links.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link fw-bold px-3 ${location.pathname === link.path ? "text-warning" : "text-white"}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}


                        {userLoggedIn && (
                            <li className="nav-item ms-lg-3">
                                <Link className="btn btn-warning fw-bold px-3 shadow-sm" to="/add-car">+ ADD CAR</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                        {!userLoggedIn ? (
                            <>
                                <Link to="/login" className="btn btn-outline-info fw-bold">Login</Link>
                                <Link to="/register" className="btn btn-warning fw-bold">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/my-bookings" className="btn btn-outline-warning fw-bold text-white me-2">
                                    <i className="bi bi-calendar-check me-1"></i> My Bookings
                                </Link>
                                <button className="btn btn-secondary fw-bold text-white">My Profile</button>
                                <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;