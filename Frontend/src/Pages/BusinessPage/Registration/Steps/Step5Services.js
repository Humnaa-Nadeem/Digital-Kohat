
import React, { useState } from 'react';

const Step5Services = ({ data, updateData, next, back }) => {
    const [newItem, setNewItem] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateData({ [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddItem = (field) => {
        if (!newItem.trim()) return;
        const currentItems = data[field] || [];
        updateData({ [field]: [...currentItems, newItem] });
        setNewItem('');
    };

    const handleRemoveItem = (index, field) => {
        const currentItems = data[field] || [];
        updateData({ [field]: currentItems.filter((_, i) => i !== index) });
    };

    return (
        <div className="form-step-container">
            <h2>Services & Products</h2>

            {/* Condition for Shops & Retail */}
            {data.businessType === 'Shop' && (
                <>
                    <div className="form-group">
                        <label>Product Categories Available</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Add product category (e.g. Vegetables, Electronics)"
                            />
                            <button type="button" onClick={() => handleAddItem('products')} className="btn-next" style={{ padding: '0 20px' }}>Add</button>
                        </div>
                        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            {data.products?.map((item, index) => (
                                <li key={index}>
                                    {item} <span onClick={() => handleRemoveItem(index, 'products')} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}>&times;</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Condition for Service Providers, Freelancers, Offices */}
            {['Service', 'Freelancer', 'Office'].includes(data.businessType) && (
                <>
                    <div className="form-group">
                        <label>Services Offered (List your main services)</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Add service (e.g. Graphic Design, Legal Advice)"
                            />
                            <button type="button" onClick={() => handleAddItem('services')} className="btn-next" style={{ padding: '0 20px' }}>Add</button>
                        </div>
                        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            {data.services?.map((item, index) => (
                                <li key={index}>
                                    {item} <span onClick={() => handleRemoveItem(index, 'services')} style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}>&times;</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {/* Common Fields */}
            <div className="form-group">
                <label>Price Range</label>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <label style={{ fontWeight: 'normal' }}>
                        <input type="radio" name="priceRange" value="Low" checked={data.priceRange === 'Low'} onChange={handleChange} /> Low
                    </label>
                    <label style={{ fontWeight: 'normal' }}>
                        <input type="radio" name="priceRange" value="Medium" checked={data.priceRange === 'Medium'} onChange={handleChange} /> Medium
                    </label>
                    <label style={{ fontWeight: 'normal' }}>
                        <input type="radio" name="priceRange" value="High" checked={data.priceRange === 'High'} onChange={handleChange} /> High
                    </label>
                </div>
            </div>

            {data.businessType === 'Shop' && (
                <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="homeDelivery"
                            checked={data.homeDelivery}
                            onChange={handleChange}
                            style={{ width: 'auto', marginRight: '10px' }}
                        />
                        Home Delivery Available?
                    </label>
                </div>
            )}

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={next}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step5Services;
