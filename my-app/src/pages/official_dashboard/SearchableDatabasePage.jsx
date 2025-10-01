import React, { useState, useEffect } from 'react';

// Note: Replace with your actual logo path
const logoUrl = "ashok1.jpeg";

// --- MODIFIED: The mock database now includes Status, RejectionReason, and DocumentURL ---
const mockDB = [
    { "Claim_ID": "BLR/SD/ANE/0123", "Mobile_No": "9018371234", "Name": "Ram Sita", "Community": "Gond", "Village": "Adur", "Taluka": "Anekal", "District": "Bangalore", "State": "Karnataka", "Status": "Rejected", "RejectionReason": "Insufficient land evidence provided.", "DocumentURL": null },
    { "Claim_ID": "MYS/HD/NAN/0456", "Mobile_No": "9987654321", "Name": "Aarav Sharma", "Community": "Bhils", "Village": "Hullahalli", "Taluka": "Nanjangud", "District": "Mysore", "State": "Karnataka", "Status": "Approved", "RejectionReason": null, "DocumentURL": "/documents/MYS-0456-Approval.pdf" },
    { "Claim_ID": "DWD/KL/HUB/0789", "Mobile_No": "9765432109", "Name": "Priya Patel", "Community": "Santhal", "Village": "Rayanal", "Taluka": "Hubli", "District": "Dharwad", "State": "Karnataka", "Status": "Hold", "RejectionReason": "Awaiting SDLC clarification.", "DocumentURL": null },
    { "Claim_ID": "BLG/OS/TTG/1011", "Mobile_No": "9510014815", "Name": "Rohan Mehta", "Community": "Gond", "Village": "Dumerbahal", "Taluka": "Titlagarh", "District": "Balangir", "State": "Odisha", "Status": "Approved", "RejectionReason": null, "DocumentURL": "/scanned.jpeg" },
    { "Claim_ID": "SHI/SG/SHI/1213", "Mobile_No": "9543210987", "Name": "Anika Singh", "Community": "Khasi", "Village": "Kumsi", "Taluka": "Sagar", "District": "Shimoga", "State": "Karnataka", "Status": "Rejected", "RejectionReason": "GPS coordinates do not match submitted map.", "DocumentURL": null },
    { "Claim_ID": "MAN/UD/UDU/1415", "Mobile_No": "9432109876", "Name": "Vikram Reddy", "Community": "Toda", "Village": "Brahmavar", "Taluka": "Udupi", "District": "Udupi", "State": "Karnataka", "Status": "Hold", "RejectionReason": "Discrepancy in witness statements.", "DocumentURL": null },
    // --- NEW User with specified phone number and Approved status ---
    { "Claim_ID": "CHN/TP/SRI/2025", "Mobile_No": "9501927612", "Name": "Lakshmi Devi", "Community": "Gond", "Village": "Sriperumbudur", "Taluka": "Tiruvallur", "District": "Chennai", "State": "Tamil Nadu", "Status": "Approved", "RejectionReason": null, "DocumentURL": "/documents/CHN-2025-Approval.pdf" }
];


