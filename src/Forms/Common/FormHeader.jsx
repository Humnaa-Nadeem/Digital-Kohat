// src/Forms/Common/FormHeader.jsx
import "./formHeader.css";

const FormHeader = ({ title, subtitle }) => {
  return (
    <div className="form-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default FormHeader;
