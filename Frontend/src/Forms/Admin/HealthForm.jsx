// src/Forms/Admin/HealthForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const HealthForm = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    alert("Health provider registration submitted ✅");
  };

  return (
    <div className="form-container">
      <FormHeader
        title="Join as Health Service Provider"
        subtitle="Hospital, Clinic, Pharmacy & Individual"
      />

      <StepIndicator step={step} />

      {step === 1 && (
        <StepWrapper>
          <h3>Account Holder Information</h3>
          <input placeholder="Full Name" />
          <input placeholder="Email" />
          <input placeholder="Mobile Number" />
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <h3>Professional Details</h3>

          <select>
            <option>Account Role</option>
            <option>Hospital Owner</option>
            <option>Clinic Owner</option>
            <option>Pharmacy</option>
            <option>Individual</option>
          </select>

          <select>
            <option>Entity Type</option>
            <option>Hospital</option>
            <option>Clinic</option>
            <option>Pharmacy</option>
            <option>Individual</option>
          </select>

          <select>
            <option>Ownership Type</option>
            <option>Private</option>
            <option>Government</option>
            <option>Trust</option>
            <option>Individual</option>
          </select>

          <input placeholder="Registration License Number" />
          <input placeholder="Issuing Authority" />
          <input type="date" />
          <input type="date" />
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <h3>Membership & Payment</h3>
          <select>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <select>
            <option>Easypaisa</option>
          </select>
        </StepWrapper>
      )}

      <FormNavigation step={step} setStep={setStep} onSubmit={handleSubmit} />
    </div>
  );
};

export default HealthForm;