// --- Main Searchable Database Page Component ---
export default function SearchableDatabasePage() {
  const [dateTime, setDateTime] = useState(new Date());
  const [allClaims, setAllClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setAllClaims(mockDB);
    setFilteredClaims(mockDB);
  }, []);

  useEffect(() => {
    const results = allClaims.filter(claim =>
      Object.values(claim).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredClaims(results);
  }, [searchTerm, allClaims]);
  
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedDate = dateTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' });
  const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const pageStyles = `
    .db-page-container { margin: 0; font-family: "Poppins", Helvetica, sans-serif; background-color: #f0f2f5; }
    .db-page { display: flex; flex-direction: column; min-height: 100vh; background-color: #ffffff; }
    .header-bar { width: 100%; height: 44px; display: flex; justify-content: space-between; align-items: center; background-color: #1c2a78; color: #ffffff; padding: 0 5%; box-sizing: border-box; font-size: 13px; flex-shrink: 0; }
    .header-bar a { color: #ffffff; text-decoration: none; }
    .header-links { display: flex; align-items: center; gap: 15px; }
    .header-links .separator, .footer .separator { width: 1px; height: 18px; background-color: #ffffff; }
    .text-size-controls, .color-controls { display: flex; align-items: center; gap: 5px; }
    .text-size-btn { cursor: pointer; }
    .color-box { width: 15px; height: 15px; border: 1px solid #ffffff; cursor: pointer; }
    .top-menu { width: 100%; height: 80px; display: flex; justify-content: space-between; align-items: center; padding: 0 5%; box-sizing: border-box; border-bottom: 1px solid #e0e0e0; flex-shrink: 0; }
    .logo-container { display: flex; align-items: center; gap: 12px; }
    .ashok-logo { width: 60px; height: 60px; }
    .logo-text { font-weight: 500; color: #1c2a78; font-size: 16px; max-width: 180px; }
    .navbar { display: flex; align-items: center; gap: 25px; }
    .nav-item { font-weight: 500; font-size: 14px; color: #666666; text-decoration: none; }
    .nav-item.active, .nav-item:hover { color: #1c2a78; }
    .footer { width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; gap: 15px; background-color: #1c2a78; color: #ffffff; font-size: 13px; padding: 0 15%; box-sizing: border-box; flex-shrink: 0; }
    
    .db-main-content { display: flex; flex-direction: column; flex-grow: 1; padding: 20px 5%; background-color: #f0f2f5; }
    .search-container { margin-bottom: 20px; }
    .search-input { width: 100%; padding: 15px 20px; font-size: 16px; border: 1px solid #dee2e6; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); box-sizing: border-box; }
    .search-input:focus { outline: none; border-color: #1c2a78; box-shadow: 0 0 0 3px rgba(28, 42, 120, 0.15); }
    .db-table-container { flex-grow: 1; overflow-y: auto; border: 1px solid #dee2e6; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .db-table { width: 100%; border-collapse: collapse; }
    .db-table th { background-color: #1c2a78; color: white; padding: 16px; text-align: left; font-size: 14px; font-weight: 600; position: sticky; top: 0; z-index: 1; }
    .db-table td { padding: 16px; border-bottom: 1px solid #f0f2f5; color: #333; font-size: 14px; vertical-align: middle; }
    .db-table tbody tr:hover { background-color: #eef2ff; }
    .db-table tbody tr:last-child td { border-bottom: none; }

    /* --- Styles for the Status Column --- */
    .status-cell { text-align: center; }
    .status-tag { padding: 5px 12px; border-radius: 15px; font-weight: 600; font-size: 12px; text-transform: uppercase; }
    .status-approved { background-color: #d1e7dd; color: #0f5132; }
    .status-rejected { background-color: #f8d7da; color: #842029; }
    .status-hold { background-color: #fff3cd; color: #664d03; }
    .download-btn { background-color: #1c2a78; color: white; text-decoration: none; padding: 8px 15px; border-radius: 8px; font-weight: 500; font-size: 13px; transition: background-color 0.2s; }
    .download-btn:hover { background-color: #2c3a8e; }
    .rejection-reason { font-size: 13px; color: #842029; font-style: italic; }
  `;
  
  return (
    <div className="db-page-container">
      <style>{pageStyles}</style>
      <div className="db-page">
        <div className="header-bar">
            <p className="date-time">{formattedDate} | {formattedTime}</p>
             <div className="header-links"> <a href="#">Skip to main content</a> <div className="separator"></div> <a href="#">Screen Reader Access</a> <a href="#">Text Size</a> <div className="text-size-controls"> <div className="text-size-btn">-</div> <div className="text-size-btn">A</div> <div className="text-size-btn">+</div> </div> <div className="color-controls"> <div className="color-box" style={{ backgroundColor: "white" }}></div> <div className="color-box" style={{ backgroundColor: "#ffea02" }}></div> <div className="color-box" style={{ backgroundColor: "#f88eef" }}></div> <div className="color-box" style={{ backgroundColor: "#3702ff" }}></div> </div> <a href="#">हिन्दी में</a> </div>
        </div>
        <header className="top-menu">
            <div className="logo-container"> <img className="ashok-logo" src={logoUrl} alt="Ministry Logo" /> <div className="logo-text">Ministry of Tribal Affairs</div> </div>
            <nav className="navbar"> <a href="/" className="nav-item">Home</a> <a href="/OfficialDashboard" className="nav-item">Dashboard</a> <a href="#" className="nav-item">About</a> <a href="#" className="nav-item">Act & Rule</a> <a href="#" className="nav-item">Update</a> <a href="#" className="nav-item">Feedback</a> <a href="#" className="nav-item">Public Grievances</a> <a href="/" className="nav-item">Logout</a> </nav>
        </header>

        <main className="db-main-content">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search by any detail..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="db-table-container">
                <table className="db-table">
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Village</th>
                            <th>District</th>
                            <th>State</th>
                            {/* --- NEW: Status and Information Columns --- */}
                            <th style={{textAlign: 'center'}}>Status</th>
                            <th style={{textAlign: 'center'}}>Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClaims.map((claim) => (
                            <tr key={claim.Claim_ID}>
                                <td>{claim.Claim_ID}</td>
                                <td>{claim.Name}</td>
                                <td>{claim.Mobile_No}</td>
                                <td>{claim.Village}</td>
                                <td>{claim.District}</td>
                                <td>{claim.State}</td>
                                {/* --- Status Column --- */}
                                <td className="status-cell">
                                    {claim.Status === 'Approved' && (
                                        <span className="status-tag status-approved">Approved</span>
                                    )}
                                    {claim.Status === 'Rejected' && (
                                        <span className="status-tag status-rejected">Rejected</span>
                                    )}
                                    {claim.Status === 'Hold' && (
                                        <span className="status-tag status-hold">On Hold</span>
                                    )}
                                </td>
                                {/* --- Information Column --- */}
                                <td className="status-cell">
                                    {claim.Status === 'Approved' && claim.DocumentURL && (
                                        <a href={claim.DocumentURL} className="download-btn" target="_blank" rel="noopener noreferrer">Download</a>
                                    )}
                                    {claim.Status === 'Rejected' && claim.RejectionReason && (
                                        <span className="rejection-reason">{claim.RejectionReason}</span>
                                    )}
                                    {/* Nothing for On Hold */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
        
        <footer className="footer">
            <p>Content managed by Ministry of Tribal Affairs, Govt. of India</p>
            <div className="separator"></div>
            <p>Website design and development by VanSetu</p>
        </footer>
      </div>
    </div>
  );
}

