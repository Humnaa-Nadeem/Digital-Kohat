// src/Forms/Common/StepIndicator.jsx
import "./stepIndicator.css";

const StepIndicator = ({ step, totalSteps = 3 }) => {
  return (
    <div className="step-indicator">
      <p>
        Step <strong>{step}</strong> of <strong>{totalSteps}</strong>
      </p>

      <div className="step-bar">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`step-dot ${step >= num ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
