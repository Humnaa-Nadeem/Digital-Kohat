import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormRenderer from "./FormRenderer";
import ErrorBoundary from "./Common/ErrorBoundary";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // steps: role | category | form
  const [step, setStep] = useState("role");
  const [role, setRole] = useState(null);
  const [category, setCategory] = useState(null);

  // 🔹 agar kisi section se wapas aaye ho (Join as Service Provider)
  useEffect(() => {
    if (location.state?.category) {
      setRole("admin");
      setCategory(location.state.category);
      setStep("form");
    }
  }, [location.state]);

  // 🔹 Role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);

    if (selectedRole === "user") {
      setStep("form");
    } else {
      setStep("category");
    }
  };

  // 🔹 Category selection (redirect to section home)
  const handleCategorySelect = (cat) => {
    setCategory(cat);

    switch (cat) {
      case "education":
        navigate("/edu");
        break;
      case "health":
        navigate("/hospital");
        break;
      case "food":
        navigate("/food");
        break;
      case "business":
        navigate("/business");
        break;
      case "technician":
        navigate("/tech");
        break;
      case "tourism":
        navigate("/tourism");
        break;
      default:
        break;
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* 🔹 STEP 1: ROLE SELECTION */}
        {step === "role" && (
          <>
            <h2>Join As</h2>

            <button
              className="primary-btn"
              onClick={() => handleRoleSelect("user")}
            >
              Join as User
            </button>

            <button
              className="secondary-btn"
              onClick={() => handleRoleSelect("admin")}
            >
              Join as Service Provider
            </button>
          </>
        )}

        {/* 🔹 STEP 2: CATEGORY SELECTION */}
        {step === "category" && (
          <>
            <h2>Select Your Category</h2>

            <div className="category-grid">
              <button onClick={() => handleCategorySelect("education")}>
                Education
              </button>
              <button onClick={() => handleCategorySelect("health")}>
                Health
              </button>
              <button onClick={() => handleCategorySelect("food")}>
                Food
              </button>
              <button onClick={() => handleCategorySelect("business")}>
                Business
              </button>
              <button onClick={() => handleCategorySelect("technician")}>
                Technician
              </button>
              <button onClick={() => handleCategorySelect("tourism")}>
                Tourism
              </button>
            </div>
          </>
        )}

        {/* 🔹 STEP 3: FORM RENDER */}
        {step === "form" && (
          <ErrorBoundary>
            <FormRenderer role={role} category={category} />
          </ErrorBoundary>
        )}

      </div>
    </div>
  );
};

export default Register;
