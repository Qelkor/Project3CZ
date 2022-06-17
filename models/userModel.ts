import { Schema, Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  userForm: [Types.ObjectId];
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forms: { type: }
});
