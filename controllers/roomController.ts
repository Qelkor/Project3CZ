import mongoose from "mongoose";
import express from "express";
import Rooms from "../models/roomModel";

const Router = express.Router();

Router.get("/", async (req, res) => {
	try {
		const rooms = await Rooms.find();
		res.send(rooms);
	} catch (err) {
		res.send(err);
	}
});

Router.get("/seed", async (req, res) => {
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
