import "./App.css";
import { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Hero2 from "./components/hero2/Hero2";
import Cards from "./components/cards/Cards";
import WhyChooseUs from "./components/whychooseus/Whychooseus";
import Location from "./components/location/Location";
import Footer from "./components/footer/Footer";
import Hero1 from "./components/hero1/Hero1";
import Vision from "./components/vision/Vision";
import Freq from "./components/freq/Freq";
import HiddenTranslate from "./components/HiddenTranslate";
import FormsLayout from "./Layouts/FormsLayout";

// 👇 TEMP form (abhi demo ke liye)
const RegisterForm = ({ onClose }) => {
  return (
    <FormsLayout title="Register">
      <div style={{ textAlign: "center" }}>
        <h3>Register Form Here</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </FormsLayout>
  );
};

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <HiddenTranslate />

      <header>
        {/* 👇 yahin se magic hota hai */}
        <Navbar onRegisterClick={() => setShowRegister(true)} />
        <Hero1 />
        <Vision />
      </header>

      <main>
        <Cards />
        <WhyChooseUs />
        <Hero2 />
        <Freq />
        <Location />
      </main>

      <Footer />

      {/* 👇 Register Popup */}
      {showRegister && (
        <RegisterForm onClose={() => setShowRegister(false)} />
      )}
    </>
  );
}

export default App;
