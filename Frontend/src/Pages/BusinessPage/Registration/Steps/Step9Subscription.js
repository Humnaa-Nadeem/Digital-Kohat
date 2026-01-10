
import React from 'react';

const Step9Subscription = ({ data, updateData, next, back }) => {

    // Helper to update subscription plan
    const selectPlan = (plan) => {
        updateData({ subscriptionPlan: plan });
    };

    return (
        <div className="form-step-container">
            <h2>Select Subscription Plan</h2>
            <p className="hint">Choose a plan that suits your business needs. You can upgrade later.</p>

            <div className="subscription-options" style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>

                {/* Free Plan */}
                <div
                    className={`plan-card ${data.subscriptionPlan === 'free' ? 'selected' : ''}`}
                    onClick={() => selectPlan('free')}
                    style={{
                        border: data.subscriptionPlan === 'free' ? '2px solid #2ecc71' : '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '10px',
                        flex: 1,
                        cursor: 'pointer',
                        background: data.subscriptionPlan === 'free' ? '#f0fff4' : '#fff'
                    }}
                >
                    <h3 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Free Listing</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>Rs. 0 <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/ year</span></p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li>List your business</li>
                        <li>Basic Contact Info</li>
                        <li>Limited Visibility</li>
                    </ul>
                </div>

                {/* Paid Plan */}
                <div
                    className={`plan-card ${data.subscriptionPlan === 'paid' ? 'selected' : ''}`}
                    onClick={() => selectPlan('paid')}
                    style={{
                        border: data.subscriptionPlan === 'paid' ? '2px solid #f39c12' : '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '10px',
                        flex: 1,
                        cursor: 'pointer',
                        background: data.subscriptionPlan === 'paid' ? '#fff9e6' : '#fff',
                        position: 'relative'
                    }}
                >
                    <div style={{ position: 'absolute', top: '-10px', right: '20px', background: '#f39c12', color: 'white', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>RECOMMENDED</div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#d35400' }}>Verified Listing</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>Rs. 100 <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/ year</span></p>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li><strong>DSCH Verified Badge</strong> ✅</li>
                        <li>Featured on Homepage</li>
                        <li>4 extra Gallery Photos</li>
                        <li>Priority Support</li>
                        <li>Higher Trust Score</li>
                    </ul>
                </div>
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={next}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step9Subscription;
