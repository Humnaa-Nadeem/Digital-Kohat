import React, { useState, useEffect } from "react";
import "../../Forms/forms.css";

import HealthUser from "../../Forms/User/UserForm";
import HealthForm from "../../Forms/Admin/HealthForm";
import BusinessForm from "../../Forms/Admin/BusinessForm";
import TourismForm from "../../Forms/Admin/TourismForm";
import FoodForm from "../../Forms/Admin/FoodForm";
import TechnicianForm from "../../Forms/Admin/TechnicianForm";
import EducationForm from "../../Forms/Admin/EducationForm";

const SignUpForm = () => {
  const [role, setRole] = useState(null);
  const [domain, setDomain] = useState(null);

  // To handle fade-out for role and domain selectors
  const [hideRoleSelector, setHideRoleSelector] = useState(false);
  const [hideDomainSelector, setHideDomainSelector] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setDomain(null);
    setHideDomainSelector(false);
    // Trigger fade out after small delay
    setTimeout(() => setHideRoleSelector(true), 300);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    // Trigger fade out after small delay
    setTimeout(() => setHideDomainSelector(true), 300);
  };

  useEffect(() => {
    // Reset hiding if role or domain reset
    if (!role) setHideRoleSelector(false);
    if (!domain) setHideDomainSelector(false);
  }, [role, domain]);

  function renderForm(role, domain) {
    if (!role || !domain) return null;
    if (role === "user") {
      switch (domain) {
        case "health":
          return <HealthUser />;
        default:
          return null;
      }
    }
    if (role === "admin") {
      switch (domain) {
        case "health":
          return <HealthForm />;
        case "education":
          return <EducationForm />;
        case "business":
          return <BusinessForm />;
        case "tourism":
          return <TourismForm />;
        case "food":
          return <FoodForm />;
        case "technician":
          return <TechnicianForm />;
        default:
          return null;
      }
    }
  }

  return (
    <div className="signup-form-container">
      <h2>Register</h2>
      <div
        className={`role-selection ${hideRoleSelector ? "fade-out" : ""}`}
        aria-label="Role selection"
      >
        <label htmlFor="admin">
          <input
            id="admin"
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={handleRoleChange}
          />
          Admin
        </label>
        <label htmlFor="user">
          <input
            id="user"
            type="radio"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={handleRoleChange}
          />
          User
        </label>
      </div>

      {role && (
        <div
          className={`domain-selection ${hideDomainSelector ? "fade-out" : ""}`}
          aria-label="Domain selection"
        >
          <label htmlFor="domain-select">Select Domain:</label>
          <select
            id="domain-select"
            value={domain || ""}
            onChange={handleDomainChange}
          >
            <option value="" disabled>
              -- Select Domain --
            </option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="tourism">Tourism</option>
            <option value="food">Food</option>
            <option value="technician">Technician</option>
          </select>
        </div>
      )}

      <div className="form-fields">{renderForm(role, domain)}</div>
    </div>
  );
};

export default SignUpForm;
import React, { useState, useEffect } from "react";
import "../../Forms/forms.css";

import HealthUser from "../../Forms/User/UserForm";



import HealthForm from "../../Forms/Admin/HealthForm";
import BusinessForm from "../../Forms/Admin/BusinessForm";
import TourismForm from "../../Forms/Admin/TourismForm";
import FoodForm from "../../Forms/Admin/FoodForm";
import TechnicianForm from "../../Forms/Admin/TechnicianForm";
import EducationForm from "../../Forms/Admin/EducationForm";

const SignUpForm = () => {
  const [role, setRole] = useState(null);
  const [domain, setDomain] = useState(null);

  // To handle fade-out for role and domain selectors
  const [hideRoleSelector, setHideRoleSelector] = useState(false);
  const [hideDomainSelector, setHideDomainSelector] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setDomain(null);
    setHideDomainSelector(false);
    // Trigger fade out after small delay
    setTimeout(() => setHideRoleSelector(true), 300);
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    // Trigger fade out after small delay
    setTimeout(() => setHideDomainSelector(true), 300);
  };

  useEffect(() => {
    // Reset hiding if role or domain reset
    if (!role) setHideRoleSelector(false);
    if (!domain) setHideDomainSelector(false);
  }, [role, domain]);

  function renderForm(role, domain) {
    if (!role || !domain) return null;
    if (role === "user") {
      switch (domain) {
        case "health":
          return <HealthUser />;
        
        default:
          return null;
      }
    }
    if (role === "admin") {
      switch (domain) {
        case "health":
          return <HealthForm />;
        case "education":
          return <EducationForm />;
        case "business":
          return <BusinessForm />;
        case "tourism":
          return <TourismForm />;
        case "food":
          return <FoodForm />;
           case "Technician":
          return <TechnicianForm />;
        default:
          return null;
      }
    }
  }

  return (
    <div className="signup-form-container">
      <h2>Register</h2>
      <div
        className={`role-selection ${hideRoleSelector ? "fade-out" : ""}`}
        aria-label="Role selection"
      >
        <label htmlFor="admin">
          <input
            id="admin"
            type="radio"
            name="role"
            value="admin"
            checked={role === "admin"}
            onChange={handleRoleChange}
          />
          Admin
        </label>
        <label htmlFor="user">
          <input
            id="user"
            type="radio"
            name="role"
            value="user"
            checked={role === "user"}
            onChange={handleRoleChange}
          />
          User
        </label>
      </div>

      {role && (
        <div
          className={`domain-selection ${hideDomainSelector ? "fade-out" : ""}`}
          aria-label="Domain selection"
        >
          <label htmlFor="domain-select">Select Domain:</label>
          <select
            id="domain-select"
            value={domain || ""}
            onChange={handleDomainChange}
          >
            <option value="" disabled>
              -- Select Domain --
            </option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="tourism">Tourism</option>
            <option value="food">Food</option>
          </select>
        </div>
      )}

      <div className="form-fields">{renderForm(role, domain)}</div>
    </div>
  );
};

export default SignUpForm;
