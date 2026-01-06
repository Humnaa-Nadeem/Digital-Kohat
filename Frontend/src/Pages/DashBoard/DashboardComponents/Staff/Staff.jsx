import "./Staff.css";
import "../DashboardComponents.css";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export const StaffMangingForm = () => {

    // ********************* Staff Data *******************
    const [staff, setStaff] = useState([
        { image: "", name: "", description: "" }
    ]);

    // Handle input change
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedStaff = [...staff];
        updatedStaff[index][name] = value;
        setStaff(updatedStaff);
    };

    // Add new staff card
    const addStaffCard = () => {
        setStaff([
            ...staff,
            { image: "", name: "", description: "" }
        ]);
    };

    // Delete staff card
    const deleteStaffCard = (index) => {
        const updatedStaff = staff.filter((_, i) => i !== index);
        setStaff(updatedStaff);
    };

    // *************** Staff And Student(SandS) Section *****************
    let [newSandSFields, setnewSandSFields] = useState([]);
    let [staffAndStudnt, setStaffAndStudnt] = useState({
        TotalStudnts: "",
        TotalTeachrs: "",
        Qualification: "",
        SAndSRatio: "",
        medium: ""
    });
    // handling change in staff and student section's input fields;
    const hndlStfAndStudntChng = (e) => {
        let { name, value } = e.target;
        setStaffAndStudnt({ ...staffAndStudnt, [name]: value });
    }

    // Adding new field in Staff and Student Section
    const AddNewField = () => {
        let newFieldNme = prompt("Enter the field name.");
        if (newFieldNme) {
            setStaffAndStudnt({ ...staffAndStudnt, [newFieldNme]: "" });
            setnewSandSFields([...newSandSFields, newFieldNme]);
        }
    }
    // Deleting the staff and student sec field;
    const delTheSandSSecfield = (fieldName, fieldIdx) => {
        let updatedstaffAndStudnt = { ...staffAndStudnt };
        delete updatedstaffAndStudnt[fieldName];
        setStaffAndStudnt(updatedstaffAndStudnt);
        let updatedFields = newSandSFields.filter((_, i) => i !== fieldIdx);
        setnewSandSFields(updatedFields);
    }

    // ************* Result And Performance(RandP) Section ***************
    let [newRandPFields, setnewRandPFields] = useState([]);
    let [ResAndPrfrmnc, setResAndPrfrmnc] = useState({
        PassPrecentage: "",
        Top_Achvr: "",
        Bord_Prfmnc: "",
        EATA_Prfmnc: ""
    });
    // handling change in staff and student section's input fields;
    const hndlResAndPrfrmncChng = (e) => {
        let { name, value } = e.target;
        setResAndPrfrmnc({ ...ResAndPrfrmnc, [name]: value });
    }

    // Adding new field in Staff and Student Section
    const AddNewRandPField = () => {
        let newFieldNme = prompt("Enter the field name.");
        if (newFieldNme) {
            setResAndPrfrmnc({ ...ResAndPrfrmnc, [newFieldNme]: "" });
            setnewRandPFields([...newRandPFields, newFieldNme]);
        }
    }
    // Deleting the staff and student sec field;
    const delTheRandPSecfield = (fieldName, fieldIdx) => {
        let updatedResAndPrfrmnc = { ...ResAndPrfrmnc };
        delete updatedResAndPrfrmnc[fieldName];
        setResAndPrfrmnc(updatedResAndPrfrmnc);
        let updatedFields = newRandPFields.filter((_, i) => i !== fieldIdx);
        setnewRandPFields(updatedFields);
    }

    // #################### Form Submission #############

    const formSubmitted = (e) => {
        e.preventDefault();
        let studentsStaff = staffAndStudnt;
        let resultsPerformance = ResAndPrfrmnc;
        console.log("StaffData = ", staff);
        console.log("Staff And Student Data = ", studentsStaff);
        console.log("Result and Preformance = ", resultsPerformance);
    }

    return (
        <section className="form-area">
            <form onSubmit={(e) => formSubmitted(e)}>
                <h2>Staff Info</h2>
                <div className="DshbrdstaffCrd_Cont">
                    {staff.map((crdData, i) => (
                        <div className="DshbrdstaffCrd" key={i}>
                            <span
                                className="StaffCrdDeltr"
                                onClick={() => deleteStaffCard(i)}
                            >
                                <FaTrash />
                            </span>

                            <div className="imageAndPen">
                                <img
                                    src={
                                        crdData.image ||
                                        "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg"
                                    }
                                    className="DshbrdstaffImg"
                                    alt="Staff"
                                />
                                <span className="StaffImgEditor">📤</span>
                            </div>

                            <input
                                className="StaffName"
                                name="name"
                                value={crdData.name}
                                onChange={(e) => handleChange(i, e)}
                                placeholder="Mr. John"
                                required
                            />

                            <textarea
                                className="StaffDesc"
                                name="description"
                                value={crdData.description}
                                onChange={(e) => handleChange(i, e)}
                                placeholder="Mr. John is a Math Teacher"
                                required
                            />
                        </div>
                    ))}

                    {/* Add Card */}
                    <div className="DshbrdstaffCrd staffAdderCrd" onClick={addStaffCard}>
                        <div className="glassAndDarkDiv">
                            <div className="StaffAddIcon">+</div>
                        </div>
                    </div>
                </div>
                {/*==============================
                 Staff & Students Section
                 ================================*/}
                <br></br>
                <br></br>
                <h2>Staff & Students</h2>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Total Students</label>
                        <input type="number" value={staffAndStudnt.TotalStudnts} name="TotalStudnts" placeholder="1234" onChange={(e) => hndlStfAndStudntChng(e)} required />
                    </div>
                    <div className="form-group">
                        <label >Total Teacher</label>
                        <input type="number" value={staffAndStudnt.TotalTeachrs} name="TotalTeachrs" placeholder="123" onChange={(e) => hndlStfAndStudntChng(e)} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Qualification</label>
                        <input type="text" value={staffAndStudnt.Qualification} name="Qualification" placeholder="BS/Master/B.Ed" onChange={(e) => hndlStfAndStudntChng(e)} required />
                    </div>
                    <div className="form-group">
                        <label >Student & Staff Ratio</label>
                        <input type="text" value={staffAndStudnt.SAndSRatio} name="SAndSRatio" placeholder="20:1" onChange={(e) => hndlStfAndStudntChng(e)} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Medium</label>
                        <input type="text" value={staffAndStudnt.medium} name="medium" placeholder="Phasto/Urdu/English" onChange={(e) => hndlStfAndStudntChng(e)} required />
                    </div>
                </div>
                {(newSandSFields[0])
                    ?
                    newSandSFields.map((field, index) => (
                        <div className="smallInputCont" key={index}>
                            <div className="form-group">
                                <label >{field}</label>
                                <input type="text" required name={field} value={staffAndStudnt[field]} onChange={e => hndlStfAndStudntChng(e)}></input>
                            </div>
                            <span className="deleteField" onClick={() => delTheSandSSecfield(field, index)}>
                                <FaTrash />
                            </span>
                        </div>
                    ))
                    :
                    <></>
                }
                <div className="form-group">
                    <span className="AddField" title="Add more fields" onClick={AddNewField}>
                        +
                    </span>
                </div>
                {/*==============================
                 Result And Performance Section
                 ================================*/}
                <br></br>
                <br></br>
                <h2>Result & Performance</h2>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Pass percentage (%)</label>
                        <input type="number" value={ResAndPrfrmnc.PassPrecentage} name="PassPrecentage" placeholder="87" onChange={(e) => hndlResAndPrfrmncChng(e)} required />
                    </div>
                    <div className="form-group">
                        <label >Top Achievers</label>
                        <input type="number" value={ResAndPrfrmnc.Top_Achvr} name="Top_Achvr" placeholder="20" onChange={(e) => hndlResAndPrfrmncChng(e)} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Board Results</label>
                        <input type="text" value={ResAndPrfrmnc.Bord_Prfmnc} name="Bord_Prfmnc" placeholder="Excellent" onChange={(e) => hndlResAndPrfrmncChng(e)} required />
                    </div>
                    <div className="form-group">
                        <label >ETEA Results</label>
                        <input type="text" value={ResAndPrfrmnc.EATA_Prfmnc} name="EATA_Prfmnc" placeholder="Excellent" onChange={(e) => hndlResAndPrfrmncChng(e)} required />
                    </div>
                </div>
                {(newRandPFields[0])
                    ?
                    newRandPFields.map((field, index) => (
                        <div className="smallInputCont" key={index}>
                            <div className="form-group">
                                <label >{field}</label>
                                <input type="text" required name={field} value={ResAndPrfrmnc[field]} onChange={e => hndlResAndPrfrmncChng(e)}></input>
                            </div>
                            <span className="deleteField" onClick={() => delTheRandPSecfield(field, index)}>
                                <FaTrash />
                            </span>
                        </div>
                    ))
                    :
                    <></>
                }
                <div className="form-group">
                    <span className="AddField" title="Add more fields" onClick={AddNewRandPField}>
                        +
                    </span>
                </div>
                <div className="form-actions">
                    <button className="save-btn">Save</button>
                </div>
            </form>
        </section>
    );
};
