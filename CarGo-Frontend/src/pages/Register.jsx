import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom'; 

function Register() {
   const [customer, setCustomer] = useState({
    firstName: '', 
    lastName: '', 
    email: '', 
    phoneNumber: '', 
    address: '', 
    nic: '',               
    password: ''
});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post('http://localhost:8080/api/v1/customer/add', customer);
            
     
            Swal.fire({
                title: 'Registration successful.!',
                text: 'Now you can enter the system..',
                icon: 'success',
                confirmButtonColor: '#198754',
                confirmButtonText: 'Login Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
            });

        } catch (err) {
            console.error(err);
            
           
            Swal.fire({
                title: 'An error occurred!',
                text: 'Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
    };

  return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-5 shadow p-4 rounded bg-white">
                <h2 className="text-center mb-4 fw-bold text-success">Customer Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">First Name</label>
                        <input type="text" name="firstName" placeholder="First Name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Last Name</label>
                        <input type="text" name="lastName" placeholder="Last Name" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Email Address</label>
                        <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Phone Number</label>
                        <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small fw-bold">NIC Number</label>
                        <input type="text" name="nic" placeholder="NIC Number" className="form-control" onChange={handleChange} required />
                    </div>
                    
                   
                    <div className="mb-2">
                        <label className="form-label small fw-bold">Address</label>
                        <textarea 
                            name="address" 
                            placeholder="Home Address" 
                            className="form-control" 
                            onChange={handleChange} 
                            rows="2" 
                            required 
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Password</label>
                        <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 fw-bold shadow-sm">REGISTER</button>
                </form>
            </div>
        </div>
    </div>
);
}
export default Register;