import React, { useState, useEffect } from 'react';

// Note: Replace with your actual logo path
const logoUrl = "ashok1.jpeg";

// --- Sub-Component for the Sidebar ---
const PendingClaimsSidebar = ({ onClaimSelect }) => {
    // --- MODIFIED: Expanded the mock data to have more entries ---
    const mockPendingData = [
        { "S.No.": 1, "Claim_ID": "BLR/SD/ANE/0123", "Mobile_Number": 9812749012, "Step": 2, "sub_step": "dispute resolution", "Information": "Land record documents submitted. Witness statements from village elders collected. Awaiting verification of GPS coordinates." },
        { "S.No.": 2, "Claim_ID": "MYS/HD/NAN/0456", "Mobile_Number": 9987654321, "Step": 1, "sub_step": "Evidence verified", "Information": "Initial claim form and identity proofs are in order. Awaiting submission of ancestral land use evidence." },
        { "S.No.": 3, "Claim_ID": "DWD/KL/HUB/0789", "Mobile_Number": 9765432109, "Step": 3, "sub_step": "Title Issued", "Information": "All committee approvals are complete. Title document is drafted and pending final signature and issuance to the claimant." },
        { "S.No.": 4, "Claim_ID": "BGM/GK/GOK/1011", "Mobile_Number": 9654321098, "Step": 4, "sub_step": "6 month report approved", "Information": "Claim successfully resolved and title issued. Case is now in the monitoring phase. No outstanding issues reported." },
    ];
    return (
        <div className="pending-claims-container">
            <div className="claims-title">PENDING CLAIMS TO BE APPROVED</div>
            <div className="claims-table-header">
                <div className="table-header-cell">S.No.</div>
                <div className="table-header-cell">Claim ID</div>
                <div className="table-header-cell">Mobile Number</div>
            </div>
            <div className="claims-table-body">
                {mockPendingData.map((claim) => (
                    <div className="claims-table-row" key={claim['S.No.']}>
                        <div className="table-data-cell">{claim['S.No.']}</div>
                        <div className="table-data-cell claim-id-link" onClick={() => onClaimSelect(claim)}>{claim.Claim_ID}</div>
                        <div className="table-data-cell">{claim.Mobile_Number}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Sub-Component for the Map ---
const MapComponent = () => (
    <div className="map-container">
        <iframe width="100%" height="100%" frameBorder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox=77.5,12.9,77.7,13.1&layer=mapnik&marker=12.97,77.59" style={{ border: 'none', borderRadius: '12px' }}></iframe>
    </div>
);

// --- Sub-Component for the Claim Approval Modal ---
// --- FIXED: This modal is now fully detailed and interactive ---
const ClaimApprovalModal = ({ claim, onClose }) => {
    const [action, setAction] = useState(null);
    const [reason, setReason] = useState('');
    const [file, setFile] = useState(null);

    const processSteps = [
        { name: "Gram Sabha and Forest Rights Commitee", substeps: ["Claims Collected", "Evidence verified", "Gram Sabha resolution passed", "Forwarded to SDLC"] },
        { name: "Sub-Division level commitee", substeps: ["Resolution review", "dispute resolution", "Draft Record prepared", "Forwarded to DLC"] },
        { name: "District level commitee", substeps: ["appeal filed, if any", "Title Issued", "Case forwarded for monitoring to SLC"] },
        { name: "State level commitee", substeps: ["6 month report approved"] }
    ];

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) setFile(e.target.files[0]);
    };
    
    const handleSubmit = () => {
        const submissionData = {
            claimId: claim.Claim_ID,
            action: action,
            rejectionReason: action === 'reject' ? reason : null,
            document: action === 'approve' && file ? file.name : null,
        };
        console.log("Submitting to server:", submissionData);
        onClose();
    };

    if (!claim) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Review Claim: {claim.Claim_ID}</h3>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="claim-info-box">
                        <h4>Claim Information & Evidence</h4>
                        <p>{claim.Information || "No additional information provided."}</p>
                    </div>
                    <div className="status-details-content">
                        <h4>Claim Progress</h4>
                        {processSteps.slice(0, claim.Step).map((step, index) => {
                            if (index + 1 < claim.Step) {
                                return <div key={index} className="step-heading completed">✅ {step.name}</div>;
                            }
                            const currentSubStepIndex = step.substeps.indexOf(claim.sub_step);
                            return (
                                <div key={index} className="active-step-container">
                                    <div className="step-heading active">➡️ {step.name}</div>
                                    <ul className="substep-list">
                                        {step.substeps.slice(0, currentSubStepIndex + 1).map((substep, subIndex) => (
                                            <li key={subIndex} className={`substep-item ${subIndex < currentSubStepIndex ? 'completed' : 'pending'}`}>
                                                {subIndex < currentSubStepIndex ? '✅' : '⏳'} {substep}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                    <div className="action-section">
                        <h4>Action Required: {claim.sub_step}</h4>
                        <div className="action-buttons">
                            <button className={`action-btn ${action === 'approve' ? 'active' : ''}`} onClick={() => setAction('approve')}>Approve</button>
                            <button className={`action-btn ${action === 'hold' ? 'active' : ''}`} onClick={() => setAction('hold')}>Hold</button>
                            <button className={`action-btn reject ${action === 'reject' ? 'active' : ''}`} onClick={() => setAction('reject')}>Reject</button>
                        </div>
                        {action === 'approve' && (<div className="action-details"><label htmlFor="file-upload">Upload Supporting Document:</label><input id="file-upload" type="file" onChange={handleFileChange} /></div>)}
                        {action === 'reject' && (<div className="action-details"><label htmlFor="rejection-reason">Reason for Rejection:</label><textarea id="rejection-reason" rows="4" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Provide a clear reason..."></textarea></div>)}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="submit-action-btn" onClick={handleSubmit} disabled={!action}>Submit Action</button>
                </div>
            </div>
        </div>
    );
};

// --- Implementation Status Component ---
const ImplementationStatus = () => {
    const [stats] = useState({ "Received": "20,748", "Approved": "10,528", "Rejected": "6,710" });
    return (
        <div className="implementation-status">
            <div className="panel-title">CURRENT STATUS OF IMPLEMENTATION</div>
            <div className="status-cards">
                <div className="card"> <div className="card-title">Total claims received</div> <div className="card-data-box">{stats.Received}</div> </div>
                <div className="card"> <div className="card-title">Total claims approved</div> <div className="card-data-box">{stats.Approved}</div> </div>
                <div className="card"> <div className="card-title">Total claims rejected</div> <div className="card-data-box">{stats.Rejected}</div> </div>
            </div>
        </div>
    );
};

// --- Upload Modal Component ---
const UploadModal = ({ onClose }) => {
    const [file, setFile] = useState(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [documentName, setDocumentName] = useState('');
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = () => {
        if (!file || !mobileNumber || !documentName) {
            // Using a simple browser alert for now. In a real app, you'd use a styled notification.
            alert("Please fill all fields and choose a file.");
            return;
        }
        const uploadData = { file, mobileNumber, documentName };
        console.log("Uploading data to server:", uploadData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Upload New Document</h3>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="upload-form">
                        <label className="upload-label">1. Choose Document to Upload</label>
                        <div className="file-input-wrapper">
                            <input type="file" id="file-upload-input" onChange={handleFileChange} />
                            <label htmlFor="file-upload-input" className="file-input-button">Choose File</label>
                            <span className="file-name-display">{fileName}</span>
                        </div>
                        <label htmlFor="mobile-number" className="upload-label">2. Enter Mobile Number</label>
                        <input type="tel" id="mobile-number" className="text-input" placeholder="e.g., 9876543210" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        <label htmlFor="document-name" className="upload-label">3. Enter Document Name</label>
                        <input type="text" id="document-name" className="text-input" placeholder="e.g., Gram Sabha Resolution" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="submit-action-btn" onClick={handleSubmit}>Upload and Submit</button>
                </div>
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---
export default function OfficialDashboard() {
  const [dateTime, setDateTime] = useState(new Date());
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedDate = dateTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' });
  const formattedTime = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const pageStyles = `
    .official-dashboard-page-container { margin: 0; font-family: "Poppins", Helvetica, sans-serif; background-color: #f0f2f5; }
    .official-dashboard-page { display: flex; flex-direction: column; min-height: 100vh; background-color: #ffffff; }
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
    .nav-item { font-weight: 500; font-size: 14px; color: #666666; text-decoration: none; cursor: pointer; }
    .nav-item.active, .nav-item:hover { color: #1c2a78; }
    .dashboard-main-content { display: flex; flex-grow: 1; padding: 20px 5%; gap: 20px; }
    .dashboard-sidebar { width: 45%; flex-shrink: 0; }
    .dashboard-content-panel { width: 55%; display: flex; flex-direction: column; gap: 20px; }
    .pending-claims-container { width: 100%; height: calc(100vh - 164px); border-radius: 16px; border: 1px solid #1c2a78; background-color: #ffffff; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
    .claims-title { font-weight: 600; color: #000000; font-size: 20px; text-align: center; margin-bottom: 20px; flex-shrink: 0; }
    .claims-table-header { display: grid; grid-template-columns: 1fr 2fr 2fr; gap: 10px; flex-shrink: 0; }
    .table-header-cell { height: 44px; background-color: #1c2a78; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 500; font-size: 14px; }
    .claims-table-body { flex-grow: 1; overflow-y: auto; margin-top: 10px; padding-right: 5px; }
    .claims-table-row { display: grid; grid-template-columns: 1fr 2fr 2fr; gap: 10px; margin-bottom: 10px; }
    .table-data-cell { height: 44px; background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #333; }
    .claims-table-body::-webkit-scrollbar { width: 6px; }
    .claims-table-body::-webkit-scrollbar-thumb { background-color: #1c2a78; border-radius: 3px; }
    .claims-table-body::-webkit-scrollbar-track { background-color: #f1f1f1; }
    .implementation-status { width: 100%; border-radius: 16px; border: 1px solid #1c2a78; padding: 20px; box-sizing: border-box; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
    .panel-title { font-weight: 600; text-align: center; margin-bottom: 15px; }
    .status-cards { display: flex; gap: 15px; }
    .card { flex: 1; }
    .card-title { background-color: #1c2a78; color: white; padding: 10px; border-radius: 8px; text-align: center; font-size: 14px;}
    .card-data-box { height: 80px; border: 1px solid #dee2e6; border-radius: 8px; margin-top: 10px; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 700; color: #1c2a78; }
    .map-container { flex-grow: 1; border-radius: 16px; border: 1px solid #1c2a78; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; }
    .footer { width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; gap: 15px; background-color: #1c2a78; color: #ffffff; font-size: 13px; padding: 0 15%; box-sizing: border-box; flex-shrink: 0; }
    .claim-id-link { cursor: pointer; font-weight: 600; color: #1c2a78; transition: background-color 0.2s; }
    .claim-id-link:hover { background-color: #eef2ff; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background-color: white; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: 90%; max-width: 600px; display: flex; flex-direction: column; max-height: 90vh; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e9ecef; padding: 15px 25px; }
    .modal-header h3 { margin: 0; color: #1c2a78; }
    .modal-close-button { background: none; border: none; font-size: 2rem; cursor: pointer; color: #6c757d; }
    .modal-body { padding: 25px; overflow-y: auto; }
    .modal-footer { border-top: 1px solid #e9ecef; padding: 15px 25px; text-align: right; }
    .claim-info-box { background-color: #eef2ff; border: 1px solid #aebcff; border-radius: 8px; padding: 15px; margin-bottom: 25px; }
    .claim-info-box h4 { margin: 0 0 10px 0; color: #1c2a78; }
    .claim-info-box p { margin: 0; line-height: 1.6; color: #333; }
    .status-details-content { font-size: 14px; }
    .status-details-content h4 { margin: 0 0 10px 0; }
    .step-heading { font-size: 16px; font-weight: 600; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; }
    .step-heading.completed { color: #198754; } .step-heading.active { color: #0d6efd; }
    .substep-list { list-style-type: none; padding-left: 20px; margin-top: 10px; }
    .substep-item { margin-bottom: 8px; }
    .substep-item.completed { color: #198754; } .substep-item.pending { color: #6c757d; font-weight: bold; }
    .action-section { margin-top: 20px; padding-top: 20px; border-top: 1px dashed #ced4da; }
    .action-section h4 { margin: 0 0 15px 0; }
    .action-buttons { display: flex; gap: 10px; margin-bottom: 20px; }
    .action-btn { flex: 1; padding: 10px; font-size: 14px; font-weight: 500; border: 1px solid #ced4da; border-radius: 8px; background-color: #f8f9fa; cursor: pointer; transition: all 0.2s; }
    .action-btn:hover { border-color: #1c2a78; }
    .action-btn.active { background-color: #1c2a78; color: white; border-color: #1c2a78; }
    .action-btn.reject.active { background-color: #dc3545; border-color: #dc3545; }
    .action-details { display: flex; flex-direction: column; gap: 8px; }
    .action-details label { font-weight: 500; font-size: 14px; }
    .action-details input[type="file"], .action-details textarea { width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 8px; font-family: inherit; }
    .submit-action-btn { background-color: #28a745; color: white; border: none; padding: 12px 25px; font-size: 16px; font-weight: 500; border-radius: 8px; cursor: pointer; transition: background-color 0.2s; }
    .submit-action-btn:hover { background-color: #218838; }
    .submit-action-btn:disabled { background-color: #6c757d; cursor: not-allowed; }
    .upload-form { display: flex; flex-direction: column; gap: 15px; }
    .upload-label { font-weight: 500; font-size: 14px; color: #333; }
    .file-input-wrapper { display: flex; align-items: center; gap: 10px; }
    .file-input-wrapper input[type="file"] { display: none; }
    .file-input-button { background-color: #f8f9fa; border: 1px solid #ced4da; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: 500; }
    .file-input-button:hover { background-color: #e9ecef; }
    .file-name-display { font-size: 14px; color: #6c757d; font-style: italic; }
    .text-input { width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 8px; font-size: 14px; box-sizing: border-box; }
  `;
  
  return (
    <div className="official-dashboard-page-container">
      <style>{pageStyles}</style>
      <div className="official-dashboard-page">
        <div className="header-bar">
            <p className="date-time">{formattedDate} | {formattedTime}</p>
             <div className="header-links"> <a href="#">Skip to main content</a> <div className="separator"></div> <a href="#">Screen Reader Access</a> <a href="#">Text Size</a> <div className="text-size-controls"> <div className="text-size-btn">-</div> <div className="text-size-btn">A</div> <div className="text-size-btn">+</div> </div> <div className="color-controls"> <div className="color-box" style={{ backgroundColor: "white" }}></div> <div className="color-box" style={{ backgroundColor: "#ffea02" }}></div> <div className="color-box" style={{ backgroundColor: "#f88eef" }}></div> <div className="color-box" style={{ backgroundColor: "#3702ff" }}></div> </div> <a href="#">हिन्दी में</a> </div>
        </div>
        <header className="top-menu">
            <div className="logo-container"> <img className="ashok-logo" src={logoUrl} alt="Ministry Logo" /> <div className="logo-text">Ministry of Tribal Affairs</div> </div>
            <nav className="navbar">
                <a href="/" className="nav-item">Home</a>
                <a href="#" className="nav-item active">Dashboard</a>
                <a href="#" className="nav-item">About</a>
                <a className="nav-item" onClick={() => setIsUploadModalOpen(true)}>Upload Document</a>
                <a href="#" className="nav-item">Feedback</a>
                <a href="/SearchableDatabasePage" className="nav-item">Database</a>
                <a href="/" className="nav-item">Logout</a>
            </nav>
        </header>
        <main className="dashboard-main-content">
          <aside className="dashboard-sidebar"> <PendingClaimsSidebar onClaimSelect={(claim) => setSelectedClaim(claim)} /> </aside>
          <section className="dashboard-content-panel">
              <ImplementationStatus />
              <MapComponent />
          </section>
        </main>
        <footer className="footer">
            <p>Content managed by Ministry of Tribal Affairs, Govt. of India</p>
            <div className="separator"></div>
            <p>Website design and development by VanSetu</p>
        </footer>
        <ClaimApprovalModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />
        {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} />}
      </div>
    </div>
  );
}

