// DEPENDENCIES
import mongoose from 'mongoose';
import express from "express";
import Users from "../models/userModel"

//CONFIG
const Router = express.Router();

Router.get('/', async (req, res) => {
  try { 
    const users = await Users.find() 
    res.send(users)
  } catch (err) {
    res.send(err)
  }
})

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
    })
    res.send(seed)
  } catch (err) {
    res.send(err)
  }
})

Router.get("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const user = await Users.findById(id).populate("rooms").populate("userForm")
    res.send(user)
  } catch (err) {
    res.send(err)
  }
})








//ROUTES

// // INDEX ROUTES
// Router.get("/", async (req, res) => {
//   try {
//     res.send();
//   } catch (error) {
//     res.send(error);
//   }
// });

// // CREATE ROUTES
// Router.post("/", async (req, res) => {
//   try {
//     res.status(200).send({ message: "Success" });
//   } catch {
//     res.status(400).json({ message: "Failure" });
//   }
// });

// // INDEX ROUTES
// Router.get("/", async (req, res) => {
//   try {
//     //const .... = await ...model.find();
//     res.status(200).send({ message: "Great Success" });
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