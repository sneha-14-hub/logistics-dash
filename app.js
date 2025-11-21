const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
require("dotenv").config();

// Importing routes
const shipmentRoutes = require("./routes/shipment");
const warehouseRoutes = require("./routes/warehouse");
const fleetRoutes = require("./routes/fleet");
const etaRoutes = require("./routes/eta");
const mapRoutes = require("./routes/map");           // ✅ Make sure this file exists and exports router
const dashboardRoutes = require("./routes/dashboard");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

// ✅ MongoDB Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/logistics";
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.error("❌ DB Error:", err));

// ✅ EJS Templating Engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Mount Routes
app.use("/", dashboardRoutes);         // Default homepage
app.use("/shipment", shipmentRoutes);  // Track & manage shipments
app.use("/warehouse", warehouseRoutes);
app.use("/fleet", fleetRoutes);
app.use("/eta", etaRoutes);
app.use("/map", mapRoutes);
app.use("/chatbot", chatbotRoutes); 


// Route to render chatbot
app.get("/chatbot", (req, res) => {
  res.render("chatbot");
});

// This connects to Flask backend at port 5001
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:5001/chat", { message });
    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error("Python AI error:", error.message);
    res.json({ reply: "AI assistant is not responding right now." });
  }
});

// Map page route (Google Maps view)

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
