// src/Pages/TourismPage/Landingpage/TourismLandingPage.jsx
import "./SingleLandingPage.css";
import { MdScience } from "react-icons/md";
import { FaArtstation, FaBaseballBall } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TourismLandingPage = ({ id, Alldata }) => {
  const navigate = useNavigate();

  // Get selected item
  const [fltrdData] = Alldata.filter(v => v.id === Number(id));

  if (!fltrdData) return <p>Item not found</p>;

  return (
    <section className="S_main_Sec">
      {/* GLASS HERO */}
      <section className="GlassHeroBG">
        <div className="GlassHeroBG-content">
          <h1>Welcome to <strong>{fltrdData.name}</strong></h1>
          <p className="GlassHeroBG-sub">{fltrdData.tagline}</p>
          <button className="GlassHeroBG-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className="blurShape s1"></div>
        <div className="blurShape s2"></div>
      </section>

      {/* ABOUT */}
      <section id="S_about" className="S_about">
        <div className="S_about-content">
          <h2 className="SP_Sec_hd">About</h2>
          <p>{fltrdData.about}</p>
        </div>
        <img src={fltrdData.aboutImage} alt={fltrdData.name} />
      </section>

      {/* STAFF */}
      {fltrdData.staff?.length > 0 && (
        <section id="S_staff" className="S_staff SP_Sec">
          <h2 className="SP_Sec_hd">Our Staff</h2>
          <div className="staff-crd-cont">
            {fltrdData.staff.map((staff, i) => (
              <div key={i} className="staff-card">
                <img src={staff.image} alt={staff.name} />
                <h3>{staff.name}</h3>
                <p>{staff.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EVENTS */}
      {fltrdData.events?.length > 0 && (
        <section className="S_events SP_Sec">
          <h2 className="SP_Sec_hd">Upcoming Events</h2>
          <div className="S_event-list">
            {fltrdData.events.map((event, i) => {
              let Icon;
              switch(event.icon) {
                case "MdScience":
                  Icon = MdScience;
                  break;
                case "FaArtstation":
                  Icon = FaArtstation;
                  break;
                case "FaBaseballBall":
                default:
                  Icon = FaBaseballBall;
              }
              return (
                <div key={i} className="S_event-card">
                  <Icon className="SP_Icon" />
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* QUICK INFO DASHBOARD */}
      {fltrdData.quickInfo && (
        <section className="QI-dashboard SP_Sec">
          <h2 className="dash-title SP_Sec_hd">Quick Info</h2>
          <div className="dash-grid">
            {fltrdData.quickInfo.facilities && (
              <div className="dash-card">
                <h2>Facilities</h2>
                <ul>
                  {fltrdData.quickInfo.facilities.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            {fltrdData.quickInfo.extraActivities && (
              <div className="dash-card">
                <h2>Extra Activities</h2>
                <ul>
                  {fltrdData.quickInfo.extraActivities.map((act, i) => <li key={i}>{act}</li>)}
                </ul>
              </div>
            )}
            {fltrdData.quickInfo.parentReviews && (
              <div className="dash-card">
                <h2>Reviews</h2>
                {fltrdData.quickInfo.parentReviews.map((rev, i) => <blockquote key={i}>{rev}</blockquote>)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {fltrdData.gallery?.length > 0 && (
        <section id="S_gallery" className="S_gallery SP_Sec">
          <h2 className="SP_Sec_hd">Gallery</h2>
          <div className="S_gallery-flex">
            {fltrdData.gallery.map((img, i) => <img key={i} src={img} alt={fltrdData.name} />)}
          </div>
        </section>
      )}

      {/* CONTACT */}
      {fltrdData.contact && (
        <section className="S_reach-us SP_Sec">
          <h2 className="SP_Sec_hd">Reach Us</h2>
          <div className="S_contact-cards">
            {fltrdData.contact.email && (
              <div className="S_card">
                <i>✉</i>
                <h3>Email</h3>
                <p><a href={`mailto:${fltrdData.contact.email}`}>{fltrdData.contact.email}</a></p>
              </div>
            )}
            {fltrdData.contact.phone && (
              <div className="S_card">
                <i>📞</i>
                <h3>Phone</h3>
                <p><a href={`tel:${fltrdData.contact.phone}`}>{fltrdData.contact.phone}</a></p>
              </div>
            )}
            {fltrdData.contact.website && (
              <div className="S_card">
                <i>🌐</i>
                <h3>Website</h3>
                <p><a href={fltrdData.contact.website} target="_blank" rel="noopener noreferrer">{fltrdData.contact.website}</a></p>
              </div>
            )}
          </div>
        </section>
      )}
    </section>
  );
};
