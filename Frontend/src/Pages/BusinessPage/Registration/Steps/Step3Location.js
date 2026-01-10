
import React from 'react';

const Step3Location = ({ data, updateData, next, back }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        updateData({
            socialLinks: {
                ...data.socialLinks,
                [name]: value
            }
        });
    };

    const handleNext = () => {
        if (!data.address || !data.businessPhone) {
            alert('Address and Phone are mandatory.');
            return;
        }
        next();
    };

    return (
        <div className="form-step-container">
            <h2>Location & Contact Details</h2>

            <div className="form-group">
                <label>Full Address *</label>
                <textarea
                    name="address"
                    rows="2"
                    value={data.address}
                    onChange={handleChange}
                    placeholder="Shop #, Street, Plaza Name..."
                ></textarea>
            </div>

            <div className="form-group">
                <label>Area / Sector</label>
                <input
                    type="text"
                    name="area"
                    value={data.area}
                    onChange={handleChange}
                    placeholder="e.g. KDA Sector 4"
                />
            </div>

            <div className="form-group">
                <label>Google Map Pin (Link)</label>
                <input
                    type="text"
                    name="googleMapPin"
                    value={data.googleMapPin}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/..."
                />
            </div>

            <div className="form-group">
                <label>Business Phone Number *</label>
                <input
                    type="tel"
                    name="businessPhone"
                    value={data.businessPhone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>WhatsApp Number</label>
                <input
                    type="tel"
                    name="whatsapp"
                    value={data.whatsapp}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Website (Optional)</label>
                <input
                    type="url"
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                />
            </div>

            <h4>Social Media Links (Optional)</h4>
            <div className="form-group">
                <label>Facebook Page</label>
                <input
                    type="url"
                    name="facebook"
                    value={data.socialLinks?.facebook || ''}
                    onChange={handleSocialChange}
                    placeholder="https://facebook.com/..."
                />
            </div>
            <div className="form-group">
                <label>Instagram Page</label>
                <input
                    type="url"
                    name="instagram"
                    value={data.socialLinks?.instagram || ''}
                    onChange={handleSocialChange}
                    placeholder="https://instagram.com/..."
                />
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={handleNext}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step3Location;
