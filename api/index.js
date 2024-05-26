const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRouter = require("../api/routes/auth.route");
const updateRouter = require("./routes/update.route");
const deleteRouter = require("./routes/delete.route");
const postRouter = require("./routes/post.route");
const path = require("path");

dotenv.config();

const corsOptions = {
  origin: 'https://blogmania-1.onrender.com',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));



// testing

app.use("/api/auth", authRouter);

app.use("/api/update", updateRouter);

app.use("/api/delete", deleteRouter);

app.use("/api/posts", postRouter);

// ------- Deployment --------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

app.listen(process.env.PORT, () => {
  console.log("server is listening on port 5000");
});
