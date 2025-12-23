import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
    
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for reaching out. Our team will contact you shortly.',
            icon: 'success',
            confirmButtonColor: '#0dcaf0',
            timer: 3000
        });

        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <>
            <Navbar />
            <div className="contact-page pt-5 mt-5 bg-light min-vh-100">
             
                <div className="bg-dark text-white py-5 mb-5 shadow">
                    <div className="container text-center">
                        <h1 className="display-4 fw-bold text-info">Contact Us</h1>
                        <p className="lead">Got a question? We'd love to hear from you.</p>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row g-4">
             
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-info text-white">
                                <h3 className="fw-bold mb-4">Contact Info</h3>
                                
                                <div className="d-flex mb-4">
                                    <i className="bi bi-geo-alt-fill fs-3 me-3"></i>
                                    <div>
                                        <h6 className="fw-bold mb-0">Our Location</h6>
                                        <small>No. 456, Galle Road, Colombo 03, Sri Lanka.</small>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <i className="bi bi-telephone-fill fs-3 me-3"></i>
                                    <div>
                                        <h6 className="fw-bold mb-0">Phone Number</h6>
                                        <small>+94 11 234 5678</small>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <i className="bi bi-envelope-fill fs-3 me-3"></i>
                                    <div>
                                        <h6 className="fw-bold mb-0">Email Address</h6>
                                        <small>support@cargo.lk</small>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <h6 className="fw-bold mb-3">Follow Us</h6>
                                    <div className="d-flex gap-3">
                                        <i className="bi bi-facebook fs-4"></i>
                                        <i className="bi bi-instagram fs-4"></i>
                                        <i className="bi bi-whatsapp fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                   
                        <div className="col-lg-8">
                            <div className="card border-0 shadow rounded-4 p-4 p-md-5">
                                <h3 className="fw-bold mb-4 text-dark">Send us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small">Your Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control bg-light border-0 py-3" 
                                                placeholder="Enter your name" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                required 
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-bold small">Email Address</label>
                                            <input 
                                                type="email" 
                                                className="form-control bg-light border-0 py-3" 
                                                placeholder="name@example.com" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small">Subject</label>
                                        <input 
                                            type="text" 
                                            className="form-control bg-light border-0 py-3" 
                                            placeholder="How can we help?" 
                                            value={formData.subject}
                                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold small">Message</label>
                                        <textarea 
                                            className="form-control bg-light border-0 py-3" 
                                            rows="5" 
                                            placeholder="Describe your inquiry..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-info text-white fw-bold px-5 py-3 rounded-pill shadow-sm w-100 w-md-auto">
                                        Send Message <i className="bi bi-send-fill ms-2"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;