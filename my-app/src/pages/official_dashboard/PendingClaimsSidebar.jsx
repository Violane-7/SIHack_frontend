import React, { useState, useEffect } from 'react';

// This is the mock data, simulating what you get from the server.
const mockPendingData = [
    { "S.No.": 1, "Claim_ID": "BLR/SD/ANE/0123", "Mobile_Number": 9812749012 },
    { "S.No.": 2, "Claim_ID": "MYS/HD/NAN/0456", "Mobile_Number": 9987654321 },
    { "S.No.": 3, "Claim_ID": "DWD/KL/HUB/0789", "Mobile_Number": 9765432109 },
    { "S.No.": 4, "Claim_ID": "BGM/GK/GOK/1011", "Mobile_Number": 9654321098 },
    { "S.No.": 5, "Claim_ID": "SHI/SG/SHI/1213", "Mobile_Number": 9543210987 },
    { "S.No.": 6, "Claim_ID": "MAN/UD/UDU/1415", "Mobile_Number": 9432109876 },
    { "S.No.": 7, "Claim_ID": "HAS/AR/ARK/1617", "Mobile_Number": 9321098765 },
    { "S.No.": 8, "Claim_ID": "TUM/TI/TIP/1819", "Mobile_Number": 9210987654 },
];

export default function PendingClaimsSidebar() {
    const [pendingClaims, setPendingClaims] = useState([]);

    useEffect(() => {
        // In a real app, you would fetch this data from your server.
        setPendingClaims(mockPendingData);
    }, []);

    // The CSS is embedded here to be self-contained and avoid conflicts.
    const styles = `
        .pending-claims-container {
            width: 100%;
            height: 729px; /* Matches your original container height */
            border-radius: 16px;
            border: 1px solid #1c2a78; /* var(--colorsdark-blue) */
            background-color: #f8f9fa;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column; /* Stacks title, headers, and body vertically */
        }
        .claims-title {
            font-family: "Poppins-Medium", Helvetica, sans-serif;
            font-weight: 600;
            color: #000000;
            font-size: 20px;
            text-align: center;
            margin-bottom: 20px;
            flex-shrink: 0; /* Prevents the title from shrinking */
        }
        .claims-table-header {
            display: grid;
            grid-template-columns: 99px 196px 196px; /* Your specified widths */
            gap: 10px;
            flex-shrink: 0; /* Prevents headers from shrinking */
        }
        .table-header-cell {
            height: 44px;
            background-color: #1c2a78;
            color: white;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 14px;
        }
        /* --- THIS IS THE KEY FOR SCROLLING --- */
        .claims-table-body {
            flex-grow: 1; /* Allows this area to fill the available vertical space */
            overflow-y: auto; /* Makes ONLY this area scrollable if content overflows */
            margin-top: 10px;
            padding-right: 5px; /* Adds a little space for the scrollbar */
        }
        .claims-table-row {
            display: grid;
            grid-template-columns: 99px 196px 196px; /* Match header widths */
            gap: 10px;
            margin-bottom: 10px;
        }
        .table-data-cell {
            height: 44px;
            background-color: #ffffff;
            border: 1px solid #dee2e6;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #333;
        }
        /* Custom scrollbar for better aesthetics */
        .claims-table-body::-webkit-scrollbar {
            width: 6px;
        }
        .claims-table-body::-webkit-scrollbar-thumb {
            background-color: #1c2a78;
            border-radius: 3px;
        }
        .claims-table-body::-webkit-scrollbar-track {
            background-color: #f1f1f1;
        }
    `;

    return (
        <>
            <style>{styles}</style>
            <div className="pending-claims-container">
                <div className="claims-title">PENDING CLAIMS TO BE APPROVED</div>
                
                {/* Table Headers */}
                <div className="claims-table-header">
                    <div className="table-header-cell">S.No.</div>
                    <div className="table-header-cell">Claim ID</div>
                    <div className="table-header-cell">Mobile Number</div>
                </div>

                {/* Scrollable Table Body */}
                <div className="claims-table-body">
                    {pendingClaims.map((claim) => (
                        <div className="claims-table-row" key={claim['S.No.']}>
                            <div className="table-data-cell">{claim['S.No.']}</div>
                            <div className="table-data-cell">{claim.Claim_ID}</div>
                            <div className="table-data-cell">{claim.Mobile_Number}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
```


    
