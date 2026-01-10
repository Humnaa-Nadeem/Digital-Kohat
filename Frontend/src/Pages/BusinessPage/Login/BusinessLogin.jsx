
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import Navbar from '../../../components/navbar/Navbar'; // Adjust import path
import '../Registration/BusinessRegistration.css'; // Reuse registration styles

export const BusinessLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ phone: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically validate against backend/firebase
        console.log("Logging in with:", credentials);
        // Direct to dashboard for demo
        navigate('/dashboard/provider');
    };

    return (
        <div className="registration-page"> {/* Reuse registration layout styles */}
            <Navbar />
            <div className="registration-container" style={{ maxWidth: '500px', margin: '100px auto' }}>
                <div className="form-step active-step">
                    <h2 style={{ textAlign: 'center', color: '#32b57e', marginBottom: '20px' }}>Business Login</h2>
                    <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>Access your business dashboard to manage your profile and requests.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Phone Number / Email</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your registered phone or email"
                                value={credentials.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-actions" style={{ justifyContent: 'center', flexDirection: 'column', gap: '15px' }}>
                            <button type="submit" className="btn-submit" style={{ width: '100%' }}>
                                <FaSignInAlt /> Login to Dashboard
                            </button>
                            <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                                Don't have an account? <span onClick={() => navigate('/business/register')} style={{ color: '#32b57e', cursor: 'pointer', fontWeight: 'bold' }}>Register Business</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
