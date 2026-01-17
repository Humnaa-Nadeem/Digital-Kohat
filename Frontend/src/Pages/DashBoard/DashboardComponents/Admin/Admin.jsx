import "./Admin.css";
import "../DashboardComponents.css";
import { useEffect, useState } from "react";
import { UpdateAdministration, UpdateFacilities, UpdateTimings } from "../../../../ApiCalls/DashBoardApiCalls.jsx";
import { FiTrash2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

const generalFacilities = ["Library", "Science_Lab", "Computer_Lab", "Playground", "Transport", "Canteen", "First_Aid", "Auditorium"];

export const AdminManagingForm = ({ dashboardData }) => {
    // =========================
    // Administration Section
    // =========================
    // Getting the new fields if any added by admin.
    let customFieldsOfDb = [];
    const [customFields, setCustomFields] = useState(customFieldsOfDb);

    useEffect(() => {
        let adminObj = { ...dashboardData.administration };
        for (const key in adminObj) {
            if (
                key !== "principal" &&
                key !== "vice_principal" &&
                key !== "managing_director"
            ) {
                customFieldsOfDb.push(key);
            }
        }
        setCustomFields(customFieldsOfDb.map((v) => v));
    }, []);

    // Setting the Db Data if any, instead of default data
    const [adminFormData, setAdminFormData] = useState(
        dashboardData.administration || {
            principal: "",
            vice_principal: "",
            managing_director: ""
        }
    );

    // Tracking changes
    const [adminSecChanged, setAdminSecChanged] = useState(false);

    // Handling the data entry
    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setAdminFormData(prev => ({ ...prev, [name]: value }));
        setAdminSecChanged(true);
    };

    // Adding new field
    const addCustomField = () => {
        const fieldName = prompt("Enter the field name. If it has two words, separate them with an underscore, e.g., First_Name.");
        if (!fieldName) return;
        setCustomFields(prev => [...prev, fieldName]);
        setAdminFormData(prev => ({ ...prev, [fieldName]: "" }));
        setAdminSecChanged(true);
    };

    // Deleting fields
    const deleteCustomField = (fieldName) => {
        setCustomFields(prev => prev.filter(f => f !== fieldName));
        const updatedData = { ...adminFormData };
        delete updatedData[fieldName];
        setAdminFormData(updatedData);
        setAdminSecChanged(true);
    };

    // %%%%%% Form Submission of "ADMINISTARTION" Section %%%%%%%
    const saveAdministration = (e) => {
        e.preventDefault();
        UpdateAdministration(adminFormData, setAdminSecChanged);
    };

    // =========================
    // Timings Section
    // =========================

    // Setting the Db Data if any, instead of default data
    const [timings, setTimings] = useState(
        dashboardData.timings || { opening: "", closing: "", break: "", office: "" }
    );

    // Tracking changes
    const [timingSecChanged, setTimingSecChanged] = useState(false);

    // Handling the data entry
    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTimings(prev => ({ ...prev, [name]: value }));
        setTimingSecChanged(true);
    };

    const saveTimings = (e) => {
        e.preventDefault();
        UpdateTimings(timings, setTimingSecChanged);
    };

    // =========================
    // Facilities Section
    // =========================

    // Deafult Facilities list:
    let facilitiesMap = {
        Library: false,
        Science_Lab: false,
        Computer_Lab: false,
        Playground: false,
        Transport: false,
        Canteen: false,
        First_Aid: false,
        Auditorium: false
    };

    // getting avalible facilities among default facilities stored in db
    let [availableFacilities, setAvailableFacilities] = useState(() => {
        if (dashboardData.facilities) {
            let map = { ...facilitiesMap };
            for (const key in map) {
                map[key] = dashboardData.facilities.includes(key);
            }
            dashboardData.facilities.map((v) => {
                if (!map[v]) {
                    map = { ...map, [v]: true };
                }
            });
            return map;
        }
        return facilitiesMap;
    });

    const [allFacilities, setAllFacilities] = useState(generalFacilities);

    // Tracking changes
    const [facilitiesSecChanged, setFacilitiesSecChanged] = useState(false);

    // Handling the changes
    const handleFacilityChange = (e) => {
        const { name, checked } = e.target;
        setAvailableFacilities(prev => ({ ...prev, [name]: checked }));
        setFacilitiesSecChanged(true);
    };

    // Add new facility
    const addFacility = () => {
        const facilityName = prompt("Enter the facility name. If it has two words, separate them with an underscore, e.g., First_Name.");
        if (!facilityName) return;
        setAllFacilities(prev => [...prev, facilityName]);
        setAvailableFacilities(prev => ({ ...prev, [facilityName]: false }));
        setFacilitiesSecChanged(true);
    };

    // Save selected facilities
    const saveFacilities = (e) => {
        e.preventDefault();
        const selectedFacilities = Object.keys(availableFacilities).filter(
            key => availableFacilities[key]
        );
        if (selectedFacilities.length < 3) return alert("At least 3 facilities required.");
        UpdateFacilities(selectedFacilities, setFacilitiesSecChanged);
    };

    return (
        <section className="form-area">
            <ToastContainer />

            {/* Administration Form */}
            <h2>Administration</h2>
            <form onSubmit={saveAdministration}>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Managing Director Name</label>
                        <input
                            type="text"
                            name="managing_director"
                            value={adminFormData.managing_director}
                            onChange={handleAdminChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Principal Name</label>
                        <input
                            type="text"
                            name="principal"
                            value={adminFormData.principal}
                            onChange={handleAdminChange}
                            required
                        />
                    </div>
                </div>

                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Vice-Principal Name</label>
                        <input
                            type="text"
                            name="vice_principal"
                            value={adminFormData.vice_principal}
                            onChange={handleAdminChange}
                            required
                        />
                    </div>
                </div>

                {/* Custom Fields */}
                {customFields.map((field, index) => (
                    <div className="smallInputCont" key={index}>
                        <div className="form-group">
                            <label>{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={adminFormData[field] || ""}
                                onChange={handleAdminChange}
                                required
                            />
                        </div>
                        <span className="deleteField" onClick={() => deleteCustomField(field)}>
                            <FiTrash2 />
                        </span>
                    </div>
                ))}

                <span className="AddField" title="Add more fields" onClick={addCustomField}>+</span>

                <div className="form-actions">
                    <button type="submit" disabled={!adminSecChanged} className="save-btn">
                        Save
                    </button>
                </div>
            </form>

            {/* Timings Form */}
            <h2>Timings</h2>
            <form onSubmit={saveTimings}>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Opening Time</label>
                        <input
                            type="text"
                            name="opening"
                            value={timings.opening}
                            onChange={handleTimeChange}
                            placeholder="8:00 AM"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Closing Time</label>
                        <input
                            type="text"
                            name="closing"
                            value={timings.closing}
                            onChange={handleTimeChange}
                            placeholder="2:00 PM"
                            required
                        />
                    </div>
                </div>

                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Break Time</label>
                        <input
                            type="text"
                            name="break"
                            value={timings.break}
                            onChange={handleTimeChange}
                            placeholder="10:00 AM - 10:30 AM"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Office Timing</label>
                        <input
                            type="text"
                            name="office"
                            value={timings.office}
                            onChange={handleTimeChange}
                            placeholder="8:00 AM - 5:00 PM"
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={!timingSecChanged} className="save-btn">
                        Save
                    </button>
                </div>
            </form>

            {/* Facilities Form */}
            <h2>Facilities</h2>
            <form onSubmit={saveFacilities}>
                <div className="facilitiesCont">
                    {allFacilities.map((facility, index) => (
                        <div className="facilityItem" key={index}>
                            <input
                                type="checkbox"
                                name={facility}
                                id={`${facility}`}
                                checked={availableFacilities[facility] || false}
                                onChange={handleFacilityChange}
                                className="dshbrdCheckbox"
                            />
                            <label htmlFor={facility} className="facilityNme">
                                {facility}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="AddField AddFacility" onClick={addFacility}>+</div>

                <div className="form-actions">
                    <button type="submit" disabled={!facilitiesSecChanged} className="save-btn">
                        Save
                    </button>
                </div>
            </form>
        </section>
    );
};
