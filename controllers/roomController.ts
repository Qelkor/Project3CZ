import mongoose from "mongoose";
import express, { Request, Response } from "express";
import Rooms from "../models/roomModel";
import session from "express-session";

const Router = express.Router();

Router.get("/", async (req: Request, res: Response) => {
  try {
    const rooms = await Rooms.find();
    res.send(rooms);
  } catch (err) {
    res.send(err);
  }
});

Router.get("/seed", async (req: Request, res: Response) => {
  try {
    const seed = await Rooms.insertMany([
      { name: "Bedroom" },
      { name: "Kitchen" },
      { name: "Living Room" },
      { name: "Toilet" },
    ]);
    res.send(seed);
  } catch (err) {
    res.send(err);
  }
});

export default Router;
