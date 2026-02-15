import { useState } from "react";
import "../Forms/Forms.css";

import HealthUser from "../Forms/User/HealthUser";
import EducationUser from "../Forms/User/EducationUser";
import BusinessUser from "../Forms/User/BusinessUser";
import TourismUser from "../Forms/User/TourismUser";
import FoodUser from "../Forms/User/FoodUser";

import HealthAdmin from "../Forms/Admin/HealthAdmin";
import EducationAdmin from "../Forms/Admin/EducationAdmin";
import BusinessAdmin from "../Forms/Admin/BusinessAdmin";
import TourismAdmin from "../Forms/Admin/TourismAdmin";
import FoodAdmin from "../Forms/Admin/FoodAdmin";

export default function SignUpForm() {
  const [role, setRole] = useState(null);
  const [domain, setDomain] = useState(null);

  const renderForm = () => {
    if (!role || !domain) return null;

    if (role === "user") {
      return {
        health: <HealthUser />,
        education: <EducationUser />,
        business: <BusinessUser />,
        tourism: <TourismUser />,
        food: <FoodUser />,
      }[domain];
    }

    if (role === "admin") {
      return {
        health: <HealthAdmin />,
        education: <EducationAdmin />,
        business: <BusinessAdmin />,
        tourism: <TourismAdmin />,
        food: <FoodAdmin />,
      }[domain];
    }
  };

  return (
    <div className="signup-form-page">
      <div className="signup-form-container">

        <h2>Register</h2>

        {/* STEP 1 — ROLE */}
        {!role && (
          <div className="role-selection fade-in">
            <label onClick={() => setRole("user")}>
              <input type="radio" />
              <i className="fas fa-user"></i> User
            </label>

            <label onClick={() => setRole("admin")}>
              <input type="radio" />
              <i className="fas fa-user-shield"></i> Admin
            </label>
          </div>
        )}

        {/* STEP 2 — DOMAIN */}
        {role && !domain && (
          <div className="domain-grid fade-in">
            <div className="domain-tile" onClick={() => setDomain("health")}>
              <i className="fas fa-hospital"></i> Health
            </div>
            <div className="domain-tile" onClick={() => setDomain("education")}>
              <i className="fas fa-graduation-cap"></i> Education
            </div>
            <div className="domain-tile" onClick={() => setDomain("business")}>
              <i className="fas fa-briefcase"></i> Business
            </div>
            <div className="domain-tile" onClick={() => setDomain("tourism")}>
              <i className="fas fa-plane"></i> Tourism
            </div>
            <div className="domain-tile" onClick={() => setDomain("food")}>
              <i className="fas fa-utensils"></i> Food
            </div>
          </div>
        )}

        {/* STEP 3 — FORM */}
        {role && domain && (
          <div className="fade-in">
            {renderForm()}
          </div>
        )}

      </div>
    </div>
  );
}
