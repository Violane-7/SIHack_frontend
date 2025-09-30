const mongoose = require("mongoose");

const landRecordSchema = new mongoose.Schema(
  {
    name: [{ type: String }],
    land_size: [{ type: String }],
    state: [{ type: String }],
    district: [{ type: String }],
    taluka: [{ type: String }],
    village_name: [{ type: String }],
    document_id: [{ type: String }],
    any_ids: [{ type: String }],
    land_related_info: [{ type: String }],
    location: [{ type: String }],
    boundary: [{ type: String }],
    claim_type: [{ type: String }],
    claim_id: [{ type: String }],
    date_of_application: [{ type: String }],
    current_status: [{ type: String }],
    community_name: [{ type: String }],
    contact_details: [{ type: String }],
    khasra_number: [{ type: String }],
    Document_No: [{ type: String }], // renamed to avoid space in key
    Date: [{ type: String }],
    residing_at: [{ type: String }],
    Area: [{ type: String }],
    Rights_recognised: [{ type: String }], // renamed to avoid space
  },
  { timestamps: true }
);

module.exports = mongoose.model("LandRecord", landRecordSchema);
