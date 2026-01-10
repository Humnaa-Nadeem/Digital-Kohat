
import React from 'react';

const Step1Account = ({ data, updateData, next }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
    };

    const handleNext = () => {
        if (!data.fullName || !data.mobileNumber || !data.email || !data.password || !data.city) {
            alert('Please fill in all required fields.');
            return;
        }
        next();
    };

    return (
        <div className="form-step-container">
            <h2>Account Information</h2>
            <p>Create your login credentials for Digital Kohat Business.</p>

            <div className="form-group">
                <label>Full Name (Owner / Person in Charge) *</label>
                <input
                    type="text"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                />
            </div>

            <div className="form-group">
                <label>Mobile Number *</label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={data.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter mobile number for OTP"
                />
            </div>

            <div className="form-group">
                <label>Email Address *</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                />
            </div>

            <div className="form-group">
                <label>Password *</label>
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                />
            </div>

            <div className="form-group">
                <label>City *</label>
                <input
                    type="text"
                    name="city"
                    value={data.city}
                    disabled
                    className="disabled-input"
                />
            </div>

            <div className="form-group">
                <label>CNIC (Private – Admin only) *</label>
                <input
                    type="text"
                    name="cnic"
                    value={data.cnic}
                    onChange={handleChange}
                    placeholder="XXXXX-*******-X"
                />
            </div>

            <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
                <button className="btn-next" onClick={handleNext}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step1Account;
