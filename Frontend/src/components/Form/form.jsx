import { useState } from 'react';
import './form.css';
import { NewEduCataServiceReq } from '../../ApiCalls/ApiCalls';

const StepOne = ({ onNext, formData, handleChange }) => (
  <div className="form-content fade-in">
    <input type="text" name='fullname' value={formData.fullname} placeholder="Full Name" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="email" name='email' value={formData.email} placeholder="Email Address" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="password" name='password' value={formData.password} placeholder="Password" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="number" name='IDCard' value={formData.IDCard} placeholder="1420111223344" className="pill-input" onChange={(e) => handleChange(e)} required />
    <button type='button' onClick={onNext} className="btn-black">Next Step</button>
  </div>
);

const StepTwo = ({ onBack, formData, handleChange }) => (
  <div className="form-content fade-in">
    <input type="number" name='phonenumber' value={formData.phonenumber} placeholder="923131234567" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="number" name='whatsappnumber' value={formData.whatsappnumber} placeholder="WhatsApp number in above formate" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="text" name='address' value={formData.address} placeholder="Physical Address" className="pill-input" onChange={(e) => handleChange(e)} required />
    <input type="text" name='language' value={formData.language} placeholder="Language" className="pill-input" onChange={(e) => handleChange(e)} required />
    <div className="button-row">
      <button type='button' onClick={onBack} className="btn-gray">Back</button>
      <button type="submit" className="btn-black flex-grow">Complete Registration</button>
    </div>
  </div>
);

export const EduRegisterForm = ({ setShowform, serviceCategory = "Education" }) => {
  const [step, setStep] = useState(1);
  let [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phonenumber: "",
    whatsappnumber: "",
    address: "",
    language: "",
    IDCard: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phonenumber.length < 11 || formData.whatsappnumber.length < 11) {
      alert("Invalid Number is filled.");
    } else if (!formData.fullname || !formData.email || !formData.password) {
      alert("Fill the forms carefully.");
    } else {
      const category = serviceCategory === "Food" ? "Food" : "Education";
      const type = serviceCategory === "Food" ? "RESTAURANT" : "SCHOOL";

      const dataToSubmit = {    
        ...formData,
        catagory: category,
        type: type,
        Verified: false
      };

      NewEduCataServiceReq(dataToSubmit);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="main-card">
        {/* Left Branding Panel */}
        <div className="branding-panel">
          <div className="text-center">
            <h1>{step === 1 ? "Welcome!" : "Almost There!"}</h1>
            <p>{step === 1 ? "Let's start with the basics." : "We need a few more details for verbal contact."}</p>
            <div className="progress-dots">
              <div className={`dot-circle ${step === 1 ? 'SuprAEduFormactive' : ''}`}></div>
              <div className={`dot-circle ${step === 2 ? 'SuprAEduFormactive' : ''}`}></div>
            </div>
            <br></br>
            <button className='btn-gray' onClick={() => setShowform(false)}>Click here to go back.</button>
          </div>
        </div>

        {/* Right Form Panel */}
        <form className="form-panel" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="form-title">Register</h2>
          {step === 1 ? <StepOne onNext={() => setStep(2)} formData={formData} handleChange={handleChange} /> : <StepTwo onBack={() => setStep(1)} formData={formData} handleChange={handleChange} />}
        </form>
      </div>
    </div>
  );
};