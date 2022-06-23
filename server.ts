//DEPENDENCIES
require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import roomController from "./controllers/roomController";
import vendorController from "./controllers/vendorController";
import formController from "./controllers/formController";
import userController from "./controllers/userController";

//CONFIG
const app = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI =
  /*process.env.MONGO_URI ??*/ "mongodb://localhost:27017/project3";

mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));
mongoose.connect(MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//MIDDLEWARE
app.use(express.json());
app.use(
  session({
    secret: "Invictus",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api/room", roomController);
app.use("/api/vendor", vendorController);
app.use("/api/form", formController);
app.use("/api/user", userController);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

//LISTENING
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
