import mongoose from "mongoose";

async function connectDB() {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI,
    );
    console.log("Connected to DB at", connection.connection.host);
  } catch (err) {
    console.log("Error connecting to DB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
