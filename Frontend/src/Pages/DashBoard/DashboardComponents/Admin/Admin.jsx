import { useState } from "react";
import "./Admin.css";
import "../DashboardComponents.css";
import "react-icons";
import { FaTrash } from "react-icons/fa";
import { SendAdmnTabDataToDb } from "../../../../ApiCalls/DashBoardApiCalls";

let GeneralFacilities = ["Library", "Science_Lab", "Computer_Lab", "Playground", "Transport", "Canteen", "First_Aid", "Auditorium"];
export const AdminForm = () => {
    let [formSubmitted, setFormSubmitted] = useState(false);
    let [adminFormData, setAdminFormData] = useState({ prncplNme: "", vicePrncplNme: "", MdNme: "" });
    let [timings, setTimings] = useState({ opening: "", closing: "", break: "", office: "" });
    let [facilitiesArr, setFacilitiesArr] = useState(GeneralFacilities);
    let [newFieldNme, setNewfieldNme] = useState([]);
    let [avalibleFacility, setAvalibleFacility] = useState({ Library: false, Science_Lab: false, Computer_Lab: false, Playground: false, Transport: false, Canteen: false, First_Aid: false, Auditorium: false });

    // Handling Administration Block
    const handleAdminData = (e) => {
        const { name, value } = e.target;
        setAdminFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const AddField = () => {
        let fieldName = prompt("Enter Field Name");
        setNewfieldNme([...newFieldNme, fieldName]);
        setAdminFormData(prev => ({ ...prev, [fieldName]: "" }));

    }

    const deleteField = (fieldNme) => {
        setNewfieldNme(newFieldNme.filter((field) => field !== fieldNme));
        let updatedAdminFormData = { ...adminFormData };
        delete updatedAdminFormData[fieldNme];
        setAdminFormData(updatedAdminFormData);
    }

    // Handling Timings Block

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTimings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handling Facilities Block

    const handleFacility = (e) => {
        const { name, checked } = e.target;
        setAvalibleFacility(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    let facility = facilitiesArr.map((facility, index) => (
        <div className="facilityItem" key={index}>
            <input type="checkbox" id={facility} name={facility} checked={avalibleFacility[facility] || false} className="dshbrdCheckbox" onChange={(e) => handleFacility(e)} />
            <label htmlFor={facility} className="facilityNme">{facility}</label>
        </div>
    ));
    // Adding Facility;
    const AddFacility = () => {
        const facilityName = prompt("Enter Facility Name");
        if (!facilityName) return;
        setFacilitiesArr(prev => [...prev, facilityName]);
        setAvalibleFacility(prev => ({ ...prev, [facilityName]: false }));
    };


    // Cleaning Form
    const CleanForm = () => {
        setAdminFormData({ prncplNme: "", vicePrncplNme: "", MdNme: "" });
        setTimings({ opening: "", closing: "", break: "", office: "" });
        setFacilitiesArr(GeneralFacilities);
        setAvalibleFacility({ Library: false, Science_Lab: false, Computer_Lab: false, Playground: false, Transport: false, Canteen: false, First_Aid: false, Auditorium: false });
        setNewfieldNme([]);
    }

    // Final Data

    const FinalFun = (e) => {
        e.preventDefault();
        let facilities = [];
        for (const key in avalibleFacility) {
            if (avalibleFacility[key]) {
                facilities.push(key);
            }
        }
        if (facilities.length < 3) {
            alert("Atleast three facilities are required.")
        } else {
            SendAdmnTabDataToDb(adminFormData, facilities, timings);
            setFormSubmitted(true);
            CleanForm();
        }
    }

    return (
        <>
            <section className="form-area">
                <form onSubmit={(e) => { FinalFun(e) }}>
                    <h2>Admin Info</h2>
                    <div className="smallInputCont">
                        <div className="form-group">
                            <label >Managing Director Name</label>
                            <input type="text" name="MdNme" value={adminFormData.MdNme} onChange={e => handleAdminData(e)} required />
                        </div>
                        <div className="form-group">
                            <label >Principle Name</label>
                            <input type="text" name="prncplNme" value={adminFormData.prncplNme} onChange={e => handleAdminData(e)} required />
                        </div>
                    </div>
                    <div className="smallInputCont">
                        <div className="form-group">
                            <label >Vice-Principle Name</label>
                            <input type="text" name="vicePrncplNme" value={adminFormData.vicePrncplNme} onChange={e => handleAdminData(e)} required />
                        </div>
                    </div>
                    {(newFieldNme[0])
                        ?
                        newFieldNme.map((field, index) => (
                            <div className="smallInputCont" key={index}>
                                <div className="form-group">
                                    <label >{field}</label>
                                    <input type="text" name={field} value={adminFormData[field] || ""} onChange={e => handleAdminData(e)} required />
                                </div>
                                <span className="deleteField" onClick={() => deleteField(field)}>
                                    <FaTrash />
                                </span>
                            </div>
                        ))
                        :
                        <></>
                    }
                    <div className="form-group">
                        <span className="AddField" title="Add more fields" onClick={AddField}>
                            +
                        </span>
                    </div>
                    {/* Student and Timing */}
                    <h2>Timing</h2>
                    <div className="smallInputCont">
                        <div className="form-group">
                            <label >Opening Time</label>
                            <input type="text" name="opening" value={timings.opening} placeholder="8:00 AM" onChange={(e) => { handleTimeChange(e) }} required />
                        </div>
                        <div className="form-group">
                            <label >Closing Time</label>
                            <input type="text" name="closing" value={timings.closing} placeholder="2:00 PM" onChange={(e) => { handleTimeChange(e) }} required />
                        </div>
                    </div>
                    <div className="smallInputCont">
                        <div className="form-group">
                            <label >Break Time</label>
                            <input type="text" name="break" value={timings.break} placeholder="10:00 AM - 10:30 AM" onChange={(e) => { handleTimeChange(e) }} required />
                        </div>
                        <div className="form-group">
                            <label >Office Timing</label>
                            <input type="text" name="office" value={timings.office} placeholder="8:00 AM - 5:00 PM" onChange={(e) => { handleTimeChange(e) }} required />
                        </div>
                    </div>
                    {/* Facilities */}
                    <h2>Facilities</h2>
                    <div className="facilitiesCont">
                        {facility}
                    </div>
                    <div className="AddField AddFacility" onClick={AddFacility}>
                        +
                    </div>
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={CleanForm}>Cancel</button>
                        {
                            (formSubmitted)
                                ?
                                <button type="submit" className="save-btn" disabled >
                                    Save
                                </button>
                                :
                                <button type="submit" className="save-btn">
                                    Save
                                </button>
                        }
                    </div>
                </form>
            </section>
        </>
    )
}