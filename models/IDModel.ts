import mongoose, { Schema, Types } from "mongoose";

interface IdCard {
  name: string;
  theme: string;
  description: string;
  address: string;
  certs: [string];
  rooms: [roomInterface];
}

const IDSchema = new mongoose.Schema({
  name: { type: String, required: true },
  theme: { type: [String], default: ["Modern"] },
  description: { type: String, default: "Founded in Singapore" },
  certs: { type: [String], default: ["Casetrust"] },
  rooms: [childSchema],
});

module.exports = mongoose.model("IDModel", IDSchema);

// const UserSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   userForm: [childSchema],
// });

// const User = mongoose.model<IUser>("UserModel", UserSchema);

// export default User;
