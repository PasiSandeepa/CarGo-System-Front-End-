import React from 'react';
import { FaQuestionCircle, FaCar, FaFileAlt, FaTimesCircle, FaRoad, FaHeadset } from 'react-icons/fa'; // Icons සඳහා

const FAQ = () => {
    const faqData = [
        {
            question: "How can I book a vehicle?",
            answer: "You can browse our 'Vehicles' section, select your preferred car, choose the start and end dates, and click 'Book Now'. You must be logged in to complete the booking.",
            icon: <FaCar className="me-2 text-primary" />
        },
        {
            question: "What documents are required for rental?",
            answer: "You will need a valid Driving License, a copy of your National Identity Card (NIC) or Passport, and a recent utility bill for address verification.",
            icon: <FaFileAlt className="me-2 text-primary" />
        },
        {
            question: "Can I cancel my booking?",
            answer: "Yes, you can cancel your booking through the 'My Bookings' section. However, cancellation fees may apply depending on how close you are to the pick-up date.",
            icon: <FaTimesCircle className="me-2 text-danger" />
        },
        {
            question: "Is there a mileage limit?",
            answer: "Most of our rentals come with a standard daily mileage limit. Any additional kilometers driven will be charged at a pre-defined rate.",
            icon: <FaRoad className="me-2 text-primary" />
        },
        {
            question: "24/7 Support / Emergencies?",
            answer: "Please contact our 24/7 emergency support line immediately. You can find the contact number on your booking confirmation.",
            icon: <FaHeadset className="me-2 text-success" />
        }
    ];

    return (
        <div className="faq-section py-5 bg-light" style={{ minHeight: '80vh' }}>
            <div className="container">
          
                <div className="text-center mb-5">
                    <span className="badge bg-primary-soft text-primary px-3 py-2 mb-2 rounded-pill fw-bold">HELP CENTER</span>
                    <h2 className="display-5 fw-bold text-dark">Frequently Asked <span className="text-primary">Questions</span></h2>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        Need help? We've gathered the most common questions to help you get on the road faster.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="accordion border-0" id="faqAccordion">
                            {faqData.map((item, index) => (
                                <div className="accordion-item mb-3 border-0 shadow-sm rounded" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button 
                                            className="accordion-button collapsed fw-bold py-3 rounded" 
                                            type="button" 
                                            data-bs-toggle="collapse" 
                                            data-bs-target={`#collapse${index}`} 
                                            style={{ fontSize: '1.1rem', backgroundColor: '#fff' }}
                                        >
                                            {item.icon} {item.question}
                                        </button>
                                    </h2>
                                    <div 
                                        id={`collapse${index}`} 
                                        className="accordion-collapse collapse" 
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body bg-white text-muted lh-lg">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5 p-4 bg-white shadow-sm rounded-4 border">
                    <h5 className="fw-bold">Still have questions?</h5>
                    <p className="text-muted">If you cannot find an answer to your question in our FAQ, you can always contact us.</p>
                    <a href="/contact" className="btn btn-primary px-4 py-2 fw-bold rounded-pill">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;