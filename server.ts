//DEPENDENCIES
require("dotenv").config();
import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";

//CONFIG
const app: Application = express();
const PORT = process.env.PORT ?? 3000;
const MONGO_URI =
  process.env.MONGO_URI ??
  "mongodb+srv://Qelkor:1234@cluster0.taeel.mongodb.net/user";

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
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //cookie: { maxAge: oneDay },
  })
);
app.use(express.static(path.join(__dirname, "./client/build")));

//ROUTES
app.get("/api/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to Credo!" });
});

//User Route path
app.get("/api/user/", (req: Request, res: Response) => {
  res.send({ message: "Welcome User!" });
});

//ID Route path
app.get("/api/id/", (req: Request, res: Response) => {
  res.send({ message: "Check out our Certified ID!" });
});

// Form Route path
app.get("/api/form/", (req: Request, res: Response) => {
  res.send({ message: "Fill out your details!" });
});

//LISTENING
app.listen(PORT, (): void => {
  console.log(`Server is listening on port ${PORT}`);
});
