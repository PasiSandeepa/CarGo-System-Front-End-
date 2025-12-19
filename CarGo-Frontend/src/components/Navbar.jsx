import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";



function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 w-100 mt-auto shadow-lg border-top border-secondary">
            <div className="container-fluid px-lg-5">
                <div className="row g-4">
                  
                    <div className="col-lg-4 col-md-6">
                        <h3 className="fw-bold text-info mb-3">CarGo</h3>
                        <p className="text-white small pe-lg-5 opacity-75">
                            Sri Lanka's leading vehicle rental service. You can reliably get any luxury or standard vehicle you need from us.
                        </p>
                        <div className="d-flex gap-2 mt-3">
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaFacebookF /></a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaInstagram /></a>
                            <a href="#" className="btn btn-outline-light btn-sm rounded-circle"><FaWhatsapp /></a>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h6 className="text-uppercase fw-bold mb-3 text-white">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2">
                                <a href="/home" className="text-white opacity-75 text-decoration-none hover-opacity-100">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="/vehicles" className="text-white opacity-75 text-decoration-none hover-opacity-100">Vehicles</a>
                            </li>
                            <li className="mb-2">
                                <a href="/bookings" className="text-white opacity-75 text-decoration-none hover-opacity-100">My Bookings</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="text-white opacity-75 text-decoration-none hover-opacity-100">About Us</a>
                            </li>
                        </ul>
                    </div>
                
                    <div className="col-lg-3 col-md-6">
                  
                        <h6 className="text-uppercase fw-bold mb-3 text-white">Contact Us</h6>

              
                        <ul className="list-unstyled small text-white">
                            <li className="mb-2 opacity-75">
                                <FaMapMarkerAlt className="me-2 text-primary" /> No. 123, Galle Road, Colombo 03.
                            </li>
                            <li className="mb-2 opacity-75">
                                <FaPhoneAlt className="me-2 text-primary" /> +94 112 345 678
                            </li>
                            <li className="mb-2 opacity-75">
                                <FaEnvelope className="me-2 text-primary" /> info@cargo.lk
                            </li>
                        </ul>
                    </div>


                </div>

                <hr className="bg-secondary mt-5 mb-4 opacity-25" />
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                
                        <p className="mb-0 text-white opacity-100 small">
                            © 2025 CarGo Rentals. All Rights Reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                   
                        <a href="#" className="text-white text-decoration-none small me-3 opacity-75 hover-opacity-100">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-white text-decoration-none small opacity-75 hover-opacity-100">
                            Terms of Service
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;