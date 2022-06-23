import { Schema, Types, model } from "mongoose";
import { vendorModelName, userModelName, themeModelName } from "./modelNames";

interface choices {
	room: string;
	package: string;
}

interface IForm {
	user: Types.ObjectId;
	vendor: Types.ObjectId;
	themes: Types.ObjectId[];
	selection: choices[];
	comments?: string;
	propertyType: string;
	propertyStatus: string;
	renovationType: string;
	renovationPriority: string;
	keyCollected: boolean;
	loanRequired: boolean;
	budget: number;
}

const formSchema = new Schema<IForm>({
  user: { type: Schema.Types.ObjectId, ref: userModelName },
	vendor: { type: Schema.Types.ObjectId, ref: vendorModelName },
	themes: [{ type: Schema.Types.ObjectId, ref: themeModelName }],
	selection: [{ room: String, package: String }],
	comments: String,
	propertyType: String,
	propertyStatus: String,
	renovationType: String,
	renovationPriority: String,
	keyCollected: Boolean,
	loanRequired: Boolean,
	budget: Number,
});

const Forms = model<IForm>("Forms", formSchema);

export default Forms;
