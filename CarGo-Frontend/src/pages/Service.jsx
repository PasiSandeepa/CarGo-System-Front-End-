import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {

    const [selectedService, setSelectedService] = useState(null);

    const servicesList = [
        {
            id: 1,
            title: "Vehicle Rental",
            longDescription: "We offer a wide range of vehicles from economy cars to luxury SUVs. Our rental process is simple, with options for self-drive or chauffeur-driven services. All vehicles are GPS-enabled and fully insured.",
            description: "Flexible luxury and budget car rental options for short-term or long-term needs.",
            icon: "bi-car-front",
            color: "bg-primary"
        },
        {
            id: 2,
            title: "Maintenance & Repair",
            longDescription: "Our service center is equipped with modern diagnostic tools. We handle everything from routine oil changes and brake repairs to complex engine overhauls by certified mechanics.",
            description: "Comprehensive vehicle servicing, including engine diagnostics and professional repairs.",
            icon: "bi-tools",
            color: "bg-danger"
        },
        {
            id: 3,
            title: "Airport Pickup & Drop",
            longDescription: "Never miss a flight with our punctual airport transfer service. We track your flight status in real-time to ensure timely pickups and drops at BIA and other local airports.",
            description: "Reliable 24/7 airport transfer services. Prompt arrivals and comfortable rides.",
            icon: "bi-airplane-engines",
            color: "bg-info"
        },
        {
            id: 4,
            title: "Island-wide Tours",
            longDescription: "Explore the beauty of Sri Lanka with our custom tour packages. Whether it's the beaches of the south or the hills of Nuwara Eliya, our guides ensure a safe and memorable trip.",
            description: "Tailor-made tour packages across Sri Lanka with experienced English-speaking drivers.",
            icon: "bi-map",
            color: "bg-success"
        },
        {
            id: 5,
            title: "Chauffeur Services",
            longDescription: "Our drivers are professionally trained, multilingual, and possess deep knowledge of local routes. Perfect for corporate travel, weddings, or long-distance journeys.",
            description: "Professional and well-disciplined drivers for your daily corporate or private needs.",
            icon: "bi-person-badge",
            color: "bg-dark"
        },
        {
            id: 6,
            title: "Vehicle Insurance",
            longDescription: "Protect your asset with our comprehensive insurance solutions. We partner with leading providers to give you the best premiums and hassle-free claim settlements.",
            description: "Easy vehicle insurance renewals and claims assistance to ensure your vehicle is protected.",
            icon: "bi-shield-check",
            color: "bg-warning"
        },
        {
            id: 7,
            title: "Roadside Assistance",
            longDescription: "Stuck on the road? Our 24/7 emergency team provides towing, flat tire changes, battery jump-starts, and fuel delivery anywhere in the island.",
            description: "Emergency breakdown support, including towing and on-site minor repairs anytime.",
            icon: "bi-ev-station",
            color: "bg-secondary"
        },
        {
            id: 8,
            title: "Fleet Management",
            longDescription: "Optimize your business operations with our fleet management software. Track fuel consumption, maintenance schedules, and real-time driver behavior.",
            description: "Comprehensive solutions for corporate clients to manage their vehicle fleets efficiently.",
            icon: "bi-speedometer2",
            color: "bg-primary"
        }
    ];

    return (
        <>
            <Navbar />

        
            <div className="services-hero bg-dark text-white py-5 mt-5">
                <div className="container text-center py-5">
                    <h1 className="display-3 fw-bold mb-3">Our <span className="text-info">Services</span></h1>
                    <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
                        Your trusted partner in premium vehicle management and travel solutions.
                        Reliable, safe, and professional services tailored to your journey.
                    </p>
                </div>
            </div>

            <div className="container py-5 my-5">
                <div className="row g-4">
                    {servicesList.map((service) => (
                        <div className="col-md-6 col-lg-4" key={service.id}>
                            <div className="card h-100 border-0 shadow-sm p-4 text-center service-card transition">
                                <div className={`icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center ${service.color} text-white`}
                                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                                    <i className={`bi ${service.icon}`}></i>
                                </div>
                                <h4 className="fw-bold mb-3">{service.title}</h4>
                                <p className="text-muted mb-4">{service.description}</p>
                                <button
                                    className="btn btn-outline-info rounded-pill px-4 mt-auto"
                                    onClick={() => setSelectedService(service)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#serviceModal"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="modal fade" id="serviceModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">{selectedService?.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center pb-5">
                            <div className={`icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center ${selectedService?.color} text-white`}
                                style={{ width: '70px', height: '70px', fontSize: '1.5rem' }}>
                                <i className={`bi ${selectedService?.icon}`}></i>
                            </div>
                            <p className="px-3 text-muted">{selectedService?.longDescription}</p>
                          
                        </div>
                    </div>
                </div>
            </div>

       
            <div className="bg-light py-5">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                            <img src="https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Car Management"
                                className="img-fluid rounded-4 shadow" />
                        </div>
                        <div className="col-lg-6 ps-lg-5">
                            <h2 className="fw-bold mb-4 text-dark">Why Choose Our Fleet?</h2>
                            <ul className="list-unstyled">
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-info me-3 mt-1 fs-5"></i>
                                    <div><strong>Modern Fleet:</strong> Well-maintained, latest models for your safety.</div>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-info me-3 mt-1 fs-5"></i>
                                    <div><strong>Professional Drivers:</strong> Background-checked and highly experienced.</div>
                                </li>
                                <li className="mb-3 d-flex align-items-start">
                                    <i className="bi bi-check-circle-fill text-info me-3 mt-1 fs-5"></i>
                                    <div><strong>Transparent Pricing:</strong> No hidden costs, best rates guaranteed.</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

  

            <style jsx>{`
                .service-card {
                    transition: transform 0.3s ease, shadow 0.3s ease;
                }
                .service-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
                }
                .transition {
                    transition: all 0.3s;
                }
            `}</style>
        </>
    );
};

export default Services;