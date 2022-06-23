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
      selection: [
        {
          roomName: "62b4de2221388ba8b5b0a576",
          packageOptions: [
            {
              name: "Package A",
              info: [
                "Consultation on materials, layout, and theme",
                "Two sketched drafts and one 3d render of finalised layout",
                "Sourcing of materials, furniture, and lighting",
                "All related works including carpentry and lights",
              ],
            },
            {
              name: "Package B",
              info: [
                "One 3d render of finalised layout",
                "Sourcing of materials and lighting",
                "Furniture to be provided by client",
                "All related works including carpentry and lights",
              ],
            },
          ],
        },
        {
          roomName: "62b4de2221388ba8b5b0a579",
          packageOptions: [
            {
              name: "Package A",
              info: [
                "Consultation on materials, layout, and theme",
                "Sourcing and installation of fittings and pipings",
                "3d render of finalized design",
                "All works including waterproofing",
                "Gaurantee provided on all waterproofing works for 1 year",
              ],
            },
            {
              name: "Package B",
              info: [
                "Consultation on layout",
                "3d render of finalized design",
                "Installation of fittings and pipings",
                "All works including waterproofing",
              ],
            },
          ],
        },
      ],
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
      .populate({ path: "selection", populate: "roomName" });
    res.send(vendor);
  } catch (err) {
    res.send(err);
  }
});

//EXPORT
export default Router;
