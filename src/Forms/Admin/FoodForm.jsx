// src/Forms/Admin/FoodForm.jsx
import { useState } from "react";
import StepIndicator from "../Common/StepIndicator";
import StepWrapper from "../Common/StepWrapper";
import FormNavigation from "../Common/FormNavigation";
import FormHeader from "../Common/FormHeader";
import "../forms.css";

const FoodForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="form-container">
      <FormHeader title="Join as Food Service Provider" />
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
            <option>Food Category</option>
            <option>Fine Dining</option>
            <option>Cafe</option>
            <option>Fast Food</option>
            <option>Local Cuisine</option>
            <option>Bakery</option>
            <option>Street Food</option>
          </select>

          <select>
            <option>Ownership Type</option>
            <option>Individual</option>
            <option>Partnership</option>
            <option>Company</option>
          </select>

          <input placeholder="Food Authority License (optional)" />
          <input type="date" />
        </StepWrapper>
      )}

      {step === 3 && (
        <StepWrapper>
          <select>
            <option>Free</option>
            <option>Premium</option>
          </select>
          <label>
            <input type="checkbox" /> I agree to terms & conditions
          </label>
        </StepWrapper>
      )}

      <FormNavigation step={step} setStep={setStep} />
    </div>
  );
};

export default FoodForm;
