import { Schema, Types, model } from "mongoose";
import { formModelName, roomModelName } from "./modelNames";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userForm: Types.ObjectId[];
  propertyType: string;
  propertyStatus: string;
  renovationType: string;
  renovationPriority: string;
  keyCollected: boolean;
  loanRequired: boolean;
  rooms: Types.ObjectId[];
  budget: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userForm: [{ type: Schema.Types.ObjectId, ref: formModelName }],
  propertyType: String,
  propertyStatus: String,
  renovationType: String,
  renovationPriority: String,
  keyCollected: Boolean,
  loanRequired: Boolean,
  rooms: [{ type: Schema.Types.ObjectId, ref: roomModelName }],
  budget: Number,
});

const Users = model<IUser>("Users", userSchema);

export default Users;
