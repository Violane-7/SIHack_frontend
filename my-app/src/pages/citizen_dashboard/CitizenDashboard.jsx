import React from "react";
import "./globals.css";
import "./styleguide.css";
import "./style.css";
import Map from 'C:/Users/Harsha Prasad/SIHack/my-app/src/MapComponent'
import Citizen from './Citizen'; // <-- IMPORT IT
import Implementation from './Implementation';

const CitizenDashboard = () => {
  return (
    <div className="citizen-dashboard">
      <div className="footer">
        <div className="div">
          <div className="frame">
            <p className="skip-to-main-content">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Content managed by&nbsp;&nbsp;Ministry of Tribal Affairs, Govt. of India
            </p>
            <img className="vector" src="img/vector-2.svg" />
            <p className="text-wrapper">Website design and development by VanSetu</p>
          </div>
        </div>
      </div>

      <div className="header">
        <p className="link-skip-to-main">27 Oct 2023 | Fri | 04:36:21 PM</p>
        <div className="frame">
          <div className="text-wrapper">Skip to main content</div>
          <img className="vector" src="img/image.svg" />
          <div className="text-wrapper">Screen Reader Access</div>
          <div className="text-wrapper">Text Size</div>
          <div className="frame-2">
            <div className="vector-wrapper"><img className="img" src="img/vector-1.svg" /></div>
            <div className="text-wrapper">A</div>
            <div className="frame-3"></div>
          </div>
          <div className="frame-4">
            <div className="rectangle"></div>
            <div className="rectangle-2"></div>
            <div className="rectangle-3"></div>
            <div className="rectangle-4"></div>
          </div>
          <p className="span-wrapper">
            <span className="span"><br />हिन्दी में</span>
          </p>
        </div>
      </div>

      <div className="header-2">
        <div className="navbar">
          <a href="/">Home</a>
          <div className="text-wrapper-3">Dashboard</div>
          <div className="text-wrapper-2">About</div>
          <div className="text-wrapper-2">Act &amp; Rule</div>
          <div className="text-wrapper-2">Contact</div>
          <div className="text-wrapper-2">Feedback</div>
          <a href = "/MyYojnaBook" className="text-wrapper-2">Meri Yojna Book</a>
        </div>
        <div className="text-wrapper-4">Public Grievances</div>
        <div className="text-wrapper-5">Logout</div>
        <div className="frame-5">
          <img
            className="ashok"
            src="ashok1.jpeg"
            alt="Profile"
          />
          <div className="logo">
            <div className="div-wrapper">
              <div className="text-wrapper-6">Ministry of Tribal Affairs</div>
            </div>
          </div>
        </div>
      </div>

      {/* CITIZEN INFORMATION section */}
      <Citizen/>

      <div className="map"><Map></Map></div>

      {/*implementation part*/}
      <Implementation/>

      <div className="searching">
        <div className="searching-background"><img className="star" src="img/star.svg" /></div>
        <button className="button">
          <div className="text-wrapper-29">Search</div>
        </button>
        <div className="searching-icon">
          <div className="search-line"><img className="vector-2" src="img/vector-3.svg" /></div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
