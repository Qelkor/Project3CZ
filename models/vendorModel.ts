import {Schema, Types, model} from "mongoose";
import {themeModelName, roomModelName} from "./modelNames"

interface IVendor {
	name: string;
	themes: Types.ObjectId[];
	description: string;
	address: string;
	certs: string[];
	rooms: Types.ObjectId[];
}

const vendorSchema = new Schema<IVendor>({
	name: { type: String, required: true },
	themes: [{ type: Schema.Types.ObjectId, ref: themeModelName }],
	description: { type: String, default: "Founded in Singapore" },
	address: String,
	certs: { type: [String], default: ["Casetrust"] },
	rooms: [{ type: Schema.Types.ObjectId, ref: roomModelName }],
});

const Vendors = model<IVendor>("Vendors", vendorSchema);

export default Vendors