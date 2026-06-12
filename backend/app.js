import express from "express";
import connectDB from "./db/connectDB.js";

import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());

connectDB().then(() => {
  app.listen(3000, () =>
    console.log("Server is up an running at http://localhost:" + 3000),
  );
});

app.get("/", (req, res) => {
  res.send({ message: "Server is up and running" });
});

app.use("/api/auth", userRouter);
