import React from "react";
import "./style.css";

export default function SignUpPage() {
  return (
    <div className="signup-page">
      {/* Header Bar */}
      <div className="header-bar">
        <p className="date-time">18 Sep 2025 | Thu | 10:36:45 AM</p>
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

      {/* Sign Up Form */}
      <main className="content-area">
        <div className="signup-box">
          <form>
            <h1>New User Registration</h1>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="First Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Last Name" required />
              </div>
              
             <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input type="tel" id="mobile" placeholder="Mobile Number" required />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select id="role" required>
                  <option value="" disabled selected>Select Role</option>
                  <option value="dlc">District Level Committee</option>
                  <option value="sdlc">Sub Division Level Committee</option>
                  <option value="gs">Gram Sabha</option>
                  <option value="slc">State Level Committee</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation</label>
                <input type="text" id="designation" placeholder="Designation(official)" />
              </div>
              <div className="form-group">
                <label htmlFor="community">Community Name</label>
                <input type="text" id="community" placeholder="Community Name" />
              </div>
              <div className="form-group">
                <label htmlFor="village">Village</label>
                <input type="text" id="village" placeholder="Village" required />
              </div><div className="form-group">
                <label htmlFor="taluka">Taluka</label>
                <input type="text" id="taluka" placeholder="Taluka" required />
              </div>
              <div className="form-group">
                <label htmlFor="district">District</label>
                <input type="text" id="district" placeholder="District" required />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" placeholder="State" required />
              </div>
              


              <div className="form-group address-group">
                <label htmlFor="address">Address</label>
                <textarea id="address" placeholder="Enter your address (with landmark - optional)"></textarea>
              </div>
            </div>


              {/* ... other form-grid elements ... */}

              {/* Start of the new OTP section container */}
              <div className="otp-section">
                  <div className="form-group">
                      <label htmlFor="mobile-otp">Enter OTP</label>
                      <input type="tel" id="mobile-otp" placeholder="OTP" required />
                  </div>

                  <div className="OTP-btn">
                      <a href="#" className="OTP-btn-link">Send OTP</a>
                  </div>
              </div>
              {/* End of the new OTP section container */}

              {/* ... your other buttons (Reset, Submit) ... */}
            <div className="button-container">
              <button type="reset" className="reset-btn">Reset</button>
              <a href="/OfficialDashboard" className="submit-btn">Submit</a>
            </div>
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
