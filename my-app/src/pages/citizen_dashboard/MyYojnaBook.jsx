import React, { useState, useEffect } from 'react';
import './style1.css'; // Importing the stylesheet

// Using a placeholder image for the logo. Replace with your actual image path.
const logoUrl = "ashok1.jpeg";

// --- MOCK DATA ---
// This simulates the data you would get from a server.
const mockClaimStatus = [
    {
        "Status": 3,
        "Claim_ID": "BLR/SD/ANE/0123",
        "Information": [
            { "Sub_Step": "Claims Collected", "Approved": "True" },
            { "Sub_Step": "Evidence verified", "Approved": "True" },
            { "Sub_Step": "Gram Sabha resolution passed", "Approved": "True" },
            { "Sub_Step": "Forwarded to SDLC", "Approved": "True" },
            { "Sub_Step": "Resolution review", "Approved": "True" },
            { "Sub_Step": "dispute resolution", "Approved": "True" },
            { "Sub_Step": "Draft Record prepared", "Approved": "False" } // Currently here
        ],
        "RejectionReason": null
    },
    {
        "Status": 5,
        "Claim_ID": "BLR/SD/ANE/0124",
        "Information": [], // Not needed for fully approved status
        "RejectionReason": null
    },
    {
        "Status": 0,
        "Claim_ID": "BLR/SD/ANE/0125",
        "Information": [
            { "Sub_Step": "Claims Collected", "Approved": "True" },
            { "Sub_Step": "Evidence verified", "Approved": "False" } // Rejected here
        ],
        "RejectionReason": "Submitted documents were not sufficient to establish the claim as per Section 4(3) of the Act. Applicant may re-apply with required evidence."
    }
];


