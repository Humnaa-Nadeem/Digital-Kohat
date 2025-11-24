import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Hero2 from "./components/hero2/Hero2";
import Cards from "./components/cards/Cards";
import WhyChooseUs from "./components/whychooseus/Whychooseus";
import Location from "./components/location/Location";
import Footer from "./components/footer/Footer";
import Hero1 from "./components/hero1/Hero1";

function App() {
  return (
    <div className="App">
     
      <Navbar/>
      <Hero1/>
      <Cards/>
      <WhyChooseUs/>
      <Hero2/>
     <Location/>
     <Footer/>
    </div>
  );
}

export default App;
