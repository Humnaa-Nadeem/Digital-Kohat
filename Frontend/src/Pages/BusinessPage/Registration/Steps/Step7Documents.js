
import React from 'react';

const Step7Documents = ({ data, updateData, next, back }) => {
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        if (file) {
            updateData({ [name]: file.name });
        }
    };

    return (
        <div className="form-step-container">
            <h2>Documents for Verification (Private)</h2>
            <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <strong style={{ display: 'block', marginBottom: '5px' }}>⚠️ Confidential Information</strong>
                These documents are only for Admin Verification and will NEVER be shown to public users.
            </div>

            <div className="form-group">
                <label>Owner CNIC (Front & Back) *</label>
                <input
                    type="file"
                    name="ownerCnic"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
                {data.ownerCnic && <span style={{ color: 'green' }}>Provided</span>}
            </div>

            <div className="form-group">
                <label>Business Registration / NTN (Optional)</label>
                <input
                    type="file"
                    name="businessRegDoc"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
            </div>

            <div className="form-group">
                <label>Utility Bill (Electricity/Gas) for Address Proof *</label>
                <input
                    type="file"
                    name="utilityBill"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
                {data.utilityBill && <span style={{ color: 'green' }}>Provided</span>}
            </div>

            <div className="form-group">
                <label>Professional Certificate / License (if applicable)</label>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '-5px' }}>Required for medical, legal, and engineering professionals.</p>
                <input
                    type="file"
                    name="professionalCert"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                />
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={next}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step7Documents;
