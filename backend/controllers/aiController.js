const axios = require("axios");

// POST /api/ai -> forwards the body to AI endpoint and returns response
async function proxyToAi(req, res) {
  try {
    const aiEndpoint = process.env.AI_ENDPOINT;
    const aiKey = process.env.AI_API_KEY;
    if (!aiEndpoint)
      return res
        .status(500)
        .json({ ok: false, message: "AI_ENDPOINT not configured" });

    const payload = req.body;
    // You can transform the payload depending on the AI API contract

    const headers = {};
    if (aiKey) headers["Authorization"] = `Bearer ${aiKey}`;

    const aiResp = await axios.post(aiEndpoint, payload, { headers });

    // Return the raw response from the AI back to frontend
    return res.status(aiResp.status).json({ ok: true, data: aiResp.data });
  } catch (err) {
    console.error("AI proxy error", err?.response?.data || err.message);
    const status = err?.response?.status || 500;
    const data = err?.response?.data || { message: err.message };
    return res
      .status(status)
      .json({ ok: false, message: "AI proxy error", error: data });
  }
}

module.exports = { proxyToAi };
