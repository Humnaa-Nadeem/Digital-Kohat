// src/Layouts/FormsLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./FormLayout.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const FormsLayout = ({ title, icon }) => {
  return (
   <>
    <header>
                <Navbar />
            </header>
            <main>
                <div className="form-layout-container">
      <div className="form-layout-card">

        {icon && <div className="form-icon">{icon}</div>}
        {title && <h2 className="form-title">{title}</h2>}

        <div className="form-content">
          <Outlet />
        </div>

      </div>
    </div>
                <Outlet />
            </main>
            <Footer />
   </>
  );
};

export default FormsLayout;
