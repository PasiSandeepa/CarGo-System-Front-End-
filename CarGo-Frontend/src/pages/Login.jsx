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

    const handleLogout = () => {
        localStorage.clear(); 
        sessionStorage.clear();
    
        navigate("/login"); 
    };

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

   const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();

    Swal.fire({
        title: 'Please Wait',
        didOpen: () => { Swal.showLoading(); }
    });

    try {
        const res = await axios.post('http://localhost:8080/api/v1/customer/login', loginData);
        
        console.log("Full Backend Response:", res.data); // මෙතැන බලන්න id එක එන්නේ කොතැනද කියා

        if (res.status === 200) {
            // වැදගත්: Backend එකෙන් එන 'res.data' එකේ 'id' එක කෙලින්ම තිබේදැයි බලන්න.
            // සමහරවිට එය res.data.id හෝ res.data.customerId විය හැක.
            
            localStorage.setItem('user', JSON.stringify(res.data));
            
            Swal.fire({ 
                icon: 'success', 
                title: 'Login Successful!',
                timer: 1500,
                showConfirmButton: false 
            }).then(() => {
                navigate('/dashboard');
            });
        }
    } catch (err) {
            Swal.close();
            console.error("4. Error Details:", err.response ? err.response.data : err.message);
            
            Swal.fire({
                icon: 'error',
                title: 'Login Failed!',
                text: err.response?.data || "Something went wrong"
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