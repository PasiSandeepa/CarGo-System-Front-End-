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
            <div className="container"> {/* මෙතැනින් අන්තර්ගතය මැදට ගෙන width එක පාලනය කරයි */}
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <img src={logo} alt="logo" width="50" height="50" className="rounded-circle me-2 border border-info" />
                    <span className="h4 text-info mb-0" style={{ letterSpacing: '1px', fontWeight: '800' }}>CarGo</span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
                        {commonLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link
                                    to={link.path}
                                    // මෙහි text-white සහ fw-bold (bold font) භාවිතා කර ඇත
                                    className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-warning active" : "text-white"}`}
                                    style={{
                                        transition: '0.3s',
                                        // අකුරු වල පැහැය තවත් තදින් පෙන්වීමට සියුම් shadow එකක් (Optional)
                                        textShadow: location.pathname === link.path ? 'none' : '0px 0px 1px rgba(255,255,255,0.3)'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {userLoggedIn && isAdmin && adminOnlyLinks.map((link) => (
                            <li className="nav-item" key={link.name}>
                                <Link
                                    to={link.path}
                                    // මෙතැනත් text-white භාවිතා කර ඇත
                                    className={`nav-link px-3 fw-bold small text-uppercase ${location.pathname === link.path ? "text-warning" : "text-white"}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {/* Admin ලින්ක්ස් වෙනම කැපී පෙනෙන සේ සකසා ඇත */}
                        {userLoggedIn && isAdmin && (
                            <Link
                                to="/admin-dashboard"
                                className="nav-link text-info fw-bold small px-2 d-flex align-items-center"
                            >
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
                                <Link to="/my-bookings" className="btn btn-sm btn-outline-warning px-3 rounded-pill fw-bold">
                                    Bookings
                                </Link>

                                <div className="dropdown">
                                    <button className="btn btn-sm btn-secondary dropdown-toggle rounded-pill px-3 fw-bold" type="button" data-bs-toggle="dropdown">
                                        User {isAdmin && <span className="badge bg-danger ms-1">ADMIN</span>}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                        <li><hr className="dropdown-item-divider" /></li>
                                        <li><button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;