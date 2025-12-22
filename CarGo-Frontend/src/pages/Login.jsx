import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
     
        localStorage.clear();
        sessionStorage.clear();

        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const res = await axios.post('http://localhost:8080/api/v1/customer/login', loginData);

if (res.status === 200) {
    const userData = res.data;
    console.log("Data from Backend:", userData); 

    const userToSave = {
       
        id: userData.customerid, 
        email: userData.email,
        firstName: userData.firstName
    };

    localStorage.setItem('user', JSON.stringify(userToSave));
    window.location.href = "/home";
}
            
        }catch (err) {
            Swal.close();
            console.error("Login Error:", err);
            
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: err.response?.data || "Invalid Email or Password"
            });
        }
    };

    return (
        <div className="container mt-5" style={{ minHeight: '80vh' }}>
            <div className="row justify-content-center">
                <div className="col-md-4 shadow p-4 rounded bg-white">
                    <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                className="form-control"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="form-control"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 fw-bold">LOGIN</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? <a href="/register" className="text-decoration-none fw-bold text-success">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;