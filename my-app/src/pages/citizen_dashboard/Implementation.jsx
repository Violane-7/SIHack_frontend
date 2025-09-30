import React, { useState, useEffect } from 'react';
import "./Implementation.css";

// This is the sample data you provided.
// In a real app, this would come from your server.
const mockImplementationData = {
  "Filed": 134,
  "Approved": 30,
  "Rejected": 50
};

// Component names must start with a capital letter.
function Implementation() {
  // State to hold the claims data object. Initialized to null.
  const [claimsData, setClaimsData] = useState(null);

  // useEffect to simulate fetching the data when the component loads.
  useEffect(() => {
    // For your final app, you will replace this with a fetch call:
    // fetch('/api/claims-stats')
    //   .then(res => res.json())
    //   .then(data => setClaimsData(data));
    setClaimsData(mockImplementationData);
  }, []); // Empty array ensures this runs only once.

  // Display a loading message until the data has been fetched.
  if (!claimsData) {
    return <div>Loading implementation status...</div>;
  }

  // Once the data is loaded, render the component with the dynamic values.
  return (
    <div className="implementation">
      <div className="text-wrapper-27">CURRENT STATUS OF IMPLEMENTATION</div>

      {/* --- LABELS --- */}
      <div className="claim-received">
        <div className="text-wrapper-28">Total claims filed</div>
      </div>
      <div className="claim-approved">
        <div className="text-wrapper-28">Total claims approved</div>
      </div>
      <div className="claim-rejected">
        <div className="text-wrapper-28">Total claims rejected</div>
      </div>

      {/* --- DYNAMIC DATA --- */}
      {/* The empty divs are now populated with data from the state object */}
      {/* --- DYNAMIC DATA --- */}
      {/* Add the shared className "claims-data-box" to each div */}
      <div className="claim-received-data claims-data-box">{claimsData["Filed"]}</div>
      <div className="claim-approved-data claims-data-box">{claimsData["Approved"]}</div>
      <div className="claim-rejected-data claims-data-box">{claimsData["Rejected"]}</div>
    </div>
  );
}

export default Implementation;
