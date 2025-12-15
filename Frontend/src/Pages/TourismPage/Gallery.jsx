import { useEffect, useState } from "react";
import "./TourismHome.css";
import { useNavigate } from "react-router-dom";
import { GalleryImages } from "../../Store/Tourism_store";

export const Gallery = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  return (
    <section className="Tourism-cata-pg-sec">
      <div className={showList ? "lft-sec showList" : "lft-sec"}>
        <h2 className="sector" onClick={() => navigate(`/tourism`)}>Tourism</h2>
        <div className="institute-hd-lst">
          <h2 className="institute-hd">Photo Gallery</h2>
        </div>
      </div>

      <div className="main-sec">
        <div className="showLstBtn" onClick={() => setShowList(!showList)}>
          {showList ? <>&times;</> : <>&#9776;</>}
        </div>
        <div className="cata-pg-banner">
          <h1 className="cata-pg-main-hd">Kohat Tourism Gallery</h1>
          <p>View amazing photos of Kohat tourist spots.</p>
        </div>
        <div className="cata-card-cont">
          {GalleryImages.map((img, i) => (
            <div className="cata-pg-card" key={i}>
              <img src={img} alt={`Gallery ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
