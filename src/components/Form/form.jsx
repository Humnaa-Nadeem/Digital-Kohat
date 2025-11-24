import { useState } from "react";
import "./form.css"
export const Form = ({setShowform}) => {

    // State that store data
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        Catagory: "",
        program: "",
        address: "",
        duration: "",
        catagoryTitle: ""
    });

    // Storing data while typing:
    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }))
    }

    // Form data after Submission
    const formSubmission = (e) => {
        e.preventDefault();
        if (data.Catagory !== "" && data.Catagory !== "Catagory") {
            if (data.Catagory === "Online Course" || data.Catagory === "Online Training") {
                data.address = "";
                data.program = "";
                console.log("OC & OT Data");
                console.log(data);
                clearFun();
            } else if (data.Catagory !== "University") {
                console.log(data.Catagory);
                data.duration = ""
                data.program = ""
                console.log("School, college etc");
                console.log(data);
                clearFun();
            } else {
                console.log("Uni Data")
                console.log(data);
                clearFun();
            }
        } else {
            alert("Please first select any catagory")
        }
    }

    // Clearing form;
    const clearFun = () => {
        setData({
            name: "",
            email: "",
            phone: "",
            Catagory: "",
            program: "",
            address: "",
            duration: "",
            catagoryTitle: ""
        })
    }

    return (
        <>
            <div className="form-cont">
                <form onSubmit={(e) => formSubmission(e)} className="rgstr-form">
                <div className="crs" onClick={() => setShowform(false)}>&times;</div>
                    <h2 className="rgst-frm-heading">Registration Form:</h2>
                    {/* Permanent Fields */}
                    <div className="label-cont">
                        <label htmlFor="name">Full name</label>
                        <input id="name" name="name" type="text" placeholder="Jane Doe" value={data.name} onChange={(e) => changeHandler(e)} required />
                    </div>
                    <div className="label-cont">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" name="phone" type="tel" min={10} placeholder="+92 300 0000000" value={data.phone} onChange={(e) => changeHandler(e)} required />
                    </div>

                    <div className="label-cont">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="jane@example.com" value={data.email} onChange={(e) => changeHandler(e)} required />
                    </div>

                    <div className="label-cont">
                        <label htmlFor="payment">Select Catagory</label>
                        <select id="payment" name="Catagory" value={data.Catagory} onChange={(e) => { changeHandler(e) }}>
                            <option>Catagory</option>
                            <option>School</option>
                            <option>College</option>
                            <option>University</option>
                            <option>Tutor</option>
                            <option>Online Course</option>
                            <option>Online Training</option>
                        </select>
                    </div>
                    {/* Dynamic Fields */}
                    {(data.Catagory === "" || data.Catagory === "Catagory")
                        ?
                        <></>
                        :
                        <div className="label-cont">
                            <label htmlFor="catagoryTitle">{data.Catagory} Name :</label>
                            <input id="catagoryTitle" name="catagoryTitle" type="text" placeholder={`${data.Catagory} name`} value={data.catagoryTitle} onChange={(e) => changeHandler(e)} required />
                            <br></br>
                            {(data.Catagory === "Online Course" || data.Catagory === "Online Training") ?
                                <>
                                    {/* ONLINE COURSES AND ONLINE TRAINING (OC & OT)*/}
                                    <label htmlFor="duration">Enrolling Date :</label>
                                    <input id="duration" name="duration" type="date" value={data.duration} onChange={(e) => changeHandler(e)} required />
                                </>
                                :
                                <>
                                    {/* OTHER THAN OC & OT */}
                                    <label htmlFor="Address">Address :</label>
                                    <input id="Address" name="address" type="text" placeholder="street , city , district, kp pakistan" value={data.address} onChange={(e) => changeHandler(e)} required />
                                    <br></br>
                                    {(data.Catagory === "University")
                                        ?
                                        <>
                                            {/* FOR UNIVERSITY */}
                                            <label htmlFor="progrm">Enter the Program Name :</label>
                                            <input id="progrm" name="program" type="text" placeholder="Computer Science" value={data.program} onChange={(e) => changeHandler(e)} required />
                                        </>
                                        :
                                        <></>
                                    }
                                </>
                            }
                        </div>
                    }
                    <div className="button-group">
                        <button type="submit" className="rgstr-pg-sbmt-btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}