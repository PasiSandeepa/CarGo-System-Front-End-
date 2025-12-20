import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/1.webp";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserLoggedIn(false);
        setIsAdmin(false);
        navigate('/login');
    };

    const commonLinks = [
        { name: "Home", path: "/" },
        { name: "Vehicles", path: "/vehicles" },
        { name: "About", path: "/about" },
    ];

    const adminOnlyLinks = [
        { name: "Services", path: "/service" },
        { name: "Customers", path: "/customers" },
        { name: "Payment", path: "/payment" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow py-1 fixed-top">
       
            <div className="container-fluid px-lg-5"> 
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img src={logo} alt="logo" width="55" height="55" className="rounded me-3 shadow-sm" />
                    <span className="h3 text-info mb-0" style={{ fontWeight: '700' }}>CarGo</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                        {commonLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 ${location.pathname === link.path ? "text-warning" : "text-white"}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {userLoggedIn && isAdmin && adminOnlyLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link to={link.path} className={`nav-link px-3 ${location.pathname === link.path ? "text-warning" : "text-white"}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {userLoggedIn && isAdmin && (
                            <li className="nav-item ms-lg-2">
                                <Link className="btn btn-warning btn-sm fw-bold px-3 mt-1" to="/add-car">+ ADD CAR</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                        {!userLoggedIn ? (
                            <>
                                <Link to="/login" className="btn btn-outline-info btn-sm fw-bold">Login</Link>
                                <Link to="/register" className="btn btn-warning btn-sm fw-bold">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/my-bookings" className="btn btn-outline-warning btn-sm fw-bold text-white me-2">
                                    <i className="bi bi-calendar-check me-1"></i> My Bookings
                                </Link>
                                
                                <button className="btn btn-secondary btn-sm fw-bold text-white">
                                    Profile {isAdmin && <span className="badge bg-danger ms-1">ADMIN</span>}
                                </button>
                                
                                <button className="btn btn-outline-danger btn-sm fw-bold" onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;