
import React from 'react';

const Step10Review = ({ data, submit, back }) => {

    return (
        <div className="form-step-container">
            <h2>Final Review</h2>
            <p>Please review your information before submitting. Once submitted, it will be sent for Admin Verification.</p>

            <div className="review-section" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.95rem' }}>
                <ReviewRow label="Full Name" value={data.fullName} />
                <ReviewRow label="Process" value="Business Registration" />
                <hr style={{ margin: '10px 0', borderColor: '#eee' }} />

                <ReviewRow label="Business Name" value={data.businessName} />
                <ReviewRow label="Type" value={data.businessType} />
                <ReviewRow label="Category" value={`${data.category} > ${data.subCategory}`} />
                <ReviewRow label="Address" value={data.address} />
                <ReviewRow label="Contact" value={data.businessPhone} />

                <hr style={{ margin: '10px 0', borderColor: '#eee' }} />
                <ReviewRow label="Subscription" value={data.subscriptionPlan === 'paid' ? 'Verified Listing (Rs. 100/yr)' : 'Free Listing'} />
            </div>

            <div className="verification-notice" style={{ textAlign: 'center', margin: '30px 0', color: '#7f8c8d' }}>
                <p>By clicking Submit, your profile will be created and pending verification.</p>
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-submit" onClick={submit}>Submit Registration</button>
            </div>
        </div>
    );
};

const ReviewRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <strong style={{ color: '#555' }}>{label}:</strong>
        <span style={{ textAlign: 'right', fontWeight: '500' }}>{value || '-'}</span>
    </div>
);

export default Step10Review;
