import { Schema, Types, model } from "mongoose";
import { formModelName, roomModelName } from "./modelNames";

export interface IUser {
  name: string;
  email: string;
  password: string;
  userForm: Types.ObjectId[];
  propertyType: string;
  propertyStatus: string;
  renoType: string;
  renoPriority: string;
  keyCollected: boolean;
  keyDate?: Date;
  loanRequired: boolean;
  rooms: Types.ObjectId[];
  budget: number;
  floorSize: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  userForm: [{ type: Schema.Types.ObjectId, ref: formModelName }],
  propertyType: String,
  propertyStatus: String,
  renoType: String,
  renoPriority: String,
  keyCollected: Boolean,
  keyDate: Date,
  loanRequired: Boolean,
  rooms: [{ type: Schema.Types.ObjectId, ref: roomModelName }],
  budget: Number,
  floorSize: Number,
});

const Users = model<IUser>("Users", userSchema);

export default Users;
