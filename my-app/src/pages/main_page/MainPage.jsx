import React, { useState, useEffect } from 'react';
import MapComponent from '../MapComponent';
// --- Sub-Component for the Map ---
const MapComponentt = () => (
    <MapComponent mode={1} />
);

// --- Main Page Component ---
const MainPage = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' });
  const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    
  // Using placeholders for images to avoid import errors
  const tribalsImg = "tribals.jpg";
  const ashokImg = "ashok1.jpeg";
  const ministerImg = "minister.png";

  const pageStyles = `
    .main-page-container { margin: 0; font-family: "Poppins", Helvetica, sans-serif; background-color: #f0f2f5; }
    .main-page { display: flex; flex-direction: column; background-color: #ffffff; }
    
    /* Header Bar Styles */
    .header-bar { width: 100%; height: 44px; display: flex; justify-content: space-between; align-items: center; background-color: #1c2a78; color: #ffffff; padding: 0 5%; box-sizing: border-box; font-size: 13px; }
    .header-bar a { color: #ffffff; text-decoration: none; }
    .header-links { display: flex; align-items: center; gap: 15px; }
    .header-links .separator { width: 1px; height: 18px; background-color: #ffffff; }
    .text-size-controls, .color-controls { display: flex; align-items: center; gap: 5px; }
    .text-size-btn { cursor: pointer; }
    .color-box { width: 15px; height: 15px; border: 1px solid #ffffff; cursor: pointer; }

    /* Top Menu Styles */
    .top-menu { width: 100%; height: 100px; display: flex; justify-content: space-between; align-items: center; padding: 0 5%; box-sizing: border-box; border-bottom: 1px solid #e0e0e0; }
    .logo-container { display: flex; align-items: center; gap: 12px; }
    .ashok-logo { width: 70px; height: 70px; }
    .logo-text { font-weight: 500; color: #1c2a78; font-size: 16px; max-width: 180px; }
    .navbar { display: flex; align-items: center; gap: 25px; }
    .nav-item { font-weight: 500; font-size: 14px; color: #666666; text-decoration: none; cursor: pointer; }
    .nav-item.active, .nav-item:hover { color: #1c2a78; }

    /* Hero Image */
    .hero-image {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }

    /* --- MODIFIED: Styles for the new combined section --- */
    .combined-section {
        display: flex;
        padding: 50px 5%;
        gap: 40px;
        background-color: #ffffff;
        border-bottom: 1px solid #e0e0e0;
    }
    .map-column {
        flex: 1;
        min-height: 400px; /* Ensure map has height */
    }
    .about-column {
        flex: 1;
    }
    .about-column h2 {
        font-size: 28px;
        color: #1c2a78;
        margin-top: 0;
        margin-bottom: 20px;
    }
    .about-content {
        display: flex;
        gap: 30px;
        align-items: flex-start;
    }
    .about-text {
        flex: 2; /* Give more space to the text */
    }
    .about-text p {
        font-size: 16px;
        line-height: 1.8;
        color: #555;
        margin: 0;
    }
    .minister-profile {
        flex: 1; /* Give less space to the photo */
        text-align: center;
    }
    .minister-photo {
        width: 100%;
        max-width: 200px;
        border: 2px solid #e0e0e0;
        padding: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-bottom: 10px;
    }
    .minister-caption {
        font-size: 14px;
        color: #333;
    }
    .minister-caption span {
        display: block;
        font-size: 12px;
        color: #777;
    }

    /* Map Container */
    .map-container {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
    }
    
    /* Footer Styles */
    .footer { width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; gap: 15px; background-color: #1c2a78; color: #ffffff; font-size: 13px; padding: 0 15%; box-sizing: border-box; }
    .footer .separator { width: 1px; height: 18px; background-color: #ffffff; }
  `;

  return (
    <div className="main-page-container">
      <style>{pageStyles}</style>
      <div className="main-page">
        {/* Header Bar */}
        <div className="header-bar">
            <p className="date-time">{formattedDate} | {formattedTime}</p>
             <div className="header-links">
                <a href="#">Skip to main content</a>
                <div className="separator"></div>
                <a href="#">Screen Reader Access</a>
                <a href="#">Text Size</a>
                <div className="text-size-controls">
                  <div className="text-size-btn">-</div>
                  <div className="text-size-btn">A</div>
                  <div className="text-size-btn">+</div>
                </div>
                <div className="color-controls">
                  <div className="color-box" style={{ backgroundColor: "white" }}></div>
                  <div className="color-box" style={{ backgroundColor: "yellow" }}></div>
                  <div className="color-box" style={{ backgroundColor: "blue" }}></div>
                </div>
                <a href="#">हिन्दी में</a>
              </div>
        </div>

        {/* Top Menu */}
        <header className="top-menu">
            <div className="logo-container">
                <img className="ashok-logo" src={ashokImg} alt="Ministry Logo" />
                <div className="logo-text">Ministry of Tribal Affairs</div>
            </div>
            <nav className="navbar">
                <a href="#" className="nav-item active">Home</a>
                <a href="#" className="nav-item">Dashboard</a>
                <a href="#" className="nav-item">About</a>
                <a href="#" className="nav-item">Act and Rule</a>
                <a href="#" className="nav-item">Contact</a>
                <a href="#" className="nav-item">Feedback</a>
                <a href="#" className="nav-item">Meri Yojna Book</a>
                <a href="#" className="nav-item">Public Grievances</a>
                <a href="/Login" className="nav-item">Login</a>
            </nav>
        </header>

        {/* Hero Image */}
        <img className="hero-image" src={tribalsImg} alt="Main photograph of tribal life or community" />

        {/* --- MODIFIED: New Combined About and Map Section --- */}
        <section className="combined-section">
            <div className="map-column">
                <MapComponentt/>
            </div>
            <div className="about-column">
                <h2>ABOUT THE MINISTRY</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            The Ministry was set up in 1999 after the bifurcation of Ministry of Social Justice and Empowerment with the objective of providing more focused approach on the integrated socio-economic development of the Scheduled Tribes (STs), the most underprivileged of the Indian Society, in a coordinated and planned manner.
                        </p>
                    </div>
                    <div className="minister-profile">
                        <img className="minister-photo" src={ministerImg} alt="Photo of the minister" />
                        <div className="minister-caption">
                            Shri Arjun Munda
                            <span>(Hon'ble Minister)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="footer">
            <p>Content managed by Ministry of Tribal Affairs, Govt. of India</p>
            <div className="separator"></div>
            <p>Website design and development by VanSetu</p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;

