import mongoose, { Schema, Types } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  userForm: [formInterface];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userForm: [childSchema],
});

const User = mongoose.model<IUser>("UserModel", UserSchema);

export default User;
