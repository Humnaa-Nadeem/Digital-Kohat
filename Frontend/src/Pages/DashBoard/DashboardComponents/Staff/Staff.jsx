import "./Staff.css";
import "../DashboardComponents.css";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    SendStaffAndStudentDataToDb,
    SendResAndPrfumncDataToDb,
    saveStaffInfo,
    maniURL
} from "../../../../ApiCalls/DashBoardApiCalls";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const DEFAULT_STAFF_IMAGE =
    "https://images.pexels.com/photos/18272659/pexels-photo-18272659.jpeg";

export const StaffMangingForm = ({ dashboardData }) => {

    // ===================== 
    // STAFF SECTION 
    // ======================
    // Setting the Db Data if any, instead of default data
    const [staff, setStaff] = useState(dashboardData?.staff || [{ image: "", name: "", description: "" }]);

    // Tracking changes
    const [staffSecChanged, setstaffSecChanged] = useState(false);

    // Deciding which kind of staffImage is:
    const resolveStaffImage = (image) => {
        if (image instanceof File) return URL.createObjectURL(image);
        if (typeof image === "string" && image.trim() !== "") return image;
        return DEFAULT_STAFF_IMAGE;
    };

    // Handling the data entry
    const handleStaffChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...staff];
        updated[index][name] = value || "";
        setStaff(updated);
        setstaffSecChanged(true);
    };

    // Handling the change in staff images
    const handleStaffImageChange = (index, file) => {
        const updated = [...staff];
        updated[index].image = file || DEFAULT_STAFF_IMAGE;
        setStaff(updated);
        setstaffSecChanged(true);
    };

    // Adding new staff
    const addStaffCard = () => {
        setStaff([
            ...staff,
            { image: "", name: "", description: "" }
        ])
        setstaffSecChanged(true);
    };

    // Deleting the staff image from cloudinary and Staff data
    const deleteStaffCard = (index) => {
        alert("Save the changes other , to see the output");
        const staffToDelete = staff[index];
        if (staffToDelete.image && typeof staffToDelete.image === "string") {
            axios.post(`${maniURL}/DeleteImage`, { imageUrl: staffToDelete.image }, { withCredentials: true })
                .then(res => console.log(res.data))
                .catch(err => console.error(err));
        }
        setStaff(staff.filter((_, i) => i !== index));
        setstaffSecChanged(true);
    };

    // %%%%%% Form Submission of "STAFF INFO" Section %%%%%%%
    const saveStaff = (e) => {
        e.preventDefault();
        saveStaffInfo(staff, setstaffSecChanged);
    };

    // ==========================
    // STAFF & STUDENTS (SandS) 
    // ==========================
    // Getting the new fields if any added by admin.
    let customSandSFieldsOfDb = [];
    let [newSandSFields, setnewSandSFields] = useState(customSandSFieldsOfDb);
    useEffect(() => {
        if (dashboardData?.StaffAndStudent) {
            let RandPObj = { ...dashboardData?.StaffAndStudent };
            for (const key in RandPObj) {
                if (key !== "Total_Students" && key !== "Total_Teachers" && key !== "Qualification" && key !== "Ratio" && key !== "Medium") {
                    customSandSFieldsOfDb.push(key);
                }
            }
            setnewSandSFields(customSandSFieldsOfDb.map((v) => v));
        }
    }, [dashboardData]);

    // Setting the Db Data if any, instead of default data
    const [staffAndStudnt, setStaffAndStudnt] = useState(dashboardData?.StaffAndStudent || {
        Total_Students: "",
        Total_Teachers: "",
        Qualification: "",
        Ratio: "",
        Medium: ""
    });

    // Tracking changes
    const [staffAndStudSecChanged, setStaffAndStudSecChanged] = useState(false);

    // Handling the data entry
    const hndlStfAndStudntChng = (e) => {
        const { name, value } = e.target;
        setStaffAndStudnt({ ...staffAndStudnt, [name]: value || "" });
        setStaffAndStudSecChanged(true);
    };

    // Adding new field in Staff and Student Section
    const AddNewField = () => {
        let newFieldNme = prompt("Enter the field name. If it has two words, separate them with an underscore, e.g., First_Name.");
        if (newFieldNme) {
            setStaffAndStudnt({ ...staffAndStudnt, [newFieldNme]: "" });
            setnewSandSFields([...newSandSFields, newFieldNme]);
            setStaffAndStudSecChanged(true);
        }
    }

    // Deleting the staff and student sec field;
    const delTheSandSSecfield = (fieldName, fieldIdx) => {
        let updatedstaffAndStudnt = { ...staffAndStudnt };
        delete updatedstaffAndStudnt[fieldName];
        setStaffAndStudnt(updatedstaffAndStudnt);
        let updatedFields = newSandSFields.filter((_, i) => i !== fieldIdx);
        setnewSandSFields(updatedFields);
        setStaffAndStudSecChanged(true);
    }

    // %%%%%% Form Submission of "STAFF & STUDENTS" Section %%%%%%%
    const saveStaffAndStudent = (e) => {
        e.preventDefault();
        SendStaffAndStudentDataToDb(staffAndStudnt, setStaffAndStudSecChanged);
    };


    /* ================= RESULT & PERFORMANCE (RandP) ================= */
    // Getting the new fields if any added by admin.
    let customRandPFieldsOfDb = [];
    let [newRandPFields, setnewRandPFields] = useState(customRandPFieldsOfDb);
    useEffect(() => {
        if (dashboardData.ResultAndPerformance) {
            let RandPObj = { ...dashboardData?.ResultAndPerformance };
            for (const key in RandPObj) {
                if (key !== "Pass_Precentage" && key !== "Top_Achievers" && key !== "Board_Result" && key !== "MDCAT_Performance") {
                    customRandPFieldsOfDb.push(key);
                }
            }
            setnewRandPFields(customRandPFieldsOfDb.map((v) => v));
        }
    }, []);

    // Setting the Db Data if any, instead of default data
    const [ResAndPrfrmnc, setResAndPrfrmnc] = useState(dashboardData?.ResultAndPerformance || {
        Pass_Precentage: "",
        Top_Achievers: "",
        Board_Result: "",
        MDCAT_Performance: ""
    });

    // Tracking changes
    const [resAndPrfSecChanged, setResAndPrfSecChanged] = useState(false);

    // Handling the data entry
    const hndlResAndPrfrmncChng = (e) => {
        const { name, value } = e.target;
        setResAndPrfrmnc({ ...ResAndPrfrmnc, [name]: value || "" });
        setResAndPrfSecChanged(true);
    };

    // Adding new field in Result and preformance Section
    const AddNewRandPField = () => {
        let newFieldNme = prompt("Enter the field name. If it has two words, separate them with an underscore, e.g., First_Name.");
        if (newFieldNme) {
            setResAndPrfrmnc({ ...ResAndPrfrmnc, [newFieldNme]: "" });
            setnewRandPFields([...newRandPFields, newFieldNme]);
            setResAndPrfSecChanged(true);
        }
    }
    // Deleting the Result and preformance sec field;
    const delTheRandPSecfield = (fieldName, fieldIdx) => {
        let updatedResAndPrfrmnc = { ...ResAndPrfrmnc };
        delete updatedResAndPrfrmnc[fieldName];
        setResAndPrfrmnc(updatedResAndPrfrmnc);
        let updatedFields = newRandPFields.filter((_, i) => i !== fieldIdx);
        setnewRandPFields(updatedFields);
        setResAndPrfSecChanged(true);
    }

    // %%%%%% Form Submission of "RESULT & PERFORMANCE" Section %%%%%%%
    const saveResAndPrfumnce = (e) => {
        e.preventDefault();
        SendResAndPrfumncDataToDb(ResAndPrfrmnc, setResAndPrfSecChanged);
    };

    return (
        <section className="form-area">
            <ToastContainer />
            {/* STAFF INFO */}
            <form onSubmit={saveStaff}>
                <h2>Staff Info</h2>
                <div className="DshbrdstaffCrd_Cont">
                    {staff.map((crdData, i) => (
                        <div className="DshbrdstaffCrd" key={i}>
                            <span className="StaffCrdDeltr" onClick={() => deleteStaffCard(i)}><FaTrash /></span>
                            <div className="imageAndPen">
                                <img src={resolveStaffImage(crdData.image)} className="DshbrdstaffImg" alt={crdData.name || "Staff"} />
                                <label className="StaffImgEditor">
                                    📤
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleStaffImageChange(i, e.target.files[0])}
                                    />
                                </label>
                            </div>
                            <input
                                className="StaffName"
                                name="name"
                                value={crdData.name || ""}
                                onChange={(e) => handleStaffChange(i, e)}
                                placeholder="Mr. John"
                                required
                            />
                            <textarea
                                className="StaffDesc"
                                name="description"
                                value={crdData.description || ""}
                                onChange={(e) => handleStaffChange(i, e)}
                                placeholder="Math Teacher"
                                required
                            />
                        </div>
                    ))}
                    <div className="DshbrdstaffCrd staffAdderCrd" onClick={addStaffCard}>
                        <div className="glassAndDarkDiv">
                            <div className="StaffAddIcon">+</div>
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" disabled={!staffSecChanged} className="save-btn">Save Staff</button>
                </div>
            </form>

            {/* STAFF & STUDENTS */}
            <br /><br />
            <form onSubmit={saveStaffAndStudent}>
                <h2>Staff & Students</h2>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Total Students</label>
                        <input type="number" name="Total_Students" value={staffAndStudnt.Total_Students || ""} onChange={hndlStfAndStudntChng} required />
                    </div>
                    <div className="form-group">
                        <label>Total Teachers</label>
                        <input type="number" name="Total_Teachers" value={staffAndStudnt.Total_Teachers || ""} onChange={hndlStfAndStudntChng} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Qualification</label>
                        <input type="text" name="Qualification" value={staffAndStudnt.Qualification || ""} onChange={hndlStfAndStudntChng} required />
                    </div>
                    <div className="form-group">
                        <label>Student & Staff Ratio</label>
                        <input type="text" name="Ratio" value={staffAndStudnt.Ratio || ""} onChange={hndlStfAndStudntChng} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Medium</label>
                        <input type="text" name="Medium" value={staffAndStudnt.Medium || ""} onChange={hndlStfAndStudntChng} required />
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
                <div className="form-actions">
                    <button type="submit" disabled={!staffAndStudSecChanged} className="save-btn">Save</button>
                </div>
            </form>

            {/* RESULT & PERFORMANCE */}
            <br /><br />
            <form onSubmit={saveResAndPrfumnce}>
                <h2>Result & Performance</h2>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Pass Percentage (%)</label>
                        <input type="number" name="Pass_Precentage" value={ResAndPrfrmnc.Pass_Precentage || ""} onChange={hndlResAndPrfrmncChng} required />
                    </div>
                    <div className="form-group">
                        <label>Top Achievers</label>
                        <input type="number" name="Top_Achievers" value={ResAndPrfrmnc.Top_Achievers || ""} onChange={hndlResAndPrfrmncChng} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label>Board Performance</label>
                        <input type="text" name="Board_Result" value={ResAndPrfrmnc.Board_Result || ""} onChange={hndlResAndPrfrmncChng} required />
                    </div>
                    <div className="form-group">
                        <label>ETEA Performance</label>
                        <input type="text" name="MDCAT_Performance" value={ResAndPrfrmnc.MDCAT_Performance || ""} onChange={hndlResAndPrfrmncChng} required />
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
                    <button type="submit" disabled={!resAndPrfSecChanged} className="save-btn">Save</button>
                </div>
            </form>
        </section >
    );
};
