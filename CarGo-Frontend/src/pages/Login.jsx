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
        try {
            const res = await axios.post('http://localhost:8080/api/v1/customer/login', loginData);

            if (res.status === 200) {
              
                localStorage.setItem('user', JSON.stringify(res.data));

                Swal.fire({
                    title: 'Login Successful!',
                    text: `Welcome back, ${res.data.firstName || 'User'}!`,
                    icon: 'success',
                    confirmButtonColor: '#0d6efd',
                    timer: 2000
                }).then(() => {
                    navigate('/dashboard'); 
                });
            }
        } catch (err) {
            console.error(err);
            
           
            let errorMessage = "Invalid email or password. Please try again.";
            if (err.response && err.response.data) {
                errorMessage = err.response.data; 
            }

            Swal.fire({
                title: 'Login Failed!',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    return (
        <div className="container mt-5">
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