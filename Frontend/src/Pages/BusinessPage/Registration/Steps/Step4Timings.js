
import React from 'react';

const Step4Timings = ({ data, updateData, next, back }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateData({ [name]: type === 'checkbox' ? checked : value });
    };

    const handleDayChange = (day) => {
        const currentDays = data.workingDays || [];
        if (currentDays.includes(day)) {
            updateData({ workingDays: currentDays.filter(d => d !== day) });
        } else {
            updateData({ workingDays: [...currentDays, day] });
        }
    };

    const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="form-step-container">
            <h2>Timings & Availability</h2>

            <div className="form-group">
                <label>Working Days</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {DAYS_OF_WEEK.map(day => (
                        <label key={day} style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 'normal' }}>
                            <input
                                type="checkbox"
                                checked={data.workingDays?.includes(day)}
                                onChange={() => handleDayChange(day)}
                                style={{ width: 'auto', marginRight: '5px' }}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label>Opening Time</label>
                    <input
                        type="time"
                        name="openingTime"
                        value={data.openingTime}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Closing Time</label>
                    <input
                        type="time"
                        name="closingTime"
                        value={data.closingTime}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        name="emergencyAvailability"
                        checked={data.emergencyAvailability}
                        onChange={handleChange}
                        style={{ width: 'auto', marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    Available for Emergency / On-Call?
                </label>
            </div>

            <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        name="appointmentRequired"
                        checked={data.appointmentRequired}
                        onChange={handleChange}
                        style={{ width: 'auto', marginRight: '10px', transform: 'scale(1.2)' }}
                    />
                    Appointment Required?
                </label>
            </div>

            <div className="form-actions">
                <button className="btn-prev" onClick={back}>&larr; Back</button>
                <button className="btn-next" onClick={next}>Next Step &rarr;</button>
            </div>
        </div>
    );
};

export default Step4Timings;
