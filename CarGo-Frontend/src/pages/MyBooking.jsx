import React, { useState, useEffect } from "react";
import axios from "axios";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const userData = JSON.parse(storedUser);
                    
                  
                    const userId = userData.customer_id || userData.id;

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

        fetchMyBookings();
    }, []);

    if (loading) return (
        <div className="container mt-5 pt-5 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Loading your bookings...</p>
        </div>
    );

    return (
        <div className="container mt-5 pt-5">
            <h2 className="fw-bold mb-4">My Bookings</h2>
            
            {bookings.length === 0 ? (
                <div className="alert alert-info shadow-sm">
                    You haven't made any bookings yet.
                </div>
            ) : (
                <div className="table-responsive shadow-sm">
                    <table className="table table-hover align-middle bg-white border">
                        <thead className="table-dark">
                            <tr>
                                <th>Booking ID</th>
                                <th>Car ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking) => (
    <tr key={booking.bookId}>
        <td className="fw-bold">#{booking.bookId}</td>
     
        <td>
            {booking.car ? `${booking.car.brand} ${booking.car.model}` : 'N/A'}
            <br/>
            <small className="text-muted">Reg No: {booking.car?.vehicleRegNo}</small>
        </td>

        <td>{booking.startDate}</td>
        <td>{booking.endDate}</td>
        
        <td>
            <span className={`badge rounded-pill ${
                booking.bookingStatus === 'PENDING' ? 'bg-warning text-dark' : 
                booking.bookingStatus === 'CONFIRMED' ? 'bg-success' : 'bg-danger'
            }`}>
                {booking.bookingStatus}
            </span>
        </td>

        <td className="fw-bold text-primary">
            LKR {booking.totalAmount?.toLocaleString()}
        </td>
    </tr>
))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyBookings;