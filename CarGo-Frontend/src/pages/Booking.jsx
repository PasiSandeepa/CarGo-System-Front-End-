import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import MapComponent from '../components/MapComponent';

function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    const car = location.state?.carData;
    const user = JSON.parse(localStorage.getItem('user'));

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [nic, setNic] = useState('Fetching...');
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);

    // පාරිභෝගිකයාගේ NIC එක ලබා ගැනීම
    useEffect(() => {
        const fetchCustomerNic = async () => {
            try {
                const userId = user?.id || user?.customerId;
                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/v1/customer/get-by-id/${userId}`);
                    if (response.data && response.data.nic) {
                        setNic(response.data.nic);
                    } else {
                        setNic("Not Provided");
                    }
                }
            } catch (error) {
                console.error("Error fetching NIC:", error);
                setNic("Error Loading");
            }
        };
        fetchCustomerNic();
    }, [user?.id, user?.customerId]);

    // Car data නොමැති නම් ආපසු හරවා යැවීම
    useEffect(() => {
        if (!car) navigate('/vehicles');
    }, [car, navigate]);


    useEffect(() => {
        if (startDate && endDate && car) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setTotalPrice(diffDays > 0 ? diffDays * car.pricePerDay : 0);
        }
    }, [startDate, endDate, car]);


    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        const bookingData = {
            customerId: user?.id || user?.customerId,
            carId: car?.carid || car?.id,
            startDate: startDate,
            endDate: endDate,
            totalAmount: totalPrice
        };

        try {
        
            const res = await axios.post('http://localhost:8080/api/v1/booking/add', bookingData);

            if (res.status === 200 || res.status === 201) {
              
                const newBookingId = res.data.bookId;

                Swal.fire({
                  
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/payment', {
                            state: {
                                bookingId: newBookingId, 
                                amount: totalPrice
                            }
                        });
                    }
                });
            }
        } catch (err) {
            console.error("Booking Error Detail:", err.response?.data);
            Swal.fire({
                title: 'Error',
                text: err.response?.data?.message || 'Booking process failed. Please try again.',
                icon: 'error'
            });
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
                                    <div className="col-6"><div className="p-2 border rounded bg-light"><small className="text-muted d-block">Fuel</small><strong>{car.fuelType}</strong></div></div>
                                    <div className="col-6"><div className="p-2 border rounded bg-light"><small className="text-muted d-block">Seats</small><strong>{car.seats} Person</strong></div></div>
                                    <div className="col-12"><div className="p-2 border rounded bg-light"><small className="text-muted d-block">Pickup Location</small><strong>{car.pickupAddress}</strong></div></div>
                                </div>
                                <button type="button" className="btn btn-outline-danger btn-sm w-100 mt-3" onClick={() => setShowMap(!showMap)}>
                                    {showMap ? 'Hide Map' : 'View on Map'}
                                </button>
                                {showMap && (
                                    <div className="mt-3 border rounded overflow-hidden shadow-sm">
                                        <MapComponent locationName={car.pickupAddress} lat={car.pickupLat} lng={car.pickupLng} />
                                    </div>
                                )}
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

                                <div className="card border-0 bg-light rounded-3 mb-4 p-3 shadow-sm">
                                    <h6 className="fw-bold text-secondary text-uppercase small mb-3">Customer Information</h6>
                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                        <span className="text-muted small">Full Name</span>
                                        <span className="fw-semibold">{user?.firstName} {user?.lastName}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-muted small">NIC Number</span>
                                        <span className="badge bg-info-subtle text-info border px-3 py-2 rounded-pill">{nic}</span>
                                    </div>
                                </div>

                                <div className="card border-0 rounded-4 overflow-hidden shadow-sm mb-4">
                                    <div className="d-flex align-items-center bg-dark text-white p-3">
                                        <div className="flex-grow-1 text-center">
                                            <small className="text-white-50 d-block text-uppercase letter-spacing-1">Total Payable</small>
                                            <span className="fs-2 fw-bold text-warning">LKR {totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 fw-bold py-3 rounded-3 shadow transition-all"
                                    disabled={loading || totalPrice === 0}
                                >
                                    {loading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            PROCESSING...
                                        </span>
                                    ) : 'CONFIRM AND PAY NOW'}
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