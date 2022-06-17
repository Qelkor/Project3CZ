// DEPENDENCIES
import express, { Request, Response } from "express";

//CONFIG
const Router = express.Router();

//ROUTES

// INDEX ROUTES
Router.get("/", async (req: Request, res: Response) => {
  try {
    res.send();
  } catch (error) {
    res.send(error);
  }
});

// CREATE ROUTES
Router.post("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Success" });
  } catch {
    res.status(400).json({ message: "Failure" });
  }
});

// INDEX ROUTES
Router.get("/", async (req: Request, res: Response) => {
  try {
    //const .... = await ...model.find();
    res.status(200).send({ message: "Great Success" });
  } catch {
    res.status(400).json({ message: "Failure" });
  }
});

//SHOW ROUTE
Router.get("/:id", async (req: Request, res: Response) => {
  if (!req.session) {
    res.status(401).send({ status: "fail", data: "No access" });
  } else {
    const id = req.params.id;
    try {
      //const ... = await ,,,.findById(id);
      if (,,, === null) {
        res.status(404).send({ status: "fail", data: "Holiday Not Found" });
      } else {
        res.status(200).send({ message: "Failure"});
      }
    } catch (error) {
      res.send(error);
    }
  }
});


// DELETE ROUTE
Router.delete("/:id", async (req: Request, res: Response) => {
  try {
    //const ,,, = await ,,,.findByIdAndRemove(req.params.id);
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE ROUTE
Router.put("/:id", async (req, res) => {
  try {
    // const ,,, = await ,,,.findByIdAndUpdate(
    //   req.params.id,
    //   req.body,
    //   { new: true }
    // );
    res.status(200).send("Great Success");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//EXPORT
module.exports = Router;