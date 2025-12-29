import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

 
    const fetchMyBookings = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                const userId = userData.customerid || userData.id;

                if (userId) {
                    const response = await axios.get(`http://localhost:8080/api/v1/booking/get-by-customer/${userId}`);
                    setBookings(response.data);
                }
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);


    const handleCancel = async (bookingId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel this booking? The vehicle will be released for others.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                
                    await axios.put(`http://localhost:8080/api/v1/booking/cancel/${bookingId}`);
                    
                    Swal.fire(
                        'Cancelled!',
                        'Your booking has been cancelled and the vehicle is now available.',
                        'success'
                    );
                    
                    fetchMyBookings(); 
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Could not cancel. Please check if the backend is running.',
                        'error'
                    );
                    console.error("Cancel error:", error);
                }
            }
        });
    };

    if (loading) return (
        <div className="container mt-5 pt-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading your bookings...</p>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5 min-vh-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold text-dark">My Bookings</h2>
                    <button className="btn btn-sm btn-outline-primary" onClick={fetchMyBookings}>
                        Refresh List
                    </button>
                </div>
                
                {bookings.length === 0 ? (
                    <div className="alert alert-info text-center py-5 shadow-sm">
                        You haven't made any bookings yet.
                    </div>
                ) : (
                    <div className="table-responsive shadow-sm rounded-4 overflow-hidden border">
                        <table className="table table-hover align-middle bg-white mb-0">
                            <thead className="table-dark small">
                                <tr>
                                    <th className="ps-4">ID</th>
                                    <th>Vehicle Details</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                    <th>Total Price</th>
                                    <th className="text-center pe-4">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.bookId}>
                                        <td className="ps-4 fw-bold">#{booking.bookId}</td>
                                        <td>
                                            <div className="fw-bold text-primary">
                                                {booking.car ? `${booking.car.brand} ${booking.car.model}` : 'N/A'}
                                            </div>
                                            <small className="text-muted">Reg: {booking.car?.vehicleRegNo}</small>
                                        </td>
                                        <td>
                                            <div className="small fw-bold">{booking.startDate}</div>
                                            <div className="small text-muted">to {booking.endDate}</div>
                                        </td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                booking.bookingStatus === 'CONFIRMED' ? 'bg-success' : 
                                                booking.bookingStatus === 'CANCELLED' ? 'bg-secondary' : 'bg-warning text-dark'
                                            }`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </td>
                                        <td className="fw-bold">
                                            LKR {booking.totalAmount?.toLocaleString()}
                                        </td>
                                        <td className="text-center pe-4">
                                          
                                            {(booking.bookingStatus === 'PENDING' || booking.bookingStatus === 'CONFIRMED') ? (
                                                <button 
                                                    className="btn btn-sm btn-danger rounded-pill px-4"
                                                    onClick={() => handleCancel(booking.bookId)}
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-muted small">No Actions</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MyBookings;