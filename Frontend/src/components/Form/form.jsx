import { useEffect, useState } from "react";
import "./form.css";
import { GetUserData, NewEduCataServiceReq } from "../../ApiCalls/ApiCalls";

/* =====================================================
CATEGORY → TYPE MAPPING
===================================================== */

const categoryTypes = {
  Education: ["School", "College", "University", "Academy", "Institute"],
  Health: ["Clinic", "Hospital", "Medical Store", "Laboratory", "Pharmacy"],
  IT: ["Software House", "Training Institute", "Tech Company"],
};

/* =====================================================
STEP ONE
===================================================== */

const StepOne = ({ onNext, formData, handleChange }) => (
  <div className="form-content fade-in">

    <div className="input-group">
      <label>Full Name</label>
      <input
        type="text"
        name="fullname"
        placeholder="John"
        value={formData.fullname}
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-group">
      <label>Email Address</label>
      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-group">
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

    <div className="input-group">
      <label>CNIC / ID Card Number</label>
      <input
        type="number"
        name="IDCard"
        value={formData.IDCard}
        onChange={handleChange}
        placeholder="1420111223344"
        required
      />
    </div>

    <div className="input-group">
      <label>Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {Object.keys(categoryTypes).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    <div className="input-group">
      <label>Type</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        disabled={!formData.category}
      >
        <option value="">Select Type</option>

        {formData.category &&
          categoryTypes[formData.category]?.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>
    </div>

    <button
      type="button"
      onClick={onNext}
      className="Edu-Reg-btn-primary flex-grow"
    >
      Continue →
    </button>
  </div>
);

/* =====================================================
STEP TWO
===================================================== */

const StepTwo = ({ onBack, formData, handleChange }) => (
  <div className="form-content fade-in">

    <div className="input-group">
      <label>Phone Number</label>
      <input
        type="number"
        name="phonenumber"
        value={formData.phonenumber}
        onChange={handleChange}
        placeholder="923131234567"
        required
      />
    </div>

    <div className="input-group">
      <label>WhatsApp Number</label>
      <input
        type="number"
        name="whatsappnumber"
        value={formData.whatsappnumber}
        onChange={handleChange}
        placeholder="923131234567"
        required
      />
    </div>

    <div className="input-group">
      <label>Physical Address</label>
      <input
        type="text"
        name="address"
        placeholder="Street , City , Country"
        value={formData.address}
        onChange={handleChange}
        required
      />
    </div>

    <div className="input-group">
      <label>Primary Language</label>
      <input
        type="text"
        name="language"
        placeholder="Pashto , Urdu , English"
        value={formData.language}
        onChange={handleChange}
        required
      />
    </div>

    <div className="button-row">
      <button
        type="button"
        onClick={onBack}
        className="Edu-form-btn-secondary"
      >
        ← Back
      </button>

      <button
        type="submit"
        className="Edu-Reg-btn-primary flex-grow"
      >
        Complete Registration
      </button>
    </div>
  </div>
);

/* =====================================================
EDUCATION / CATEGORY REGISTER FORM
===================================================== */

export const EduRegisterForm = ({ setShowform }) => {
  const [step, setStep] = useState(1);
  const [UserData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    whatsappnumber: "",
    address: "",
    language: "",
    IDCard: "",
    category: "",
    type: "",
  });

  /* =====================================================
  GET USER DATA
  ===================================================== */

  useEffect(() => {
    let loggedIn = localStorage.getItem("IsLoggedIn");
    if (loggedIn) {
      GetUserData(setUserData);
    }
  }, []);

  /* =====================================================
  AUTO FILL FORM WHEN USER DATA LOADS
  ===================================================== */

  useEffect(() => {
    if (UserData) {
      setFormData((prev) => ({
        ...prev,
        fullname: UserData?.fullName || "",
        email: UserData?.email || "",
        phonenumber: UserData?.phone || "",
        whatsappnumber: UserData?.phone || "",
        address: UserData?.address || "",
      }));
    }
  }, [UserData]);

  /* =====================================================
  HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { type: "" }),
    }));
  };

  /* =====================================================
  HANDLE SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (formData.phonenumber.length < 11 || formData.whatsappnumber.length < 11) {
      alert("Invalid Number is filled.");
    } else if (!formData.fullname || !formData.email || !formData.password) {
      alert("Fill the forms carefully.");
    } else {
      setFormData(prev => ({
        ...prev,
        ["catagory"]: "Education",
        ["type"]: "SCHOOL",
        ["Verified"]: false
      }));
      NewEduCataServiceReq(formData);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="main-card">

        {/* LEFT SIDE */}

        <div className="branding-panel">
          <div className="branding-content">

            <h1>{step === 1 ? "Welcome!" : "Almost There!"}</h1>

            <p>
              {step === 1
                ? "Let's start with basic information."
                : "We need a few more details to complete registration."}
            </p>

            <div className="progress-bar">
              <div className={`progress-step ${step >= 1 ? "active" : ""}`}></div>
              <div className={`progress-step ${step >= 2 ? "active" : ""}`}></div>
            </div>

            <button
              className="Edu-form-btn-secondary back-btn"
              onClick={() => setShowform(false)}
            >
              ← Go Back
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <form className="form-panel" onSubmit={handleSubmit}>

          <h2 className="form-title">Create Account</h2>

          {step === 1 ? (
            <StepOne
              onNext={() => setStep(2)}
              formData={formData}
              handleChange={handleChange}
            />
          ) : (
            <StepTwo
              onBack={() => setStep(1)}
              formData={formData}
              handleChange={handleChange}
            />
          )}

        </form>

      </div>
    </div>
  );
};