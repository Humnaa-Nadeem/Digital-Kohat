import { useState } from "react";
import "./form.css";

const serviceFields = {
  Education: [
    { label: "School/College/University Name", name: "categoryName", required: true },
    { label: "Program (if University)", name: "program", required: false },
    { label: "Address", name: "address", required: true },
  ],
  Tourism: [
    { label: "Tourism Place Name", name: "categoryName", required: true },
    { label: "Duration of Tour", name: "duration", required: false },
  ],
  Restaurant: [
    { label: "Restaurant Name", name: "categoryName", required: true },
    { label: "Address", name: "address", required: false },
  ],
  Hospital: [
    { label: "Hospital Name", name: "categoryName", required: true },
    { label: "Address", name: "address", required: true },
  ],
  Technician: [
    { label: "Technician Name", name: "categoryName", required: true },
    { label: "Service Area / Address", name: "address", required: false },
  ],
};

export const Form = ({ setShowform, serviceType }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceType || "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const formSubmission = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.phone) {
      return alert("Please fill all required fields!");
    }

    // Generate a fake user ID
    const userId = Date.now();
    const registeredUser = { id: userId, ...data };
    localStorage.setItem("registeredUser", JSON.stringify(registeredUser));

    console.log("Registered user:", registeredUser);
    alert(`Registered successfully! Your ID is ${userId}`);

    setShowform(false);
  };

  return (
    <div className="form-cont">
      <form onSubmit={formSubmission} className="rgstr-form">
        <div className="crs" onClick={() => setShowform(false)}>
          &times;
        </div>
        <h2 className="rgstr-frm-heading">Register for {serviceType}</h2>

        <label>Name</label>
        <input name="name" type="text" value={data.name} onChange={changeHandler} required />

        <label>Phone</label>
        <input name="phone" type="tel" value={data.phone} onChange={changeHandler} required />

        <label>Email</label>
        <input name="email" type="email" value={data.email} onChange={changeHandler} required />

        {/* Dynamic fields */}
        {serviceFields[serviceType]?.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <input
              name={field.name}
              type="text"
              value={data[field.name] || ""}
              onChange={changeHandler}
              required={field.required}
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
