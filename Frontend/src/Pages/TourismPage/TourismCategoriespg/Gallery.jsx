import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryImages } from "../../../Store/Tourism_store";
import "./TourismCategories.css";
import { getMergedData } from "../../../utils/dataMerger";

export const Gallery = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);

  // Merge static gallery with registered 'Gallery' items
  const rawImages = getMergedData(GalleryImages, "Tourism", "Gallery");

  // Normalize data structure since registered items have 'img' instead of 'src'
  const images = rawImages.map(item => ({
    ...item,
    src: item.src || item.img // Handle both formats
  }));

  return (
    <section className="Tourism-Cata-Pg-Sec">
      {/* Left sidebar */}
      <div className={showList ? "lft-sec showList" : "lft-sec"}>
        <h2 className="sector" onClick={() => navigate(`/tourism`)}>
          Tourism
        </h2>
        <div className="institute-hd-lst">
          <h2 className="institute-hd">Photo Gallery</h2>
        </div>
      </div>

      {/* Main content */}
      <div className="main-sec">
        {/* Toggle button for mobile sidebar */}
        <div className="showLstBtn" onClick={() => setShowList(!showList)}>
          {showList ? "×" : "☰"}
        </div>

        {/* Banner */}
        <div className="cata-pg-banner">
          <h1 className="cata-pg-main-h tr-cata-pg-main-hd">Kohat Tourism Gallery</h1>
          <p>View amazing photos of Kohat tourist spots.</p>
        </div>

        {/* Gallery cards */}
        <div className="cata-card-cont">
          {images.map((img) => (
            <div className="cata-pg-card premium-card" key={img.id}>
              <div className="card-img-container" style={{ height: "250px" }}>
                <img src={img.src} alt={`Gallery ${img.id}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
