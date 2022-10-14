
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./config/db.js";

const app = express();


app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser());
// using middlewares
app.use(
  cors({
    origin: [/netlify\.app$/, /localhost:\d{4}$/],
    credentials: true,
  })
);


// routes

//home
import data from "./routes/data";
import user from "./routes/user";
app.use("/api/data", data);
app.use("/api/user", user);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API service running 🚀",
  });
});

connectToDb();
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
