
import React from 'react';
import { MASTER_BUSINESS_CATEGORIES } from '../../../../utils/BusinessData';

const Step2Basic = ({ data, updateData, next, back }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData({ [name]: value });
    };

    const handleCategoryChange = (e) => {
        updateData({ category: e.target.value, subCategory: '' });
    };

    const selectedCategory = MASTER_BUSINESS_CATEGORIES.find(c => c.id === data.category);

    const handleNext = () => {
        if (!data.businessName || !data.businessType || !data.category || !data.subCategory) {
            alert('Please fill in all mandatory fields.');
            return;
        }
        next();
    };

    return (
        <div className="form-step-container">
            <h2>Business Basic Details</h2>

            <div className="form-group">
                <label>Business Name *</label>
                <input
                    type="text"
                    name="businessName"
                    value={data.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Kohat Super Market"
                />
            </div>

            <div className="form-group">
                <label>Business Type *</label>
                <select name="businessType" value={data.businessType} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Shop">Shop / Retail Store</option>
                    <option value="Office">Office / Company</option>
                    <option value="Service">Service Provider</option>
                    <option value="Freelancer">Freelancer / Independent</option>
                    <option value="Industry">Industry / Manufacturing</option>
                </select>
            </div>

            <div className="form-group">
                <label>Category *</label>
                <select name="category" value={data.category} onChange={handleCategoryChange}>
                    <option value="">Select Main Category</option>
                    {MASTER_BUSINESS_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Sub-Category *</label>
                <select
                    name="subCategory"
                    value={data.subCategory}
                    onChange={handleChange}
                    disabled={!data.category}
                >
                    <option value="">Select Sub-Category</option>
                    {selectedCategory && selectedCategory.subCategories.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Short Business Description (50–150 words)</label>
                <textarea
                    name="description"
                    rows="4"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your business..."
                ></textarea>
            </div>

            <div className="form-group">
                <label>Year of Establishment</label>
                <input
                    type="number"
                    name="establishmentYear"
                    value={data.establishmentYear}
                    onChange={handleChange}
                    placeholder="e.g. 2010"
                />
            </div>

            <div className="form-group">
                <label>Number of Staff</label>
                <input
                    type="number"
                    name="staffCount"
                    value={data.staffCount}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Operating Area</label>
                <select name="operatingArea" value={data.operatingArea} onChange={handleChange}>
                    <option value="">Select Area</option>
                    <option value="Local">Local (Neighborhood)</option>
                    <option value="City-wide">City-wide</option>
                    <option value="National">National</option>
                </select>
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={handleNext}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step2Basic;
