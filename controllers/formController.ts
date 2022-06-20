// DEPENDENCIES
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import Forms from "../models/formModel";
import session from "express-session";

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

// //Session authentication
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   if (req.session.user) {
//     return next();
//   } else {
//     res.send("Invalid Request");
//   }
// };
// // COOKIE
// Router.get("/secret", isAuthenticated, async (req: Request, res: Response) => {
//   res.send(req.session.user);
// });

// Create Form Routes
Router.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.vendor || !body.themes || !body.selection) {
    res.status(400).send({ status: "Please fill up all inputs." });
  } else {
    const newForm = await Forms.create(body);
    res.status(200).send({ status: "Great Success", data: newForm });
  }
});

// // SEED ROUTE
// Router.get("/seed", async (req: Request, res: Response) => {
//   try {
//     const seed = await Forms.create({
//       vendor: "62add87478d38ad0b780a652",
//       selection: [
//         {
//           roomName: "62adcb4e6c4a3126663f88c0",
//           packageOptions: {
//             name: "Package A",
//             info: ["Repaint wall", "Retile floor"],
//           },
//         },
//       ],
//       themes: ["62add87478d38ad0b780a650"],
//       comments: "The faster the better",
//     });
//     res.send(seed);
//   } catch (err) {
//     res.send(err);
//   }
// });

Router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const form = await Forms.findById(id)
      .populate("vendor")
      .populate({ path: "selection", populate: "roomName" })
      .populate("themes");
    res.send(form);
  } catch (err) {
    res.send(err);
  }
});

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

// DELETE ROUTE
Router.delete("/:id", async (req, res) => {
  try {
    const form = await Forms.findByIdAndRemove(req.params.id);
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(400).json({ error: error.message });
  }
});

// //EXPORT
export default Router;
