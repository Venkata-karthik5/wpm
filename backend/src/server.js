const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/recipesocial", {
    dbName: process.env.MONGO_DB || "recipesocial",
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });