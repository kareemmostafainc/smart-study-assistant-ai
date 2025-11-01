// ======================================================
// Smart Study Assistant (AI Web App)
// Database Configuration (MongoDB + Mongoose)
// Author: Kareem Mostafa
// ======================================================

import mongoose from "mongoose";

// ======================================================
// 1. MongoDB Connection Function
// ======================================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database Connection Failed:", error.message);

    // Retry connection after delay
    setTimeout(connectDB, 5000);
  }
};

// ======================================================
// 2. Mongoose Event Handlers
// ======================================================
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected.");
});

// ======================================================
// 3. Graceful Shutdown
// ======================================================
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination.");
  process.exit(0);
});

// ======================================================
// 4. Export Connection Function
// ======================================================
export default connectDB;
