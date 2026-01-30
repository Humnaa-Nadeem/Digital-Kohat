// Local data for Hospital categories

export const Hospitals = [
  { HospitalName: "Kohat General Hospital", id: 1 },
  { HospitalName: "City Care Hospital", id: 2 },
  { HospitalName: "Al-Shifa Medical Complex", id: 3 },
  { HospitalName: "Combined Military Hospital (CMH)", id: 4 },
  { HospitalName: "KDA Teaching Hospital", id: 5 },
  { HospitalName: "Liaquat Memorial Hospital", id: 6 }
];

export const HospitalCardDta = [
  { img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg", InstName: "Kohat General Hospital", Desc: "Comprehensive emergency & inpatient services.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg", InstName: "City Care Hospital", Desc: "Advanced diagnostics and outpatient care.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg", InstName: "Al-Shifa Medical Complex", Desc: "Private healthcare with modern facilities.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg", InstName: "Combined Military Hospital", Desc: "Top-tier medical services for military & civilians.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg", InstName: "KDA Teaching Hospital", Desc: "Teaching hospital with specialized departments.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3951377/pexels-photo-3951377.jpeg", InstName: "Liaquat Memorial Hospital", Desc: "Trusted public healthcare institution.", id: "6", btn_txt: "Read More" }
];

export const Hospital_Details = [
  {
    id: 1, type: "Hospital", name: "Kohat General Hospital",
    about: "Kohat General Hospital is a leading healthcare provider offering a wide range of medical services. From emergency care to specialized surgeries, we are dedicated to patient well-being.",
    aboutImage: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg",
    location: "Sector 4, KDA Kohat",
    openingHours: { weekdays: "24/7", weekends: "24/7", emergency: "Available" },
    contact: { phone: "+92 900 1234567", email: "info@kgh.com.pk", website: "https://kgh.com.pk" },
    services: [
      { title: "Emergency Care", description: "24/7 emergency unit with trauma center." },
      { title: "Surgery", description: "General and specialized surgical procedures." },
      { title: "OPD", description: "Outpatient department for daily consultations." }
    ],
    facilities: ["ICU", "Ventilators", "Pharmacy", "Laboratory", "Cafeteria"],
    staff: [
      { name: "Dr. Ahmed Khan", description: "Chief Surgeon", image: "https://randomuser.me/api/portraits/men/10.jpg" },
      { name: "Dr. Sarah Ali", description: "Senior Physician", image: "https://randomuser.me/api/portraits/women/12.jpg" }
    ],
    gallery: ["https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg", "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg"]
  },
  {
    id: 2, type: "Hospital", name: "City Care Hospital",
    about: "City Care Hospital focuses on patient-centric care with modern diagnostic tools and a team of experienced doctors.",
    aboutImage: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg",
    location: "Peshawar Road, Kohat",
    openingHours: { weekdays: "24/7", weekends: "24/7", emergency: "Available" },
    contact: { phone: "+92 900 7654321", email: "contact@citycare.com", website: "https://citycare.com" },
    services: [
      { title: "Diagnostics", description: "MRI, CT Scan, and X-Ray services." },
      { title: "Pediatrics", description: "Specialized care for children." },
      { title: "Gynaecology", description: "Women's health and maternity center." }
    ],
    facilities: ["Private Rooms", "NICU", "Ultrasound", "Ambulance"],
    staff: [
      { name: "Dr. Bilal Ahmed", description: "Pediatrician", image: "https://randomuser.me/api/portraits/men/22.jpg" },
      { name: "Dr. Hina Khan", description: "Gynecologist", image: "https://randomuser.me/api/portraits/women/33.jpg" }
    ],
    gallery: ["https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg", "https://images.pexels.com/photos/3951377/pexels-photo-3951377.jpeg"]
  },
  // ... (Add dummy data for ids 3-6 if needed, using generic patterns)
  { id: 3, type: "Hospital", name: "Al-Shifa Medical Complex", about: "Private healthcare with modern facilities.", aboutImage: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg", location: "Bannu Road", contact: { phone: "0300-1122334" }, services: [], gallery: [] },
  { id: 4, type: "Hospital", name: "CMH Kohat", about: "Top-tier medical services.", aboutImage: "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg", location: "Cantt", contact: { phone: "0321-5566778" }, services: [], gallery: [] },
  { id: 5, type: "Hospital", name: "KDA Teaching Hospital", about: "Teaching hospital with specialized departments.", aboutImage: "https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg", location: "KDA", contact: { phone: "0333-9988776" }, services: [], gallery: [] },
  { id: 6, type: "Hospital", name: "Liaquat Memorial Hospital", about: "Trusted public healthcare institution.", aboutImage: "https://images.pexels.com/photos/3951377/pexels-photo-3951377.jpeg", location: "City Center", contact: { phone: "0345-4433221" }, services: [], gallery: [] }
];

export const Clinics = [
  { ClinicName: "Downtown Clinic", id: 1 },
  { ClinicName: "Family Health Center", id: 2 },
  { ClinicName: "Kohat Skin Centre", id: 3 },
  { ClinicName: "Dental Care Clinic", id: 4 },
  { ClinicName: "Eye Vision Clinic", id: 5 },
  { ClinicName: "Physio Rehab", id: 6 }
];
export const ClinicCardDta = [
  { img: "https://images.pexels.com/photos/433267/pexels-photo-433267.jpeg", InstName: "Downtown Clinic", Desc: "Primary care and specialist consultations.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/1170976/pexels-photo-1170976.jpeg", InstName: "Family Health Center", Desc: "Family medicine and preventive care.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg", InstName: "Kohat Skin Centre", Desc: "Expert dermatology services.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3845735/pexels-photo-3845735.jpeg", InstName: "Dental Care Clinic", Desc: "Advanced dental treatments.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg", InstName: "Eye Vision Clinic", Desc: "Complete eye care solutions.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg", InstName: "Physio Rehab", Desc: "Physical therapy and rehabilitation.", id: "6", btn_txt: "Read More" }
];
export const Clinic_Details = [
  { id: 1, type: "Clinic", name: "Downtown Clinic", about: "Friendly clinic for GP consultations.", location: "Main Bazaar", contact: { phone: "123-456" }, services: [{ title: "GP", description: "General Physician" }], gallery: [] },
  { id: 2, type: "Clinic", name: "Family Health Center", about: "Preventive healthcare for families.", location: "Satellite Town", contact: { phone: "789-012" }, services: [], gallery: [] },
  { id: 3, type: "Clinic", name: "Kohat Skin Centre", about: "Expert dermatology services.", location: "KDA", contact: { phone: "345-678" }, services: [], gallery: [] },
  { id: 4, type: "Clinic", name: "Dental Care Clinic", about: "Advanced dental treatments.", location: "Cantt", contact: { phone: "901-234" }, services: [], gallery: [] },
  { id: 5, type: "Clinic", name: "Eye Vision Clinic", about: "Complete eye care solutions.", location: "University Road", contact: { phone: "567-890" }, services: [], gallery: [] },
  { id: 6, type: "Clinic", name: "Physio Rehab", about: "Physical therapy and rehabilitation.", location: "Jungle Khel", contact: { phone: "112-233" }, services: [], gallery: [] }
];

export const Pharmacies = [
  { PharmacyName: "Central Pharmacy", id: 1 },
  { PharmacyName: "Kohat Medicos", id: 2 },
  { PharmacyName: "LifeCare Pharmacy", id: 3 },
  { PharmacyName: "Green Cross", id: 4 },
  { PharmacyName: "City Pharmacy", id: 5 },
  { PharmacyName: "Shaheen Chemist", id: 6 }
];
export const PharmacyCardDta = [
  { img: "https://images.pexels.com/photos/5938/healthcare-medicine-doctor-nurse.jpg", InstName: "Central Pharmacy", Desc: "Open late with free home delivery.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3683053/pexels-photo-3683053.jpeg", InstName: "Kohat Medicos", Desc: "Wide range of genuine medicines.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg", InstName: "LifeCare Pharmacy", Desc: "Vitamins, supplements & care products.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/5910953/pexels-photo-5910953.jpeg", InstName: "Green Cross", Desc: "Trusted name in pharmacy.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/806427/pexels-photo-806427.jpeg", InstName: "City Pharmacy", Desc: "Convenient location and best prices.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg", InstName: "Shaheen Chemist", Desc: "All kinds of local and imported medicines.", id: "6", btn_txt: "Read More" }
];
export const Pharmacy_Details = [
  { id: 1, type: "Pharmacy", name: "Central Pharmacy", about: "Your partner for health.", location: "Chowk", contact: { phone: "0300-1111111" }, services: [{ title: "Medicines", description: "All prescriptions" }], gallery: [] },
  { id: 2, type: "Pharmacy", name: "Kohat Medicos", about: "Quality medicines guaranteed.", location: "Bazaar", contact: { phone: "0300-2222222" }, services: [], gallery: [] },
  { id: 3, type: "Pharmacy", name: "LifeCare Pharmacy", about: "Health and wellness.", location: "KDA", contact: { phone: "0300-3333333" }, services: [], gallery: [] },
  { id: 4, type: "Pharmacy", name: "Green Cross", about: "Trusted services.", location: "Cantt", contact: { phone: "0300-4444444" }, services: [], gallery: [] },
  { id: 5, type: "Pharmacy", name: "City Pharmacy", about: "Best prices.", location: "City", contact: { phone: "0300-5555555" }, services: [], gallery: [] },
  { id: 6, type: "Pharmacy", name: "Shaheen Chemist", about: "Imported medicines.", location: "Jungle Khel", contact: { phone: "0300-6666666" }, services: [], gallery: [] }
];


export const Diagnostics = [
  { DiagnosticName: "Advanced Labs", id: 1 },
  { DiagnosticName: "Kohat X-Ray", id: 2 },
  { DiagnosticName: "City CT Scan", id: 3 },
  { DiagnosticName: "Al-Khidmat Lab", id: 4 },
  { DiagnosticName: "Eagle Labs", id: 5 },
  { DiagnosticName: "Standard Diagnostics", id: 6 }
];
export const DiagnosticCardDta = [
  { img: "https://images.pexels.com/photos/263402/healthcare-doctor-medicine-health-263402.jpeg", InstName: "Advanced Labs", Desc: "Precise lab testing services.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg", InstName: "Kohat X-Ray", Desc: "Digital X-Ray and imaging.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg", InstName: "City CT Scan", Desc: "Latest CT Scan machinery.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg", InstName: "Al-Khidmat Lab", Desc: "Affordable diagnostic services.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg", InstName: "Eagle Labs", Desc: "Reliable reports and fast service.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg", InstName: "Standard Diagnostics", Desc: "Quality you can trust.", id: "6", btn_txt: "Read More" }
];
export const Diagnostic_Details = [
  { id: 1, type: "Diagnostic Centre", name: "Advanced Labs", about: "High precision labs.", location: "KDA", contact: { phone: "0333-1112223" }, services: [{ title: "Blood Tests", description: "CBC, LFT, RFT" }], gallery: [] },
  { id: 2, type: "Diagnostic Centre", name: "Kohat X-Ray", about: "Best imaging center.", location: "City", contact: {}, services: [], gallery: [] },
  { id: 3, type: "Diagnostic Centre", name: "City CT Scan", about: "Modern scanning.", location: "Cantt", contact: {}, services: [], gallery: [] },
  { id: 4, type: "Diagnostic Centre", name: "Al-Khidmat Lab", about: "Charitable rates.", location: "Bazaar", contact: {}, services: [], gallery: [] },
  { id: 5, type: "Diagnostic Centre", name: "Eagle Labs", about: "Fast service.", location: "Road", contact: {}, services: [], gallery: [] },
  { id: 6, type: "Diagnostic Centre", name: "Standard Diagnostics", about: "Quality testing.", location: "Chowk", contact: {}, services: [], gallery: [] }
];

export const Ambulance = [
  { ServiceName: "Edhi Ambulance", id: 1 },
  { ServiceName: "Red Crescent", id: 2 },
  { ServiceName: "Rescue 1122", id: 3 },
  { ServiceName: "Al-Khidmat Ambulance", id: 4 },
  { ServiceName: "City Ambulance", id: 5 },
  { ServiceName: "Private Patient Transport", id: 6 }
];
export const AmbulanceCardDta = [
  { img: "https://images.pexels.com/photos/6520084/pexels-photo-6520084.jpeg", InstName: "Edhi Ambulance", Desc: "Nationwide emergency service.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/263402/healthcare-doctor-medicine-health-263402.jpeg", InstName: "Red Crescent", Desc: "Humanitarian relief & transport.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg", InstName: "Rescue 1122", Desc: "Government emergency service.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg", InstName: "Al-Khidmat Ambulance", Desc: "Community service transport.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg", InstName: "City Ambulance", Desc: "Private rapid response.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg", InstName: "Private Patient Transport", Desc: "Inter-city patient transfer.", id: "6", btn_txt: "Read More" }
];
export const Ambulance_Details = [
  { id: 1, type: "Ambulance Service", name: "Edhi Ambulance", about: "Reliable emergency service.", contact: { phone: "115" }, services: [{ title: "Emergency", description: "24/7" }], gallery: [] },
  { id: 2, type: "Ambulance Service", name: "Red Crescent", about: "First aid and transport.", contact: { phone: "1030" }, services: [], gallery: [] },
  { id: 3, type: "Ambulance Service", name: "Rescue 1122", about: "Official emergency service.", contact: { phone: "1122" }, services: [], gallery: [] },
  { id: 4, type: "Ambulance Service", name: "Al-Khidmat", about: "Welfare service.", contact: { phone: "1234" }, services: [], gallery: [] },
  { id: 5, type: "Ambulance Service", name: "City Ambulance", about: "Private service.", contact: { phone: "5678" }, services: [], gallery: [] },
  { id: 6, type: "Ambulance Service", name: "Patient Transport", about: "Non-emergency transport.", contact: { phone: "9101" }, services: [], gallery: [] }
];

export const Specialists = [
  { SpecialistName: "Cardiologists", id: 1 },
  { SpecialistName: "Dermatologists", id: 2 },
  { SpecialistName: "Orthopedic Surgeons", id: 3 },
  { SpecialistName: "Pediatricians", id: 4 },
  { SpecialistName: "Gynecologists", id: 5 },
  { SpecialistName: "Neurologists", id: 6 }
];
export const SpecialistCardDta = [
  { img: "https://images.pexels.com/photos/532758/doctor-medicine-healthcare-health-532758.jpeg", InstName: "Cardiologists", Desc: "Heart specialists.", id: "1", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/5998465/pexels-photo-5998465.jpeg", InstName: "Dermatologists", Desc: "Skin, hair, & nail care.", id: "2", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg", InstName: "Orthopedic Surgeons", Desc: "Bone and joint specialists.", id: "3", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/4546132/pexels-photo-4546132.jpeg", InstName: "Pediatricians", Desc: "Child health specialists.", id: "4", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/3902881/pexels-photo-3902881.jpeg", InstName: "Gynecologists", Desc: "Women's health experts.", id: "5", btn_txt: "Read More" },
  { img: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg", InstName: "Neurologists", Desc: "Brain and nerve specialists.", id: "6", btn_txt: "Read More" }
];
export const Specialist_Details = [
  { id: 1, type: "Specialist", name: "Cardiologists", about: "Expert heart care.", contact: { phone: "N/A" }, services: [{ title: "Checkups", description: "Regular heart checkups" }], gallery: [] },
  { id: 2, type: "Specialist", name: "Dermatologists", about: "Skin experts.", contact: {}, services: [], gallery: [] },
  { id: 3, type: "Specialist", name: "Orthopedic Surgeons", about: "Bone experts.", contact: {}, services: [], gallery: [] },
  { id: 4, type: "Specialist", name: "Pediatricians", about: "Child doctors.", contact: {}, services: [], gallery: [] },
  { id: 5, type: "Specialist", name: "Gynecologists", about: "Lady doctors.", contact: {}, services: [], gallery: [] },
  { id: 6, type: "Specialist", name: "Neurologists", about: "Brain experts.", contact: {}, services: [], gallery: [] }
];

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
