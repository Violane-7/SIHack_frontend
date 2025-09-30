import React, { useState, useEffect } from 'react';

// Note: Replace with your actual logo path
const logoUrl = "ashok1.jpeg";

// This is the mock data, simulating a large database from the server.
const mockDB = [
    { "Claim_ID": "BLR/SD/ANE/0123", "Mobile_No": "9018371234", "Name": "Ram Sita", "Community": "Gond", "Village": "Adur", "Taluka": "Anekal", "District": "Bangalore", "State": "Karnataka" },
    { "Claim_ID": "MYS/HD/NAN/0456", "Mobile_No": "9987654321", "Name": "Aarav Sharma", "Community": "Bhils", "Village": "Hullahalli", "Taluka": "Nanjangud", "District": "Mysore", "State": "Karnataka" },
    { "Claim_ID": "DWD/KL/HUB/0789", "Mobile_No": "9765432109", "Name": "Priya Patel", "Community": "Santhal", "Village": "Rayanal", "Taluka": "Hubli", "District": "Dharwad", "State": "Karnataka" },
    { "Claim_ID": "BGM/GK/GOK/1011", "Mobile_No": "9654321098", "Name": "Rohan Mehta", "Community": "Munda", "Village": "Dhupdal", "Taluka": "Gokak", "District": "Belgaum", "State": "Karnataka" },
    { "Claim_ID": "SHI/SG/SHI/1213", "Mobile_No": "9543210987", "Name": "Anika Singh", "Community": "Khasi", "Village": "Kumsi", "Taluka": "Sagar", "District": "Shimoga", "State": "Karnataka" },
    { "Claim_ID": "MAN/UD/UDU/1415", "Mobile_No": "9432109876", "Name": "Vikram Reddy", "Community": "Toda", "Village": "Brahmavar", "Taluka": "Udupi", "District": "Udupi", "State": "Karnataka" },
    { "Claim_ID": "HAS/AR/ARK/1617", "Mobile_No": "9321098765", "Name": "Ishaan Gupta", "Community": "Garo", "Village": "Holenarasipura", "Taluka": "Arkalgud", "District": "Hassan", "State": "Karnataka" },
    { "Claim_ID": "TUM/TI/TIP/1819", "Mobile_No": "9210987654", "Name": "Diya Kumar", "Community": "Angami", "Village": "Hebbur", "Taluka": "Tiptur", "District": "Tumkur", "State": "Karnataka" },
];


// --- Main Searchable Database Page Component ---
export default function SearchableDatabasePage() {
  const [dateTime, setDateTime] = useState(new Date());
  
  // State to hold the full list of claims from the server
  const [allClaims, setAllClaims] = useState([]);
  // State to hold the list of claims that are currently displayed (after filtering)
  const [filteredClaims, setFilteredClaims] = useState([]);
  // State to hold the user's search input
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to fetch initial data (simulated)
  useEffect(() => {
    // In a real app, you would fetch data from your server here.
    setAllClaims(mockDB);
    setFilteredClaims(mockDB); // Initially, show all claims
  }, []);

  // Effect to filter the claims whenever the search term changes
  useEffect(() => {
    const results = allClaims.filter(claim =>
      claim.Claim_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.Mobile_No.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.Village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.District.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClaims(results);
  }, [searchTerm, allClaims]);
  
  // Effect for the live clock
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
    
    /* --- NEW Styles for the Database Page --- */
    .db-main-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 20px 5%;
        background-color: #f0f2f5;
    }
    .search-container {
        margin-bottom: 20px;
    }
    .search-input {
        width: 100%;
        padding: 15px 20px;
        font-size: 16px;
        border: 1px solid #dee2e6;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        box-sizing: border-box;
    }
    .search-input:focus {
        outline: none;
        border-color: #1c2a78;
        box-shadow: 0 0 0 3px rgba(28, 42, 120, 0.15);
    }
    .db-table-container {
        flex-grow: 1;
        overflow-y: auto; /* This makes the table body scrollable */
        border: 1px solid #dee2e6;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .db-table {
        width: 100%;
        border-collapse: collapse;
    }
    .db-table th {
        background-color: #1c2a78; /* Dark blue header */
        color: white;
        padding: 16px;
        text-align: left;
        font-size: 14px;
        font-weight: 600;
        position: sticky; /* Makes headers stick to the top during scroll */
        top: 0;
        z-index: 1;
    }
    .db-table td {
        padding: 16px;
        border-bottom: 1px solid #f0f2f5;
        color: #333;
        font-size: 14px;
        white-space: nowrap;
    }
    .db-table tbody tr:hover {
        background-color: #eef2ff; /* Light blue hover */
    }
    .db-table tbody tr:last-child td {
        border-bottom: none;
    }
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
            <nav className="navbar"> <a href="/" className="nav-item">Home</a> <a href="/OfficialDashboard" className="nav-item">Dashboard</a> <a href="#" className="nav-item">About</a> <a href="#" className="nav-item">Act & Rule</a> <a href="#" className="nav-item">Update</a> <a href="#" className="nav-item">Feedback</a> <a href="#" className="nav-item active">Database</a> <a href="#" className="nav-item">Logout</a> </nav>
        </header>

        <main className="db-main-content">
            <div className="search-container">
                <input 
                    type="text"
                    className="search-input"
                    placeholder="Search by Claim ID, Name, Mobile No., Village, or District..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="db-table-container">
                <table className="db-table">
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Mobile No</th>
                            <th>Name</th>
                            <th>Community</th>
                            <th>Village</th>
                            <th>Taluka</th>
                            <th>District</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClaims.map((claim) => (
                            <tr key={claim.Claim_ID}>
                                <td>{claim.Claim_ID}</td>
                                <td>{claim.Mobile_No}</td>
                                <td>{claim.Name}</td>
                                <td>{claim.Community}</td>
                                <td>{claim.Village}</td>
                                <td>{claim.Taluka}</td>
                                <td>{claim.District}</td>
                                <td>{claim.State}</td>
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
