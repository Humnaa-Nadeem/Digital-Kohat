import React from "react";

// Admin Forms
import TechnicianForm from "./Admin/TechnicianForm";
import HealthForm from "./Admin/HealthForm";
import EducationForm from "./Admin/EducationForm";
import FoodForm from "./Admin/FoodForm";
import BusinessForm from "./Admin/BusinessForm";
import TourismForm from "./Admin/TourismForm";

// User Form
import UserForm from "./User/UserForm";

const FormRenderer = ({ role, category }) => {
  if (role === "user") {
    return <UserForm />;
  }

  if (role === "admin") {
    switch (category) {
      case "technician":
        return <TechnicianForm />;
      case "health":
        return <HealthForm />;
      case "education":
        return <EducationForm />;
      case "food":
        return <FoodForm />;
      case "business":
        return <BusinessForm />;
      case "tourism":
        return <TourismForm />;
      default:
        return <p>Select a category</p>;
    }
  }

  return null;
};

export default FormRenderer;
