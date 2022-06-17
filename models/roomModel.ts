import mongoose, { Schema, Types } from "mongoose";

interface IPack {
  name: string;
  info: string[];
}

export interface IRoom {
  name: string;
  packages: [IPack];
}

export const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  packages: [{ name: String, info: [String] }],
});

const room = mongoose.model<IRoom>("IDModel", roomSchema);

export default room;
