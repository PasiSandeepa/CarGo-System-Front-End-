import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    const car = location.state?.carData;
    const user = JSON.parse(localStorage.getItem('user'));

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nic, setNic] = useState(user?.nic || '');
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!car) {
            navigate('/vehicles');
        }
    }, [car, navigate]);

    useEffect(() => {
        if (startDate && endDate && car) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            if (diffDays > 0) {
                setTotalPrice(diffDays * car.pricePerDay);
            } else {
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, car]);

   const handleBookingSubmit = async (e) => {
    e.preventDefault();
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
  
    const customerIdValue = storedUser?.customerid || storedUser?.id || storedUser?.customerId;

    console.log("Logged User from Storage:", storedUser);
    console.log("Extracted Customer ID:", customerIdValue);

    const bookingData = {
        carId: car?.carid || car?.id,
        customerId: customerIdValue, 
        startDate: startDate,
        endDate: endDate,
        totalAmount: totalPrice
    };

  
    if (!bookingData.customerId) {
        Swal.fire({
            icon: 'error',
            title: 'Session Error',
            text: 'Customer ID not found. Please logout and login again.',
        });
        return;
    }

    setLoading(true);
  

        try {
            const res = await axios.post(
                'http://localhost:8080/api/v1/booking/add',
                bookingData
            );

            if (res.status === 200 || res.status === 201) {
                
                  try {
                    await axios.put(
                        `http://localhost:8080/api/v1/cars/update-availability/${car.carid || car.id}`,
                        { available: false }
                    );
                } catch (updateErr) {
                    console.error("Availability update failed:", updateErr);
                }

                Swal.fire({
                    title: 'Success!',
                    text: 'Vehicle booked successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/vehicles');
                });
            }

        } catch (err) {
            console.error("Booking Error Detail:", err.response?.data);
            Swal.fire(
                'Booking Failed',
                err.response?.data?.message || err.response?.data || 'Server error occurred.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    if (!car) return <div className="text-center mt-5">Redirecting...</div>;

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5 pb-5">
                <div className="row g-4">
                    <div className="col-lg-5 col-md-12">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <img
                                src={car.imageUrl ? `http://localhost:8080/api/v1/cars/image-proxy?url=${encodeURIComponent(car.imageUrl)}` : "https://placehold.co/600x400"}
                                className="card-img-top"
                                alt={car.model}
                                style={{ height: '280px', objectFit: 'cover' }}
                            />
                            <div className="card-body p-4">
                                <h2 className="fw-bold text-dark mb-1">{car.brand} {car.model}</h2>
                                <p className="badge bg-primary text-uppercase mb-3">{car.type} - {car.year}</p>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="p-2 border rounded bg-light">
                                            <small className="text-muted d-block">Engine</small>
                                            <strong>{car.engineCapacity} CC</strong>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="p-2 border rounded bg-light">
                                            <small className="text-muted d-block">Fuel Type</small>
                                            <strong>{car.fuelType}</strong>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="p-2 border rounded bg-light">
                                            <small className="text-muted d-block text-danger"><i className="bi bi-geo-alt-fill"></i> Pickup Location</small>
                                            <strong>{car.pickupAddress || 'Homagama'}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7 col-md-12">
                        <div className="card shadow-lg p-4 border-0 rounded-4 h-100">
                            <h3 className="fw-bold text-primary mb-4">Confirm Reservation</h3>
                            <form onSubmit={handleBookingSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="fw-bold">Pick-up Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="fw-bold">Return Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            min={startDate || new Date().toISOString().split("T")[0]}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="card border-0 bg-light rounded-3 mb-4 shadow-sm">
                                    <div className="card-body pt-3">
                                        <h6 className="fw-bold text-secondary text-uppercase mb-3" style={{ fontSize: '0.8rem' }}>Customer Information</h6>
                                        <div className="d-flex flex-column gap-2">
                                            <div className="d-flex justify-content-between border-bottom pb-2">
                                                <span className="text-muted small">Full Name</span>
                                                <span className="fw-semibold">{user?.firstName} {user?.lastName}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="text-muted small">NIC Number</span>
                                                <span className="badge bg-info-subtle text-info">{user?.nic || 'Not Provided'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 rounded-4 overflow-hidden shadow">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary p-4 text-white"><i className="bi bi-wallet2 fs-3"></i></div>
                                        <div className="p-3 flex-grow-1 bg-dark text-white d-flex justify-content-between align-items-center">
                                            <div>
                                                <small className="text-white-50 d-block">TOTAL PAYABLE</small>
                                                <span className="fs-6">Inclusive of taxes</span>
                                            </div>
                                            <div className="text-end">
                                                <span className="fs-3 fw-bold text-warning">LKR {totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-bold py-3 mt-4 rounded-3 shadow"
                                    disabled={loading || totalPrice === 0}
                                >
                                    {loading ? 'PROCESSING...' : 'CONFIRM AND PROCEED'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;