require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDatabases } = require("./config/db");

const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/userRoutes");
const locationsRoutes = require("./routes/locationRoutes");

const app = express();
app.use(cors());
app.use(express.json());


// Connect to both DBs and expose the connections (models will use them)
connectDatabases()
  .then(() => console.log("Both databases connected"))
  .catch((err) => {
    console.error("DB connection error", err);
    process.exit(1);
  });

// Routes
app.use("/api/ai", aiRoutes);//
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/villages", require("./routes/villageRoutes"));

app.get("/", (req, res) => res.json({ ok: true, message: "Server running" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
