const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authroutes = require("./routes/authRoute");
const healthRoutes = require("./routes/healthRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ✅ SIMPLE WORKING CORS (no overthinking)
app.use(cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/auth", authroutes);
app.use("/health", healthRoutes);

// ✅ IMPORTANT: Render port
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});