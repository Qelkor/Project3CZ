// DEPENDENCIES
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import session from "express-session";
import { IUser } from "../models/userModel";

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

//CONFIG
const Router = express.Router();
const salt = bcrypt.genSaltSync(10);

// Register Routes
Router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  if (!body.name || !body.email || !body.password) {
    res.status(400).send({ status: "Invalid Request" });
  } else {
    const newUser = await Users.create(body);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    res.status(200).send({ status: "Great Success", data: newUser });
  }
});

Router.get("/seed", async (req, res) => {
  try {
    const seed = await Users.create({
      name: "Zhenglong",
      email: "zhenglong.wong@helloworld.com",
      password: "helloworld",
      userForm: ["62addf7945f7bd06e830fbdd", "62ade48375185e59d7106c58"], //Object ID of Forms belonging to this user
      propertyType: "HDB",
      propertyStatus: "Exisiting",
      renoType: "Partial",
      renoPriority: "Stick to budget",
      keyCollected: true,
      loanRequired: false,
      rooms: ["62adcb4e6c4a3126663f88c0", "62adcb4e6c4a3126663f88c1"],
      budget: 10000,
    });
    res.send(seed);
  } catch (err) {
    res.send(err);
  }
});

// // Login User
Router.get("/login", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await Users.findOne({ name });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).send({ message: "Access Denied!" });
  } else if (bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    res.status(200).json({ message: "Great Success", data: user });
  }
});

//Session authentication
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next();
  } else {
    res.send("Invalid Request");
  }
};
// COOKIE
Router.get("/secret", isAuthenticated, async (req: Request, res: Response) => {
  res.send(req.session.user);
});

//Show Route
Router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id)
      .populate("rooms")
      .populate("userForm");
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE ROUTE
Router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndRemove(req.params.id);
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).json({ status: "Failure" });
  }
});

//UPDATE ROUTE
Router.put("/:id", async (req, res) => {
  try {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).json({ status: "Failure" });
  }
});

//EXPORT
export default Router;
