import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function About() {
    return (
        <>
            <Navbar />
            <div className="about-page pt-5 mt-5">

                <div className="bg-dark text-white py-5 mb-4 shadow">
                    <div className="container text-center">
                        <h1 className="display-4 fw-bold text-info">Driving Your Dreams</h1>
                        <p className="lead">Reliable, Affordable, and Fast Car Rental Services in Sri Lanka.</p>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row align-items-center">

                
                        <div className="col-lg-6 mb-4">
                            <img
                                src="https://imgcdn.zigwheels.vn/medium/gallery/exterior/9/958/honda-hr-v-18808.jpg"
                                alt="About CarGo"
                                className="img-fluid rounded-4 shadow-lg"
                            />
                        </div>

                        <div className="col-lg-6 ps-lg-5">
                            <h2 className="fw-bold mb-3 text-dark">Why Choose <span className="text-info">CarGo</span>?</h2>
                            <p className="text-muted border-start border-4 border-info ps-3">
                                CarGo is a leading vehicle rental service in Sri Lanka. Our mission is to provide
                                the perfect vehicle for every journey, ensuring safety, convenience, and peace of mind.
                            </p>

                            <div className="mt-4">

                                <div className="d-flex mb-4 p-2 rounded">
                                    <div className="bg-info text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                                        <i className="bi bi-shield-check fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">Fully Insured</h5>
                                        <p className="small text-muted mb-0">Every vehicle in our fleet is covered by comprehensive insurance for your safety.</p>
                                    </div>
                                </div>

                              
                                <Link to="/contact" className="text-decoration-none d-flex mb-4 p-2 rounded contact-link-hover" style={{ transition: '0.3s' }}>
                                    <div className="bg-primary text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                                        <i className="bi bi-clock-history fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1 text-dark">24/7 Support</h5>
                                        <p className="small text-muted mb-0">Our dedicated support team is available around the clock to assist you with any issues.</p>
                                    </div>
                                </Link>

             
                                <div className="d-flex mb-4 p-2 rounded">
                                    <div className="bg-success text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
                                        <i className="bi bi-wallet2 fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 className="fw-bold mb-1">Best Price Guaranteed</h5>
                                        <p className="small text-muted mb-0">We offer competitive pricing and flexible rental plans to suit every budget.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

          
                <div className="bg-light py-5 border-top border-bottom">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-3 col-6 mb-4">
                                <h2 className="fw-bold text-info mb-0">500+</h2>
                                <span className="text-muted text-uppercase small fw-bold">Happy Customers</span>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                                <h2 className="fw-bold text-info mb-0">50+</h2>
                                <span className="text-muted text-uppercase small fw-bold">Luxury Cars</span>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                                <h2 className="fw-bold text-info mb-0">10+</h2>
                                <span className="text-muted text-uppercase small fw-bold">Cities Covered</span>
                            </div>
                            <div className="col-md-3 col-6 mb-4">
                                <h2 className="fw-bold text-info mb-0">24/7</h2>
                                <span className="text-muted text-uppercase small fw-bold">Support Service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default About;