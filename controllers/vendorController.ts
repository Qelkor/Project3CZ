// DEPENDENCIES
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import Themes from "../models/themeModel";
import Vendors from "../models/vendorModel";
import isAuthenticated from "./userController";
import session from "express-session";

//CONFIG
const Router = express.Router();

// INDEX ROUTES
Router.get("/", async (req: Request, res: Response) => {
  try {
    const vendors = await Vendors.find();
    res.send(vendors);
  } catch (error) {
    res.send(error);
  }
});

//SEED ROUTE
Router.get("/seed", async (req: Request, res: Response) => {
  try {
    const { _id: themeId } = await Themes.create({
      name: "scandinavian",
      image: "imageURL",
      description: "scandanavian",
    });
    const seed = await Vendors.create({
      name: "PCK PTE LTD",
      themes: [themeId],
      description: "Best in Singapore, JB and some say Batam",
      address: "73 Ubi Road 1, #10-49 Oxley Bizhub 1, Singapore 408733",
      rooms: ["62adcb4e6c4a3126663f88c0"],
      img: "https://d1hy6t2xeg0mdl.cloudfront.net/image/601663/89831c764d/standard",
    });
    res.send(seed);
  } catch (err) {
    res.send(err);
  }
});

//SHOW ROUTE
Router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vendor = await Vendors.findById(id)
      .populate("themes")
      .populate("rooms");
    res.send(vendor);
  } catch (err) {
    res.send(err);
  }
});

// // CREATE ROUTES
// Router.post("/", async (req, res) => {
//   try {
//     res.status(200).send({ message: "Success" });
//   } catch {
//     res.status(400).json({ message: "Failure" });
//   }
// });

// // DELETE ROUTE
// Router.delete("/:id", async (req, res) => {
//   try {
//     //const ,,, = await ,,,.findByIdAndRemove(req.params.id);
//     res.status(200).send("Great Success");
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// //UPDATE ROUTE
// Router.put("/:id", async (req, res) => {
//   try {
//     // const ,,, = await ,,,.findByIdAndUpdate(
//     //   req.params.id,
//     //   req.body,
//     //   { new: true }
//     // );
//     res.status(200).send("Great Success");
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

//EXPORT
export default Router;
