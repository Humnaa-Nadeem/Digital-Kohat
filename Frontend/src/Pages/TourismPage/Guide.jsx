import { useEffect, useState } from "react";
import "./TourismHome.css";
import { useLocation } from "react-router-dom";
import { GuideContent } from "../../Store/Tourism_store";
import { TourismLandingPage } from "../TourismPage/Landingpage/TourismLandingpage";

export const Guide = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  // Since GuideContent is a simple array, we can map ids 1,2,3...
  const dataWithId = GuideContent.map((v, i) => ({ ...v, id: i + 1 }));

  return (
    <>
      {id ? (
        <TourismLandingPage id={id} Alldata={dataWithId} />
      ) : (
        <section className="Tourism-cata-pg-sec">
          <div className="main-sec">
            <h1 className="cata-pg-main-hd">Travel Guide</h1>
            <p>Your complete travel guide for exploring Kohat.</p>
            <ul>
              {dataWithId.map((v) => (
                <li key={v.id}>{v.title}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};
