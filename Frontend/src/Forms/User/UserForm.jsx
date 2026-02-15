// src/Forms/User/UserForm.jsx
import "../forms.css";

export default function UserForm() {
  const handleSubmit = () => {
    alert("🎉 Welcome!\nYou have successfully joined Digital Smart Cities Hub 😊");
  };

  return (
    <div className="form-container">
      <h2>Join as User</h2>

      <div className="form-row">
        <div className="form-group">
          <i className="fas fa-user"></i>
          <input placeholder="First Name" />
        </div>
        <div className="form-group">
          <i className="fas fa-user"></i>
          <input placeholder="Last Name" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <i className="fas fa-globe"></i>
          <input placeholder="Country" />
        </div>
        <div className="form-group">
          <i className="fas fa-city"></i>
          <input placeholder="City" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <i className="fas fa-envelope"></i>
          <input placeholder="Email" />
        </div>
        <div className="form-group">
          <i className="fas fa-phone"></i>
          <input placeholder="Phone (optional)" />
        </div>
      </div>

      <button className="confirm-btn" onClick={handleSubmit}>
        ✔ Confirm
      </button>
    </div>
  );
}
