import { Schema, Types, model } from "mongoose";
import {vendorModelName, roomModelName, themeModelName} from "./modelNames"

interface packageOptions {
  name: string;
  info: string[];
}

interface Selection {
  roomName: Types.ObjectId;
  packageOptions: packageOptions;
}

interface IForm {
  vendor: Types.ObjectId
  selection: Selection[];
  themes: Types.ObjectId[];
  comments: string;
}

const formSchema = new Schema<IForm>({
  vendor: { type: Schema.Types.ObjectId, ref: vendorModelName},
  selection: [{roomName: {type: Schema.Types.ObjectId, ref: roomModelName}, packageOptions: {name: String, info: [String]}}],
  themes: [{ type: Schema.Types.ObjectId, ref: themeModelName }],
  comments: String,
});

const Forms = model<IForm>("Forms", formSchema);

export default Forms
