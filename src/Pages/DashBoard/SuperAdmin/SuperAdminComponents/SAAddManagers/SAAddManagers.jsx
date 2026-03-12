import React, { useState } from "react";
import "./SAAddManagers.css";
import { CreateSAManager, SAManagerDelete } from "../../../../../ApiCalls/SuperAdminApiCall";
import { ToastContainer } from "react-toastify";

<<<<<<< HEAD
export const SAAddManagerForm = ({ SuperAdminEmail, SAManagers, setSAManagers }) => {
    const [formData, setFormData] = useState({
=======
export const SAAddManagerForm = ({ SAManagers, setSAManagers }) => {
    const [formData, setFormData] = useState({
        email: "",
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
        password: "",
        AccessTo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setFormData(prev => ({
            ...prev,
            ["email"]: SuperAdminEmail
        }));
        CreateSAManager(formData, setSAManagers);
    };

    return (

=======

        CreateSAManager(formData, setSAManagers);

        // reset form
        setFormData({
            email: "",
            password: "",
            AccessTo: ""
        });
    };

    return (
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
        <section>
            <div className="SMT_wrapper">
                <h2 className="SMT_title">Service Manager Assignment</h2>

                <table className="SMT_table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Manager Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {SAManagers?.length === 0 ? (
                            <tr>
<<<<<<< HEAD
                                <td colSpan="4" className="SMT_empty">
=======
                                <td colSpan="3" className="SMT_empty">
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                    No managers assigned yet
                                </td>
                            </tr>
                        ) : (
                            SAManagers?.map((m, i) => (
                                <tr key={i}>
                                    <td>
                                        <span className={`SMT_badge ${m.AccessTo.toLowerCase()}`}>
                                            {m.AccessTo}
                                        </span>
                                    </td>

<<<<<<< HEAD
                                    <td>{SuperAdminEmail}</td>
=======
                                    <td>{m.email}</td>
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7

                                    <td>
                                        <button
                                            className="SMT_delete_btn"
<<<<<<< HEAD
                                            onClick={() => SAManagerDelete(m.AccessTo, setSAManagers)}
=======
                                            onClick={() => SAManagerDelete(m._id, setSAManagers)}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
<<<<<<< HEAD
=======

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
            <div className="AM_form_wrapper">
                <ToastContainer />
                <h2 className="AM_title">Add Manager</h2>

                <form className="AM_form" onSubmit={handleSubmit}>
<<<<<<< HEAD
=======

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                    <div className="AM_field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="manager@email.com"
<<<<<<< HEAD
                            value={SuperAdminEmail}
                            readOnly
=======
                            value={formData.email}
                            onChange={handleChange}
>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                            required
                        />
                    </div>

                    <div className="AM_field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="AM_field">
                        <label>Category</label>
                        <select
                            name="AccessTo"
                            value={formData.AccessTo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Education">Education</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>

                    <button className="AM_submit_btn" type="submit">
                        Add Manager
                    </button>
<<<<<<< HEAD
=======

>>>>>>> 63ae032d7e029e799230b93ae5b4ee6835864db7
                </form>
            </div>
        </section>
    );
};