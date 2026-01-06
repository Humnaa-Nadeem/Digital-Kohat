import "./Events.css";
import "../DashboardComponents.css";
import { useState } from "react";
const extraActivities = [
    "Debate",
    "Sports",
    "Science",
    "Arts",
    "Environment",
    "Photography",
    "Coding",
    "Service",
    "Quizzes",
    "Leadership"
];

export const EventManagingForm = () => {
    // =========================
    // Handling Event Section
    // =========================
    let [eventData, setEventData] = useState({
        title: "",
        catagory: "",
        location: "",
        time: "",
        Audience: ""
    });

    const handleEventChngs = (e) => {
        let { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    }

    // =========================
    // Handling Activity Section
    // =========================
    let [activities, setActivities] = useState(extraActivities);
    let [oferActvty, setOferActvty] = useState({
        Debate: false,
        Sports: false,
        Science: false,
        Arts: false,
        Environment: false,
        Photography: false,
        Coding: false,
        Service: false,
        Quizzes: false,
        Leadership: false
    });
    // Creating Items (Checkboxes of activities);
    let Item = activities.map((activity, i) => {
        return (
            <div className="actitvityCont" key={i}>
                <input type="checkbox" name={activity} id={activity} className="dshbrdCheckbox" onClick={(e) => hndleActvtyChange(e)} />
                <label htmlFor={activity} className="DshbrdActivityLabel">{activity}</label>
            </div>
        )
    });
    // Adding New Activity Field (Checkbox)
    const AddActivity = () => {
        setActivities([...activities, prompt("Enter the Activity Name")]);
    }
    // Handling Activity Section Changes
    const hndleActvtyChange = (e) => {
        let { name, checked } = e.target;
        setOferActvty({ ...oferActvty, [name]: checked });
    }

    // =========================
    // Final Function
    // =========================

    const FinalFun = (e) => {
        e.preventDefault();
        if (eventData.catagory === "--Select--" || eventData.catagory === "" || eventData.Audience === "--Select--" || eventData.Audience === "") {
            alert("Fill the form carefully.");
        } else {
            let extraActivities = [];
            for (const key in oferActvty) {
                if (oferActvty[key]) {
                    extraActivities.push(key);
                }
            }
            console.log("Event Data = ", eventData);
            console.log("Activities Data = ", extraActivities);
            cleanTheForm();
        }
    }

    const cleanTheForm = () => {
        setOferActvty({
            Debate: false,
            Sports: false,
            Science: false,
            Arts: false,
            Environment: false,
            Photography: false,
            Coding: false,
            Service: false,
            Quizzes: false,
            Leadership: false
        });
        setEventData({
            title: "",
            catagory: "",
            location: "",
            time: "",
            Audience: ""
        })
    }

    return (
        <section className="form-area">
            <form onSubmit={(e) => FinalFun(e)}>
                <h2>Events</h2>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Event Title</label>
                        <input type="text" name="title" value={eventData.title} onChange={(e) => handleEventChngs(e)} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Event Catagory</label>
                        <select type="text" name="catagory" value={eventData.catagory} onChange={(e) => handleEventChngs(e)}>
                            <option>--Select--</option>
                            <option>Academic</option>
                            <option>Sports</option>
                            <option>Cultural</option>
                            <option>Workshop</option>
                            <option>Workshop</option>
                            <option>Seminar</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Event Location</label>
                        <input type="text" name="location" value={eventData.location} onChange={(e) => handleEventChngs(e)} required />
                    </div>
                </div>
                <div className="smallInputCont">
                    <div className="form-group">
                        <label >Event Time</label>
                        <input type="date" name="time" value={eventData.time} onChange={(e) => handleEventChngs(e)} required />
                    </div>
                    <div className="form-group">
                        <label >Audience</label>
                        <select type="text" name="Audience" value={eventData.Audience} onChange={(e) => handleEventChngs(e)}>
                            <option>--Select--</option>
                            <option>Public</option>
                            <option>Institute Member</option>
                        </select>
                    </div>
                </div>
                <br></br>
                <br></br>
                <h2>Extra Activities</h2>
                <div className="activitiesCont">
                    {Item}
                </div>
                <br></br>
                <div className="AddField" onClick={AddActivity}>
                    +
                </div>
                <div className="form-actions">
                    <button className="save-btn">Save</button>
                </div>
            </form>
        </section>
    )
}