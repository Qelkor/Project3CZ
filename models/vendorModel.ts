import { Schema, Types, model } from "mongoose";
import { themeModelName, roomModelName } from "./modelNames";

export interface IVendor {
  _id?: string;
  name: string;
  themes: Types.ObjectId[];
  description: string;
  address: string;
  certs: string[];
  img: string;
  rooms: Types.ObjectId[];
}

const vendorSchema = new Schema<IVendor>({
  name: { type: String, required: true },
  themes: [{ type: Schema.Types.ObjectId, ref: themeModelName }],
  description: { type: String, default: "Founded in Singapore" },
  address: String,
  certs: { type: [String], default: ["Casetrust"] },
  img: {
    type: String,
    default:
      "https://d1hy6t2xeg0mdl.cloudfront.net/image/601405/b54a773a30/standard",
  },
  rooms: [{ type: Schema.Types.ObjectId, ref: roomModelName }],
});

const Vendors = model<IVendor>("Vendors", vendorSchema);

export default Vendors;
