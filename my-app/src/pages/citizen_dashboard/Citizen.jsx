import React, { useState, useEffect } from 'react';



// You would still import your CSS file
// import './CitizenDashboard.css';

// Sample data for a single logged-in user
const mockSingleCitizenData = {
  id: 1, "Name": "Rajesh", "Community": "Munda", "Land Size": "1 acre", "Village": "Adur", "Taluka": "Anekal", "District": "Bangalore", "State": "Karnataka", "Document ID": "FRA01BLR02", "Claim Type": "Land", "Current Status": "Approved"
};


function Citizen() {
  // State now holds a single object, initialized to 'null'
  const [citizen, setCitizen] = useState(null);

  useEffect(() => {
    // In your real app, you'd fetch the logged-in user's data
    // For example: fetch('/api/user/me')
    //   .then(res => res.json())
    //   .then(data => setCitizen(data));
    setCitizen(mockSingleCitizenData);
  }, []);

  // Show a loading message while the data is being fetched
  if (!citizen) {
    return <div>Loading your information...</div>;
  }

  // Once data is loaded, render the dashboard
  return (
    <div className="citizen">
      <div className="text-wrapper-7">CITIZEN INFORMATION</div>

      {/* --- LABELS (Left Column) --- */}
      <div className="frame-6"><div className="text-wrapper-8">Name</div></div>
      <div className="frame-7"><div className="text-wrapper-9">Community</div></div>
      <div className="frame-8"><div className="text-wrapper-10">Land Size</div></div>
      <div className="frame-9"><div className="text-wrapper-11">Village</div></div>
      <div className="frame-10"><div className="text-wrapper-12">Taluka</div></div>
      <div className="frame-11"><div className="text-wrapper-13">District</div></div>
      <div className="frame-12"><div className="text-wrapper-13">State</div></div>
      {/* ... and so on for all other labels ... */}
      <div className="frame-14"><div className="text-wrapper-15">Claim Type</div></div>
      <div className="frame-15"><div className="text-wrapper-16">Current Status</div></div>

      {/* --- DYNAMIC DATA (Right Column) --- */}
      {/* We no longer need a loop, just access the 'citizen' state object directly */}
      <div className="frame-16"><div className="text-wrapper-17">{citizen["Name"]}</div></div>
      <div className="frame-17"><div className="text-wrapper-18">{citizen["Community"]}</div></div>
      <div className="frame-18"><div className="text-wrapper-19">{citizen["Land Size"]}</div></div>
       <div className="frame-19"><div className="text-wrapper-17">{citizen["Village"]}</div></div>
      <div className="frame-20"><div className="text-wrapper-18">{citizen["Taluka"]}</div></div>
      <div className="frame-21"><div className="text-wrapper-19">{citizen["District"]}</div></div>
      <div className="frame-22"><div className="text-wrapper-19">{citizen["State"]}</div></div>
      {/* ... and so on for all other data fields ... */}
      <div className="frame-24"><div className="text-wrapper-25">{citizen["Claim Type"]}</div></div>
      <div className="frame-25"><div className="text-wrapper-26">{citizen["Current Status"]}</div></div>
      
      {/* --- CONDITIONAL RENDERING FOR DOCUMENT ID --- */}
      {/* This logic remains the same, as it depends on the properties of the single citizen object */}
      {citizen["Current Status"] === "Approved" && (
        <>
          <div className="frame-13"><div className="text-wrapper-14">Document ID</div></div>
          <div className="frame-23"><div className="text-wrapper-24">{citizen["Document ID"]}</div></div>
        </>
      )}
    </div>
  );
}

export default Citizen;