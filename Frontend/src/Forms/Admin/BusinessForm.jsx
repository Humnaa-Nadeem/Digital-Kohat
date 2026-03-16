// src/Forms/Admin/BusinessForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const BusinessForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="form-container">
      <FormHeader title="Join as Business Service Provider" />
      <StepIndicator step={step} />

      {step === 1 && (
        <StepWrapper>
          <input placeholder="Business Owner Name" />
          <input placeholder="Email" />
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <input placeholder="Business Name" />
          <select>
            <option>Business Type</option>
            <option>Shop</option>
            <option>Office</option>
            <option>Manufacturing</option>
            <option>Freelance</option>
          </select>
          <input placeholder="Business Address" />
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <select>
            <option>Free</option>
            <option>Premium</option>
          </select>
        </StepWrapper>
      )}

      <FormNavigation step={step} setStep={setStep} />
    </div>
  );
};

export default BusinessForm;
