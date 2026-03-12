// src/Forms/Admin/EducationForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const EducationForm = () => {
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    alert("Education provider registered ✅");
  };

  return (
    <div className="form-container">
      <FormHeader title="Join as Education Provider" />

      <StepIndicator step={step} />

      {step === 1 && (
        <StepWrapper>
          <h3>Basic Info</h3>
          <input placeholder="Account Holder Name" />
          <input placeholder="Email" />
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <h3>Institute Details</h3>

          <select>
            <option>Role</option>
            <option>Owner</option>
            <option>Principal</option>
            <option>Director</option>
            <option>Manager</option>
          </select>

          <select>
            <option>Institute Type</option>
            <option>School</option>
            <option>College</option>
            <option>University</option>
            <option>Academy</option>
            <option>Training Center</option>
          </select>

          <input placeholder="Institute Name" />
          <input placeholder="Full Address" />
          <input placeholder="Years of Establishment" />

          <select>
            <option>Issuing Authority</option>
            <option>HEC</option>
            <option>BISE</option>
            <option>FBISE</option>
            <option>NAVTTC</option>
          </select>
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <h3>Membership</h3>
          <select>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <select>
            <option>Easypaisa</option>
            <option>JazzCash</option>
          </select>
        </StepWrapper>
      )}

      <FormNavigation step={step} setStep={setStep} onSubmit={handleSubmit} />
    </div>
  );
};

export default EducationForm;
