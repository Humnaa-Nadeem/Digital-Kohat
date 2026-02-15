// src/Forms/Admin/TourismForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const TourismForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="form-container">
      <FormHeader title="Join as Tourism Service Provider" />
      <StepIndicator step={step} />

      {step === 1 && (
        <StepWrapper>
          <input placeholder="Owner Name" />
          <input placeholder="Email" />
        </StepWrapper>
      )}

      {step === 2 && (
        <StepWrapper>
          <select>
            <option>Service Type</option>
            <option>Hotel</option>
            <option>Restaurant</option>
            <option>Tour Guide</option>
            <option>Travel Agency</option>
          </select>
          <input placeholder="Location" />
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

export default TourismForm;
