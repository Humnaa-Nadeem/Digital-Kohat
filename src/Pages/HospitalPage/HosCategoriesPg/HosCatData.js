// Local data for Hospital categories (keeps structure like Edu_store but scoped to HosCategoriesPg)
export const Hospitals = [
  { HospitalName: "Kohat General Hospital", id: 1 },
  { HospitalName: "City Care Hospital", id: 2 }
];

export const HospitalCardDta = [
  { img: "https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg", InstName: "Kohat General Hospital", Desc: "Emergency & inpatient services.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/40568/hospital-medical-healthcare-doctor-40568.jpeg", InstName: "City Care Hospital", Desc: "Outpatient and diagnostics.", id: "2", btn_txt: "Read More" }
];

export const Hospital_Details = [
  { id: 1, type: "Hospital", name: "Kohat General Hospital", about: "Comprehensive emergency & inpatient care.", aboutImage: "https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg", contact: { phone: "+92 300 1234567" } },
  { id: 2, type: "Hospital", name: "City Care Hospital", about: "Quick diagnostics and outpatient services.", aboutImage: "https://images.pexels.com/photos/40568/hospital-medical-healthcare-doctor-40568.jpeg", contact: { phone: "+92 300 7654321" } }
];

export const Clinics = [ { ClinicName: "Downtown Clinic", id: 1 }, { ClinicName: "Family Health Center", id: 2 } ];
export const ClinicCardDta = [ { img: "https://images.pexels.com/photos/433267/pexels-photo-433267.jpeg", InstName: "Downtown Clinic", Desc: "Primary care and specialist consultations.", id: "1", btn_txt: "Read More" }, { img: "https://images.pexels.com/photos/1170976/pexels-photo-1170976.jpeg", InstName: "Family Health Center", Desc: "Family medicine and preventive care.", id: "2", btn_txt: "Read More" } ];
export const Clinic_Details = [ { id: 1, name: "Downtown Clinic", about: "Friendly clinic for GP consultations.", aboutImage: "" }, { id: 2, name: "Family Health Center", about: "Preventive healthcare for families.", aboutImage: "" } ];

export const Pharmacies = [ { PharmacyName: "Central Pharmacy", id: 1 } ];
export const PharmacyCardDta = [ { img: "https://images.pexels.com/photos/5938/healthcare-medicine-doctor-nurse.jpg", InstName: "Central Pharmacy", Desc: "Open late with delivery.", id: "1", btn_txt: "Read More" } ];
export const Pharmacy_Details = [ { id: 1, name: "Central Pharmacy", about: "Local pharmacy providing medicines.", aboutImage: "" } ];

export const Diagnostics = [ { DiagnosticName: "Advanced Diagnostics", id: 1 } ];
export const DiagnosticCardDta = [ { img: "https://images.pexels.com/photos/263402/healthcare-doctor-medicine-health-263402.jpeg", InstName: "Advanced Diagnostics", Desc: "Lab & imaging services.", id: "1", btn_txt: "Read More" } ];
export const Diagnostic_Details = [ { id: 1, name: "Advanced Diagnostics", about: "Full-service laboratory and imaging center.", aboutImage: "" } ];

export const Ambulance = [ { ServiceName: "24/7 Ambulance", id: 1 } ];
export const AmbulanceCardDta = [ { img: "https://images.pexels.com/photos/54266/pexels-photo-54266.jpeg", InstName: "24/7 Ambulance", Desc: "Fast emergency transport.", id: "1", btn_txt: "Call" } ];
export const Ambulance_Details = [ { id: 1, name: "24/7 Ambulance", about: "Rapid response ambulance services.", aboutImage: "" } ];

export const Specialists = [ { SpecialistName: "Cardiology", id: 1 }, { SpecialistName: "Orthopedics", id: 2 } ];
export const SpecialistCardDta = [ { img: "https://images.pexels.com/photos/532758/doctor-medicine-healthcare-health-532758.jpeg", InstName: "Cardiology Clinic", Desc: "Expert heart care.", id: "1", btn_txt: "Read More" } ];
export const Specialist_Details = [ { id: 1, name: "Cardiology Clinic", about: "Expert cardiologists.", aboutImage: "" } ];

export default {
  Hospitals,
  HospitalCardDta,
  Hospital_Details,
  Clinics,
  ClinicCardDta,
  Clinic_Details,
  Pharmacies,
  PharmacyCardDta,
  Pharmacy_Details,
  Diagnostics,
  DiagnosticCardDta,
  Diagnostic_Details,
  Ambulance,
  AmbulanceCardDta,
  Ambulance_Details,
  Specialists,
  SpecialistCardDta,
  Specialist_Details
};
