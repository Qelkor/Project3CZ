import mongoose, { Schema, Types } from "mongoose";
import { IRoom, roomSchema } from "./roomModel";

interface ITheme {
  name: string;
  source: string;
}

interface IID {
  name: string;
  theme: [ITheme];
  description: string;
  address: string;
  certs: string[];
  rooms: [IRoom];
}

const IDSchema = new Schema<IID>({
  name: { type: String, required: true },
  theme: [{ name: String, source: String }],
  description: { type: String, default: "Founded in Singapore" },
  address: { type: String, required: true },
  certs: { type: [String], default: ["Casetrust"] },
  rooms: [roomSchema],
});

const ID = mongoose.model<IID>("IDModel", IDSchema);
