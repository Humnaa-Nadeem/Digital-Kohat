// src/Forms/Common/FormNavigation.jsx
import "./formNavigation.css";

const FormNavigation = ({
  step,
  setStep,
  totalSteps = 3,
  onSubmit,
}) => {
  return (
    <div className="form-navigation">
      {step > 1 && (
        <button
          className="nav-btn secondary"
          onClick={() => setStep(step - 1)}
        >
          ← Back
        </button>
      )}

      {step < totalSteps && (
        <button
          className="nav-btn primary"
          onClick={() => setStep(step + 1)}
        >
          Next →
        </button>
      )}

      {step === totalSteps && (
        <button className="nav-btn primary" onClick={onSubmit}>
          ✔ Confirm & Submit
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
