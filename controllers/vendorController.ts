// DEPENDENCIES
import mongoose from "mongoose";
import express from "express";
import Themes from "../models/themeModel";
import Vendors from "../models/vendorModel";

//CONFIG
const Router = express.Router();

// INDEX ROUTES
Router.get("/", async (req, res) => {
  try {
    const vendors = await Vendors.find()
    res.send(vendors);
  } catch (error) {
    res.send(error);
  }
});

//SEED ROUTE
Router.get("/seed", async (req, res) => {
	try {
		const { _id: themeId } = await Themes.create({
			name: "modern",
			image: "imageURL",
			description: "very very modern",
    });
		const seed = await Vendors.create({
			name: "PCK PTE LTD",
			themes: [themeId],
			description: "Best in singapore and JB",
			address: "Singapore 523423 Rosie Lane",
			rooms: ["62adcb4e6c4a3126663f88c0"],
		});
		res.send(seed);
	} catch (err) {
		res.send(err);
	}
});

//SHOW ROUTE
Router.get("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const vendor = await Vendors.findById(id).populate("themes").populate("rooms");
    res.send(vendor)
  } catch (err) {
    res.send(err)
  }
})



// // CREATE ROUTES
// Router.post("/", async (req, res) => {
//   try {
//     res.status(200).send({ message: "Success" });
//   } catch {
//     res.status(400).json({ message: "Failure" });
//   }
// });

// //SHOW ROUTE
// Router.get("/:id", async (req, res) => {
//   if (!req.session) {
//     res.status(401).send({ status: "fail", data: "No access" });
//   } else {
//     const id = req.params.id;
//     try {
//       //const ... = await ,,,.findById(id);
//       if (,,, === null) {
//         res.status(404).send({ status: "fail", data: "Holiday Not Found" });
//       } else {
//         res.status(200).send({ message: "Failure"});
//       }
//     } catch (error) {
//       res.send(error);
//     }
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
