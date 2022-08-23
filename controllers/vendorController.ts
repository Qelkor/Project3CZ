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
      name: "Minimalism",
      image:
        "https://d1hy6t2xeg0mdl.cloudfront.net/image/595745/28fb061a8a/standard",
      description: "Minimalism",
    });
    const seed = await Vendors.create({
      name: "Lome PTE LTD",
      themes: [themeId],
      description: "Interior design at its finest",
      address: "Blk 2 Joo Chiat Road #01-1135, Joo Chiat Complex",
      rooms: ["62adcb4e6c4a3126663f88c0"],
      img: "https://d1hy6t2xeg0mdl.cloudfront.net/image/594981/1f633e63b6/standard",
      selection: [
        {
          roomName: "62b4de2221388ba8b5b0a576",
          packageOptions: [
            {
              name: "Package A",
              info: [
                "",
                "Teak bed frame, with synthetic fibre(water Proof)",
                "Plain plaster flase ceiling with LED flood lights",
                "All related works including carpentry and lights",
              ],
            },
            {
              name: "Package B",
              info: [
                "Package A, with baobab furniture",
                "Marble tiled floor(italian)",
                "Complementary Juniper bonsai tree",
                "3 years warranty for cracked tile replacement",
              ],
            },
          ],
        },
        {
          roomName: "62b4de2221388ba8b5b0a577",
          packageOptions: [
            {
              name: "Package A",
              info: [
                "Consultation on materials, layout, and theme",
                "Carpentry with quartz tabletop(heat treated)",
                "316 Stainless Steel garbage Chute with fixed welding to prevent air and leaks",
                "Guarantee provided on all waterproofing works for 1 year",
              ],
            },
            {
              name: "Package B",
              info: [
                "Consultation on layout",
                "3d render of finalized design",
                "Marble or natural stone tabletop",
                "Invisacook induction stove with marble or slate",
              ],
            },
          ],
        },
        {
          roomName: "62b4de2221388ba8b5b0a578",
          packageOptions: [
            {
              name: "Package A",
              info: [
                "Consultation on materials, layout, and 3 proposed themes ",
                "Sourcing and installation of fittings and pipings",
                "Basic plaster design for ceiling",
                "Parquet flooring and polishing or quartz tiles",
                "Free buffing and polishing of parquet flooring for 2 years",
              ],
            },
            {
              name: "Package B",
              info: [
                "Pandomo Flooring by a certified contractor from Germany",
                "3d render of finalized design",
                "Furniture provided by Scanteak",
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
