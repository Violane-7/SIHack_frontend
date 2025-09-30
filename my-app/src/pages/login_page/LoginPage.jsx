import React, { useState } from "react";
import "./globals.css";
import "./styleguide.css";
import "./style.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setLoading(true); // show loading

    // Add a small delay (e.g. 800ms)
    setTimeout(() => {
      setLoading(false); // stop loading
      setOtpSent(true);
    }, 1200);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  // Optional: show some loading state
  setError(""); // clear previous error

  // Delay function
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(800); // 1 second delay

  if (!otp) {
    setError("Please enter the OTP.");
    return;
  }

  if (phone === "9510014815") {
    window.location.href = "/CitizenDashboard"; 
  } else if (phone === "9896976474") {
    window.location.href = "/OfficialDashboard"; 
  } else {
    setError("Invalid phone number or OTP.");
  }
};


  return (
    <div className="login_page">
      {/* ... header + nav unchanged ... */}

      {/* Login Content */}
      <main className="content-area">
        <div className="login-box">
          <form onSubmit={otpSent ? handleLogin : handleSendOtp}>
            <h1>Login</h1>
            <p>Please enter your Phone number</p>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/, ""))}
              required
              disabled={otpSent || loading}
            />

            {!otpSent && !loading && (
              <div className="OTP-btn">
                <button
                  type="submit"
                  className="OTP-btn"
                  style={{ padding:"10px 0px 0px 0px "}}
                >
                  Send OTP
                </button>
              </div>
            )}

            {loading && (
              <p style={{ marginTop: 12, color: "#555" }}>Sending OTP...</p>
            )}

            {otpSent && !loading && (
              <>
                <input
                  type="password"
                  placeholder="OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  style={{ marginTop: 16 }}
                />
                <div className="login-btn">
                  <button
                    type="submit"
                    className="login-btn"
                    style={{ marginTop:"5px",padding:"10px 0px 0px 0px "}}
                  >
                    Login
                  </button>
                </div>
              </>
            )}

            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <p className="signup-link" style={{ marginTop: 16 }}>
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
