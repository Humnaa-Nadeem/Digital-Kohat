// src/Layouts/FormsLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./FormLayout.css";

const FormsLayout = ({ title, icon }) => {
  return (
    <div className="form-layout-container">
      <div className="form-layout-card">

        {icon && <div className="form-icon">{icon}</div>}
        {title && <h2 className="form-title">{title}</h2>}

        <div className="form-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default FormsLayout;
