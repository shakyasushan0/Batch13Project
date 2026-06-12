import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/Batch13",
    );
    console.log("Connected to DB at", connection.connection.host);
  } catch (err) {
    console.log("Error connecting to DB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
