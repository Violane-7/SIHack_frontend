import React, { useState, useEffect } from "react";

// Note: Replace with your actual logo path
const logoUrl = "ashok1.jpeg";

// --- Sub-Component for Citizen Information (Sidebar) ---
const Citizen = () => {
    const [citizenData, setCitizenData] = useState(null);

    useEffect(() => {
        // In a real app, you would fetch this data based on the logged-in user.
        const mockCitizenData = {
            "Name": "Priya Patel",
            "Community": "Santhal",
            "Land Size": "2.5 Acres",
            "Population": "N/A",
            "Village": "Rayanal",
            "Pincode": "580023",
            "State": "Karnataka",
            "Document ID": "DWD/KL/HUB/0789",
            "Claim Type": "Individual",
            "Current Status": "Approved"
        };
        setCitizenData(mockCitizenData);
    }, []);

    return (
        <div className="citizen-info-container">
            <div className="citizen-info-title">CITIZEN INFORMATION</div>
            {citizenData ? (
                <div className="citizen-info-grid">
                    {Object.entries(citizenData).map(([key, value]) => (
                        <React.Fragment key={key}>
                            <div className="citizen-info-label">{key}</div>
                            <div className="citizen-info-data">{value}</div>
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <div>Loading Information...</div>
            )}
        </div>
    );
};

// --- Sub-Component for Implementation Status ---
const Implementation = () => {
    const [claimsData, setClaimsData] = useState(null);

    useEffect(() => {
        const mockImplementationData = { "Filed": "12", "Approved": "7", "Rejected": "4" };
        setClaimsData(mockImplementationData);
    }, []);

    return (
        <div className="implementation-container">
            <div className="implementation-title">CURRENT STATUS OF IMPLEMENTATION</div>
            <div className="implementation-cards">
                <div className="implementation-card">
                    <div className="implementation-card-title">Total claims filed</div>
                    <div className="implementation-card-data">{claimsData ? claimsData.Filed : '...'}</div>
                </div>
                <div className="implementation-card">
                    <div className="implementation-card-title">Total claims approved</div>
                    <div className="implementation-card-data">{claimsData ? claimsData.Approved : '...'}</div>
                </div>
                <div className="implementation-card">
                    <div className="implementation-card-title">Total claims rejected</div>
                    <div className="implementation-card-data">{claimsData ? claimsData.Rejected : '...'}</div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component for the Map ---
const MapComponent = () => (
    <div className="map-container">
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.5,12.9,77.7,13.1&layer=mapnik&marker=12.97,77.59"
            style={{ border: 'none', borderRadius: '12px' }}
        ></iframe>
    </div>
);

// --- Main Citizen Dashboard Component ---
const CitizenDashboard = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' });
  const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const pageStyles = `
    .citizen-dashboard-container { margin: 0; font-family: "Poppins", Helvetica, sans-serif; background-color: #f0f2f5; }
    .citizen-dashboard { display: flex; flex-direction: column; min-height: 100vh; background-color: #ffffff; }
    
    /* Header Bar Styles */
    .header-bar { width: 100%; height: 44px; display: flex; justify-content: space-between; align-items: center; background-color: #1c2a78; color: #ffffff; padding: 0 5%; box-sizing: border-box; font-size: 13px; flex-shrink: 0; }
    .header-bar a { color: #ffffff; text-decoration: none; }
    .header-links { display: flex; align-items: center; gap: 15px; }
    .header-links .separator { width: 1px; height: 18px; background-color: #ffffff; }
    .text-size-controls, .color-controls { display: flex; align-items: center; gap: 5px; }
    .text-size-btn { cursor: pointer; }
    .color-box { width: 15px; height: 15px; border: 1px solid #ffffff; cursor: pointer; }

    /* Top Menu Styles */
    .top-menu { width: 100%; height: 80px; display: flex; justify-content: space-between; align-items: center; padding: 0 5%; box-sizing: border-box; border-bottom: 1px solid #e0e0e0; flex-shrink: 0; }
    .logo-container { display: flex; align-items: center; gap: 12px; }
    .ashok-logo { width: 60px; height: 60px; }
    .logo-text { font-weight: 500; color: #1c2a78; font-size: 16px; max-width: 180px; }
    .navbar { display: flex; align-items: center; gap: 25px; }
    .nav-item { font-weight: 500; font-size: 14px; color: #666666; text-decoration: none; cursor: pointer; }
    .nav-item.active, .nav-item:hover { color: #1c2a78; }

    /* Main Content Layout */
    .dashboard-main-content { display: flex; flex-grow: 1; padding: 20px; gap: 20px; background-color: #f0f2f5; }
    .dashboard-sidebar { width: 45%; flex-shrink: 0; }
    .dashboard-content-panel { width: 55%; display: flex; flex-direction: column; gap: 20px; }
    
    /* Citizen Component Styles */
    .citizen-info-container { background-color: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #dee2e6; height: 100%; box-sizing: border-box; }
    .citizen-info-title { font-weight: 600; color: #000000; font-size: 20px; text-align: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #dee2e6; }
    .citizen-info-grid { display: grid; grid-template-columns: auto 1fr; gap: 12px 15px; align-items: center; }
    .citizen-info-label { background-color: #1c2a78; color: white; padding: 10px 12px; border-radius: 8px; font-size: 14px; font-weight: 500; text-align: center; white-space: nowrap; }
    .citizen-info-data { background-color: #f8f9fa; border: 1px solid #ced4da; padding: 10px 12px; border-radius: 8px; font-size: 14px; }

    /* Implementation Component Styles */
    .implementation-container { background-color: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #dee2e6; }
    .implementation-title { font-weight: 600; text-align: center; margin-bottom: 15px; font-size: 16px; }
    .implementation-cards { display: flex; gap: 15px; }
    .implementation-card { flex: 1; }
    .implementation-card-title { background-color: #1c2a78; color: white; padding: 10px; border-radius: 8px; text-align: center; font-size: 14px; }
    .implementation-card-data { height: 80px; border: 1px solid #dee2e6; border-radius: 8px; margin-top: 10px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: #1c2a78; }

    /* Map Component Styles */
    .map-container { flex-grow: 1; border-radius: 16px; border: 1px solid #1c2a78; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; }
    
    /* Footer Styles */
    .footer { width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; gap: 15px; background-color: #1c2a78; color: #ffffff; font-size: 13px; padding: 0 15%; box-sizing: border-box; flex-shrink: 0; }
  `;

  return (
    <div className="citizen-dashboard-container">
      <style>{pageStyles}</style>
      <div className="citizen-dashboard">
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
                <img className="ashok-logo" src={logoUrl} alt="Ministry Logo" />
                <div className="logo-text">Ministry of Tribal Affairs</div>
            </div>
            <nav className="navbar">
                <a href="/" className="nav-item">Home</a>
                <a href="#" className="nav-item active">Dashboard</a>
                <a href="#" className="nav-item">About</a>
                <a href="#" className="nav-item">Public Grievances</a>
                <a href="#" className="nav-item">Feedback</a>
                <a href="/MyYojnaBook" className="nav-item">Meri Yojna Book</a>
                <a href="/" className="nav-item">Logout</a>
            </nav>
        </header>
        
        {/* Main Content */}
        <main className="dashboard-main-content">
          <aside className="dashboard-sidebar">
            <Citizen />
          </aside>
          <section className="dashboard-content-panel">
            <Implementation />
            <MapComponent />
          </section>
        </main>

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

export default CitizenDashboard;

