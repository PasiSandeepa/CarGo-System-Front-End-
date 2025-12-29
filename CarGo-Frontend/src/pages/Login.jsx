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
            title: 'Authenticating...',
            text: 'Please wait while we verify your credentials',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const res = await axios.post('http://localhost:8080/api/v1/customer/login', loginData);

            if (res.status === 200) {
                const userData = res.data;
                const userToSave = {
                    id: userData.customerid,
                    email: userData.email,
                    firstName: userData.firstName
                };

                localStorage.setItem('user', JSON.stringify(userToSave));

                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: `Login successful, ${userData.firstName}!`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = "/home";
                });
            }
        } catch (err) {
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: err.response?.data || "Invalid Email or Password",
                confirmButtonColor: '#0d6efd'
            });
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4">

                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="bg-primary d-inline-block rounded-circle p-3 mb-3 shadow">
                                        <i className="bi bi-person-fill text-white fs-1" style={{ width: '50px', height: '50px' }}></i>
                                    </div>
                                    <h2 className="fw-bold text-dark">Welcome Back</h2>
                                    <p className="text-muted small">Please enter your details to login</p>
                                </div>

                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope text-muted"></i></span>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="name@example.com"
                                                className="form-control bg-light border-start-0 ps-0"
                                                value={loginData.email}
                                                onChange={handleChange}
                                                required
                                                style={{ boxShadow: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-secondary">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock text-muted"></i></span>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="••••••••"
                                                className="form-control bg-light border-start-0 ps-0"
                                                value={loginData.password}
                                                onChange={handleChange}
                                                required
                                                style={{ boxShadow: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm hover-lift">
                                        SIGN IN
                                    </button>
                                </form>

                                <div className="mt-4 text-center">
                                    <p className="mb-0 small text-muted">
                                        Don't have an account?
                                        <a href="/register" className="ms-1 fw-bold text-primary text-decoration-none">Create One</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-white-50 mt-4 small">
                            &copy; 2024 YourBrand. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>


            <style>
                {`
                    .hover-lift:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                        transition: all 0.3s ease;
                    }
                `}
            </style>
        </div>
    );
}

export default Login;