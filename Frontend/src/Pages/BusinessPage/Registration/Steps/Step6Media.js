
import React from 'react';

const Step6Media = ({ data, updateData, next, back }) => {
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        // In a real app, you would upload this to a server or convert to base64
        // For now, checks if file exists
        if (file) {
            updateData({ [name]: file.name });
        }
    };

    return (
        <div className="form-step-container">
            <h2>Media Uploads</h2>
            <p className="hint">Make your profile attractive with good quality images.</p>

            <div className="form-group">
                <label>Business Logo *</label>
                <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {data.logo && <span style={{ color: 'green' }}>Selected: {data.logo}</span>}
            </div>

            <div className="form-group">
                <label>Cover Image (Banner) *</label>
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {data.coverImage && <span style={{ color: 'green' }}>Selected: {data.coverImage}</span>}
            </div>

            <div className="form-group">
                <label>Gallery Photos (3-10 images)</label>
                <input
                    type="file"
                    name="gallery"
                    accept="image/*"
                    multiple
                    onChange={(e) => updateData({ gallery: Array.from(e.target.files).map(f => f.name) })}
                />
                {data.gallery.length > 0 && <span style={{ color: 'green' }}>Selected {data.gallery.length} files</span>}
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={next}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step6Media;
