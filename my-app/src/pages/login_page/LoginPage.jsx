import React from "react";
import "./globals.css";
import "./styleguide.css";
import "./style.css";

export default function LoginPage() {
  return (
          <div className="login_page">
      {/* Header Bar */}
      <div className="header-bar">
        <p className="date-time">27 Oct 2023 | Fri | 04:36:21 PM</p>
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
            <div className="color-box" style={{ backgroundColor: "#ffea02" }}></div>
            <div className="color-box" style={{ backgroundColor: "#f88eef" }}></div>
            <div className="color-box" style={{ backgroundColor: "#3702ff" }}></div>
          </div>
          <a href="#">हिन्दी में</a>
        </div>
      </div>

      {/* Top Menu */}
      <header className="top-menu">
        <div className="logo-container">
          <img
            className="ashok-logo"
            src="ashok1.jpeg"
            alt="Ministry of Tribal Affairs Logo"
          />
          <div className="logo-text">Ministry of Tribal Affairs</div>
        </div>
        <nav className="navbar">
          <a href="/" className="nav-item">Home</a>
          <a href="#" className="nav-item">Dashboard</a>
          <a href="#" className="nav-item">About</a>
          <a href="#" className="nav-item">Act and Rule</a>
          <a href="#" className="nav-item">Contact</a>
          <a href="#" className="nav-item">Feedback</a>
          <a href="#" className="nav-item">Meri Yojna Book</a>
          <a href="#" className="nav-item">Public Grievances</a>
          <a href="#" className="nav-item active">Login</a>
        </nav>
      </header>

      {/* Login Content */}
      <main className="content-area">
        <div className="login-box">
          <form>
            <h1>Login</h1>
            <p>Please enter your Phone number</p>
            <input type="text" placeholder="Phone Number" required />
            <div className = "OTP-btn">
              <a href = "#" className = "OTP-btn">Send OTP</a>
            </div>
            <input type="password" placeholder="OTP" required />
            <div className="login-btn">
              <a href = "/CitizenDashboard" className="login-btn">Login</a>
            </div>
            <p className="signup-link">
              Not a member? <a href="/SignUpPage">Sign up</a>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Content managed by Ministry of Tribal Affairs, Govt. of India</p>
        <div className="separator"></div>
        <p>Website design and development by VanSetu</p>
      </footer>
    </div>
  );
}
