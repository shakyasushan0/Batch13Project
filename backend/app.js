process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";

import userRouter from "./routes/user.route.js";
import productRouter from './routes/product.route.js';
import orderRouter from './routes/order.route.js';
import uploadRouter from './routes/upload.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser())

connectDB().then(() => {
  app.listen(3000, () =>
    console.log("Server is up an running at http://localhost:" + 3000),
  );
});

app.get("/", (req, res) => { 
  res.send({ message: "Server is up and running" });
});

app.use("/api/auth", userRouter);
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter)
