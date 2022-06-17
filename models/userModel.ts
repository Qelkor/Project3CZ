import mongoose, { Schema, Types } from "mongoose";
import { IForm, formSchema } from "./formModel";

interface IUser {
  name: string;
  email: string;
  password: string;
  userForm: [IForm];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userForm: [formSchema],
});

const User = mongoose.model<IUser>("UserModel", UserSchema);

export default User;
