// src/Forms/Admin/TechnicianForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const TechnicianForm = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    alert("Technician registration submitted successfully ✅");
  };

  return (
    <div className="form-container">
      <FormHeader
        title="Join as Technician"
        subtitle="Register yourself as a service provider"
      />

      <StepIndicator step={step} />

      {step === 1 && (
        <StepWrapper>
          <h3>Basic Information</h3>

          <div className="form-row">
            <div className="form-group">
              <input placeholder="First Name" />
            </div>
            <div className="form-group">
              <input placeholder="Last Name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input placeholder="Email" />
            </div>
            <div className="form-group">
              <input placeholder="Mobile Number" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input placeholder="Country / Region" />
            </div>
            <div className="form-group">
              <input placeholder="CNIC" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Confirm Password" />
            </div>
          </div>
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <h3>About Service</h3>

          <div className="form-group">
            <select>
              <option>Technician Type</option>
              <option>Electrical & Electronics</option>
              <option>Plumbing & Gas</option>
              <option>Painting & Construction</option>
              <option>Carpentry & Furniture</option>
              <option>Gardening & Outdoor</option>
            </select>
          </div>

          <div className="form-group">
            <select>
              <option>Service Mode</option>
              <option>Individual</option>
              <option>Team</option>
              <option>Company</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input placeholder="Years of Experience" />
            </div>
            <div className="form-group">
              <input placeholder="Skill Certification (optional)" />
            </div>
          </div>
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <h3>Membership & Payment</h3>

          <div className="form-group">
            <select>
              <option>Membership Plan</option>
              <option>Free</option>
              <option>Premium</option>
            </select>
          </div>

          <div className="form-group">
            <select>
              <option>Payment Method</option>
              <option>Easypaisa</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input type="date" />
            </div>
            <div className="form-group">
              <input type="date" />
            </div>
          </div>
        </StepWrapper>
      )}

      <FormNavigation
        step={step}
        setStep={setStep}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TechnicianForm;
