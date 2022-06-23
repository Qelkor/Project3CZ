// DEPENDENCIES
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import Forms from "../models/formModel";
import session from "express-session";
import Users from "../models/userModel";

//CONFIG
const Router = express.Router();

//ROUTES
// INDEX ROUTES
Router.get("/", async (req: Request, res: Response) => {
  try {
    const forms = await Forms.find();
    res.send(forms);
  } catch (error) {
    res.send(error);
  }
});

Router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const form = await Forms.findById(id).populate("vendor").populate("themes");
    res.send({ status: 200, data: form });
  } catch (error: any) {
    res.send({ status: 400, data: error.message });
  }
});

//Create Route
Router.post("/", async (req: Request, res: Response) => {
  try {
    const newForm = await Forms.create(req.body);
    await Users.updateOne(
      { _id: req.body.user },
      { $push: { userForm: newForm._id } }
    );
    res.send({ status: 200, data: newForm });
  } catch (error: any) {
    res.send({ status: 400, data: error.message });
  }
});

// DELETE ROUTE
Router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const form = await Forms.findByIdAndRemove(id);
    res.status(200).send({ status: 200, data: "Delete successful" });
  } catch (error: any) {
    res.status(400).json({ status: 400, data: error.message });
  }
});

//UPDATE ROUTE
Router.put("/:id", async (req, res) => {
  try {
    const form = await Forms.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).send({ status: "Failure" });
  }
});

// //EXPORT
export default Router;
