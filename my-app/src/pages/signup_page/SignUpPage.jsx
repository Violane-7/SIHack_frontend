import React, { useState, useEffect } from "react";
import "./style.css";

export default function SignUpPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = dateTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobile.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setOtpSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    if (mobile === "9510014815") {
      window.location.href = "/CitizenDashboard"; // placeholder
    } else if (mobile === "9896976474") {
      window.location.href = "/OfficialDashboard"; // placeholder
    } else {
      setError("Invalid mobile number or OTP.");
    }
  };

  return (
    <div className="signup-page">
      {/* Header Bar */}
      <div className="header-bar">
        <p className="date-time">
          {formattedDate} | {formattedTime}
        </p>
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
          <form onSubmit={otpSent ? handleSubmit : handleSendOtp}>
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
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Mobile Number"
                  required
                  value={mobile}
                  onChange={e => setMobile(e.target.value.replace(/\D/, ""))}
                  disabled={otpSent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select id="role" required>
                  <option value="" disabled selected>
                    Select Role
                  </option>
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
              </div>
              <div className="form-group">
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

            {/* OTP Section */}
            <div className="otp-section">
              {!otpSent && (
                <div className="button-container" style={{ display: "flex", gap: 12 }}>
                  <button type="reset" className="reset-btn">
                    Reset
                  </button>
                  <button type="submit" className="OTP-btn-link">
                    Send OTP
                  </button>
                </div>
              )}
              {otpSent && (
                <>
                  <div className="form-group">
                    <label htmlFor="mobile-otp">Enter OTP</label>
                    <input
                      type="tel"
                      id="mobile-otp"
                      placeholder="OTP"
                      required
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="button-container" style={{ display: "flex", gap: 12 }}>
                    <button type="reset" className="reset-btn">
                      Reset
                    </button>
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
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