// --- COMPONENT TO DISPLAY CLAIM STATUS DETAILS ---
// This component contains the complex logic for rendering the right-hand panel.
const ClaimStatusDetails = ({ claim }) => {

    // A helper data structure to define the process flow
    const processSteps = [
        { name: "Gram Sabha and Forest Rights Commitee", substeps: ["Claims Collected", "Evidence verified", "Gram Sabha resolution passed", "Forwarded to SDLC"] },
        { name: "Sub-Division level commitee", substeps: ["Resolution review", "dispute resolution", "Draft Record prepared", "Forwarded to DLC"] },
        { name: "District level commitee", substeps: ["appeal filed, if any", "Title Issued", "Case forwarded for monitoring to SLC"] },
        { name: "State level commitee", substeps: ["6 month report approved"] }
    ];

    // Helper to find if a substep is approved
    const isSubStepApproved = (substepName) => {
        const info = claim.Information.find(info => info.Sub_Step === substepName);
        return info && info.Approved === "True";
    };

    switch (claim.Status) {
        case 5: // Approved
            return (
                <div className="status-details-content">
                    {processSteps.map((step, index) => (
                        <div key={index} className="step-heading completed">✅ {step.name}</div>
                    ))}
                </div>
            );

        case 0: // Rejected
            const lastInfo = claim.Information[claim.Information.length - 1];
            const failedStep = processSteps.find(step => step.substeps.includes(lastInfo.Sub_Step));
            return (
                <div className="status-details-content">
                    <div className="step-heading rejected">❌ {failedStep.name}</div>
                    <div className="substep-item rejected">Rejected at: {lastInfo.Sub_Step}</div>
                    <div className="rejection-box">
                        <div className="rejection-reason-title">Reason for Rejection:</div>
                        <p>{claim.RejectionReason || "No reason provided."}</p>
                    </div>
                </div>
            );

        default: // Pending (Status 1-4)
            return (
                <div className="status-details-content">
                    {processSteps.map((step, index) => {
                        const stepNumber = index + 1;
                        if (stepNumber < claim.Status) { // Already completed steps
                            return <div key={index} className="step-heading completed">✅ {step.name}</div>;
                        }
                        if (stepNumber > claim.Status) { // Future steps
                            return <div key={index} className="step-heading future">{step.name}</div>;
                        }
                        // The current, active step
                        return (
                            <div key={index} className="active-step-container">
                                <div className="step-heading active">➡️ {step.name}</div>
                                <ul className="substep-list">
                                    {step.substeps.map((substep, subIndex) => (
                                        <li key={subIndex} className={`substep-item ${isSubStepApproved(substep) ? 'completed' : 'pending'}`}>
                                            {isSubStepApproved(substep) ? '✅' : '⏳'} {substep}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            );
    }
};

// --- COMPONENT FOR A SINGLE CLAIM ITEM ---
const ClaimItem = ({ claim }) => {
    const getStatusText = (status) => {
        if (status === 5) return "Approved";
        if (status === 0) return "Rejected";
        return "Pending";
    };

    return (
        <div className="claim-item">
            <div className="status-query-section">
                <button className="query-button">Claim ID</button>
                <div className="placeholder-box">{claim.Claim_ID}</div>
                <button className="query-button">Status</button>
                <div className={`placeholder-box status-${getStatusText(claim.Status).toLowerCase()}`}>{getStatusText(claim.Status)}</div>
            </div>
            <div className="status-display-section">
                <ClaimStatusDetails claim={claim} />
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function MyYojnaBook() {
    const [activeTab, setActiveTab] = useState('Claim Status');
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        // In a real application, you would fetch data from a server here.
        // For now, we use the mock data.
        if (activeTab === 'Claim Status') {
            setClaims(mockClaimStatus);
        }
    }, [activeTab]);

    return (
        <div className="dashboard-page-body">
            <div className="dashboard-page">
                {/* Header Bar */}
                <div className="header-bar">
                    <p className="date-time">26 Sep 2025 | Fri | 09:25:39 PM</p>
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
                        <img className="ashok-logo" src={logoUrl} alt="Ministry of Tribal Affairs Logo" />
                        <div className="logo-text">Ministry of Tribal Affairs</div>
                    </div>
                    <nav className="navbar">
                        <a href="/" className="nav-item">Home</a>
                        <a href="/CitizenDashboard" className="nav-item">Dashboard</a>
                        <a href="#" className="nav-item">About</a>
                        <a href="#" className="nav-item">Act & Rule</a>
                        <a href="#" className="nav-item">Contact</a>
                        <a href="#" className="nav-item">Feedback</a>
                        <a href="#" className="nav-item active">Meri Yojna Book</a>
                        <a href="#" className="nav-item">Public Grievances</a>
                        <a href="#" className="nav-item">Logout</a>
                    </nav>
                </header>

                {/* --- MAIN CONTENT SECTION --- */}
                <main className="main-content">
                    <aside className="sidebar">
                        <button className={`sidebar-button ${activeTab === 'Claim Status' ? 'active' : ''}`} onClick={() => setActiveTab('Claim Status')}>Claim Status</button>
                        <button className={`sidebar-button ${activeTab === 'Meri Yojna' ? 'active' : ''}`} onClick={() => setActiveTab('Meri Yojna')}>Meri Yojna</button>
                        <button className={`sidebar-button ${activeTab === 'Recommendation' ? 'active' : ''}`} onClick={() => setActiveTab('Recommendation')}>Recommendation</button>
                    </aside>
                    
                    <section className="content-panel">
    {activeTab === 'Claim Status' && (
        <div className="claims-list">
            {claims.map(claim => <ClaimItem key={claim.Claim_ID} claim={claim} />)}
        </div>
    )}

    {activeTab === 'Meri Yojna' && (() => {
        // Data and table logic for the Meri Yojna tab
        const yojnaData = [
            { "Scheme_Name": "PM Kisan Yojna", "Start": "13-09-2019", "End": "Ongoing" },
            { "Scheme_Name": "PM Jan Dhan Yojna", "Start": "26-10-2018", "End": "26-10-2020" },
            { "Scheme_Name": "Atal Pension Yojana", "Start": "01-06-2021", "End": "Ongoing" },
            { "Scheme_Name": "Pradhan Mantri Jeevan Jyoti Bima Yojana", "Start": "15-02-2022", "End": "14-02-2023" }
        ];

        return (
            <div className="meri-yojna-container">
                <table className="yojna-table">
                    <thead>
                        <tr>
                            <th>Scheme Name</th>
                            <th>Date Availed</th>
                            <th>Date Expired</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yojnaData.map((yojna, index) => (
                            <tr key={index}>
                                <td>{yojna.Scheme_Name}</td>
                                <td>{yojna.Start}</td>
                                <td>{yojna.End}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    })()}

    {activeTab === 'Recommendation' && (() => {
        // Data and table logic for the new Recommendation tab
        const recommendData = [
            { "Scheme_Name": "PM Kisan Yojna", "About": "Pradhan Mantri Kisan Samman Nidhi is an initiative by the government of India that gives farmers up to ₹6,000 per year as minimum income support. The initiative was announced by Piyush Goyal during the 2019 Interim Union Budget of India on 1 February 2019.", "Contact": "9812930981" },
            { "Scheme_Name": "Eklavya Model Residential Schools (EMRS)", "About": "A scheme for providing quality middle and high level education to Scheduled Tribe students in remote areas, not only to enable them to avail of reservation in high and professional educational courses and get jobs in government and public and private sectors, but also to have access to the best opportunities in education at par with the non ST population.", "Contact": "email@example.gov.in" },
            { "Scheme_Name": "Pradhan Mantri Van Dhan Yojana", "About": "An initiative targeting livelihood generation for tribal gatherers and transforming them into entrepreneurs. The idea is to set-up tribal community owned Minor Forest Produce-centric multi-purpose enterprises.", "Contact": "1800-123-4567" }
        ];

        return (
            <div className="recommendation-container">
                <table className="recommendation-table">
                    <thead>
                        <tr>
                            <th>Scheme Name</th>
                            <th>About</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendData.map((rec, index) => (
                            <tr key={index}>
                                <td>{rec.Scheme_Name}</td>
                                <td>{rec.About}</td>
                                <td>{rec.Contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    })()}
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
}