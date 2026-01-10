
import React from 'react';

const Step8Policies = ({ data, updateData, next, back }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateData({ [name]: type === 'checkbox' ? checked : value });
    };

    const handleNext = () => {
        if (!data.termsAccepted) {
            alert('You must accept the Terms of Service to proceed.');
            return;
        }
        next();
    };

    return (
        <div className="form-step-container">
            <h2>Service Policies</h2>

            <div className="form-group">
                <label>Refund Policy (If any)</label>
                <textarea
                    name="refundPolicy"
                    rows="3"
                    value={data.refundPolicy}
                    onChange={handleChange}
                    placeholder="e.g. Full refund within 24 hours if service not delivered..."
                ></textarea>
            </div>

            <div className="form-group">
                <label>Warranty / Guarantee (If any)</label>
                <textarea
                    name="warranty"
                    rows="3"
                    value={data.warranty}
                    onChange={handleChange}
                    placeholder="e.g. 7 days checking warranty on electronics..."
                ></textarea>
            </div>

            <div className="form-group" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: '1rem' }}>
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={data.termsAccepted}
                        onChange={handleChange}
                        style={{ width: '20px', height: '20px', marginRight: '15px', marginTop: '2px' }}
                    />
                    <span>
                        I agree to the Digital Kohat <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                        I confirm that all provided information is accurate and I am the authorized owner/representative of this business.
                    </span>
                </label>
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={handleNext}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step8Policies;
