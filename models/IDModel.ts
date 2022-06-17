import mongoose from "mongoose";

export interface IdCard extends mongoose.Document {
  name: string;
  theme: string;
  description: string;
  certs: [string];
}

const IDSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rooms: {type: []}
  theme: { type: [String], default: ["Modern"] },
  description: { type: String, default: "Found in ..." },
  certs: { type: [String], default: ["Casetrust"] },
});

module.exports = mongoose.model("IDModel", IDSchema);

//Vendor name
//What rooms they renovate
//What packages they offer for each room
// What theme offer each room

{
  name: Id,
  theme: monochrome, scandanavian,
  package:{bedroom :[ "cabinets & bed frame",
 "pk1 + lightings",
 "pk2 + floorings, windows, and free dog"],
kitchen: [ "cabinets & flooring",
"pk1 + lightings",
"pk2 + elbow chimney & island bar"],
toilet ,
livingroom,
full}
}
