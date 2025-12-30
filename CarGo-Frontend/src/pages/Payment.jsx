import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { CreditCard, History, ShieldCheck, Car } from "lucide-react";

function Payment() {
    const location = useLocation();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem("user")));

   
    const [formData, setFormData] = useState({
        bookingId: "",
        amount: "",
        paymentMethod: "CARD",
        cardNumber: "", 
        expiry: "",
        cvv: ""
    });

 
    useEffect(() => {
        if (location.state) {
            console.log("Received data from state:", location.state);
            setFormData(prev => ({
                ...prev,
                bookingId: location.state.bookingId || "",
                amount: location.state.amount || ""
            }));
        }
    }, [location.state]);

 
    useEffect(() => {
        if (user?.id) {
            fetchPaymentHistory();
        }
    }, [user]);

    const fetchPaymentHistory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/payments/customer/${user.id}`);
            setPayments(res.data);
        } catch (err) {
            console.error("Error fetching history", err);
        }
    };

   
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        
       
        if (!formData.bookingId || !formData.amount) {
            Swal.fire("Error", "Booking details not found! Please restart booking.", "error");
            return;
        }

        setLoading(true);

       
        const paymentRequest = {
            bookingId: parseInt(formData.bookingId),
            customerId: user.id,
            amount: parseFloat(formData.amount),
            paymentMethod: formData.paymentMethod
        };

        try {
      
            const response = await axios.post("http://localhost:8080/api/v1/payments/process", paymentRequest);
            
            if (response.status === 200 || response.status === 201) {
                
              
                try {
                    const adminNotification = {
                        customerId: user.id,
                        bookingId: parseInt(formData.bookingId),
                        message: `PAYMENT_ALERT: New payment of LKR ${formData.amount} received for Booking #${formData.bookingId}.`
                    };
                    await axios.post("http://localhost:8080/api/v1/notifications/create", adminNotification);
                } catch (notiErr) {
                    console.error("Notification failed", notiErr);
                }

                Swal.fire({
                    title: "Payment Successful!",
                    text: `Your booking (ID: ${formData.bookingId}) is confirmed.`,
                    icon: "success",
                    confirmButtonColor: "#0dcaf0"
                });
                
            
                setFormData({ ...formData, bookingId: "", amount: "", cardNumber: "", expiry: "", cvv: "" });
                fetchPaymentHistory();
            }
        } catch (err) {
            console.error("Payment Error:", err);
            Swal.fire("Error", "Payment failed. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 pt-4">
            <div className="row g-4">
                <div className="col-lg-5">
                    <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                                    <CreditCard className="text-info" size={28} />
                                </div>
                                <h4 className="fw-bold m-0">Secure Payment</h4>
                            </div>
                            <form onSubmit={handlePayment}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted">Booking Reference ID</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0"><Car size={18}/></span>
                                        <input type="text" className="form-control bg-light border-0 shadow-none" 
                                               value={formData.bookingId} readOnly required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted">Amount (LKR)</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0 fw-bold">Rs.</span>
                                        <input type="text" className="form-control bg-light border-0 shadow-none fw-bold" 
                                               value={formData.amount} readOnly required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted">Card Details</label>
                                    <input type="text" name="cardNumber" className="form-control bg-light border-0 mb-2" 
                                           placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} required />
                                    <div className="row g-2">
                                        <div className="col-6">
                                            <input type="text" name="expiry" className="form-control bg-light border-0" 
                                                   placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" name="cvv" className="form-control bg-light border-0" 
                                                   placeholder="CVV" value={formData.cvv} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-info w-100 py-3 fw-bold text-white shadow-sm" 
                                        style={{ borderRadius: "12px" }} disabled={loading}>
                                    {loading ? "Processing..." : `Pay LKR ${formData.amount ? Number(formData.amount).toLocaleString() : '0'}`}
                                </button>
                                <div className="text-center mt-3 text-muted small">
                                    <ShieldCheck size={14} className="text-success me-1" /> SSL Encrypted Secure Transaction
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                                    <History className="text-warning" size={28} />
                                </div>
                                <h4 className="fw-bold m-0">Transaction History</h4>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr className="small text-uppercase text-muted">
                                            <th>Transaction ID</th>
                                            <th>Booking ID</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.length > 0 ? (
                                            payments.map((p) => (
                                                <tr key={p.id}>
                                                    <td className="small fw-bold text-primary">{p.transactionId}</td>
                                                    <td>ID: {p.bookingId}</td>
                                                    <td className="fw-bold">Rs. {p.amount?.toLocaleString()}</td>
                                                    <td><span className="badge rounded-pill bg-success-subtle text-success border border-success px-3">SUCCESS</span></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="4" className="text-center py-5 text-muted">No transactions found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;