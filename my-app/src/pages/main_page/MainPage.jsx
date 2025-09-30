import React from "react";
import "./globals.css";
import "./styleguide.css";
import "./style.css";

import tribals from "./img/tribals.jpg";
import ashok from "./img/ashok1.jpeg";
import minister from "./img/minister.png";
import Map from 'C:/Users/Harsha Prasad/SIHack/my-app/src/MapComponent'

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="div">
        <img
          className="pic"
          src={tribals}
          alt="Main photograph of tribal life or community"
        />

        <div className="map"><Map/></div>
        <hr />

        {/* Header */}
        <div className="header">
          <div className="overlap-group">
            <nav
              className="navbar"
              style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
            >
              <a href="#" className="nav-item" style={{ color: "#1c2a78" }}>
                Home
              </a>
              <a href="#" className="nav-item">Dashboard</a>
              <a href="#" className="nav-item">About</a>
              <a href="#" className="nav-item">Act and Rule</a>
              <a href="#" className="nav-item">Contact</a>
              <a href="#" className="nav-item">Feedback</a>
              <a href="#" className="nav-item">Meri Yojna Book</a>
            </nav>
          </div>

          <div className="text-wrapper-4">Public Grievances</div>
          <a href="/Login" className="text-wrapper-5">Login</a>

          <div className="frame">
            <img className="ashok" src={ashok} alt="Ashok Emblem" />
            <div className="logo">
              <div className="div-wrapper">
                <div className="text-wrapper-6">Ministry of Tribal Affairs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Header Bar */}
        <header className="header-2">
          <div className="frame-2">
            <div className="text-wrapper-7">Skip to main content</div>
            <div className="text-wrapper-7">Screen Reader Access</div>
            <div className="text-wrapper-7">Text Size</div>
            <div className="frame-3">
              <div className="text-wrapper-7">A</div>
              <div className="frame-4"></div>
            </div>
            <div className="frame-5">
              <div className="rectangle"></div>
              <div className="rectangle-2"></div>
              <div className="rectangle-3"></div>
              <div className="rectangle-4"></div>
            </div>
            <p className="span-wrapper">
              <span className="span">
                <br />
                हिन्दी में
                <br />
              </span>
            </p>
          </div>
          <p className="link-skip-to-main">
            27 Oct 2023 | Fri | 04:36:21 PM
          </p>
        </header>

        <img className="minister" src={minister} alt="Photo of the minister" />

        <div className="text-wrapper-8">ABOUT THE MINISTRY</div>
        <p className="p">
          The Ministry was set up in 1999 after the bifurcation of Ministry of
          Social Justice and Empowerment with the objective of providing more
          focused approach on the integrated socio-economic development of the
          Scheduled Tribes (STs), the most underprivileged of the Indian Society,
          in a coordinated and planned manner.
        </p>

        {/* Footer */}
        <div className="footer">
          <div className="footer-2">
            <div className="frame-6">
              <p className="skip-to-main-content">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Content managed
                by&nbsp;&nbsp;Ministry of Tribal Affairs, Govt. of India
              </p>
              <p className="text-wrapper-7">
                Website design and development by VanSetu
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MainPage;



