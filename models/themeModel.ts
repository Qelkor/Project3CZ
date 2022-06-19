import {Schema, Types, model} from "mongoose";
import {vendorModelName} from "./modelNames"

interface IThemes {
  vendor: Types.ObjectId
  name: string;
  image: string;
  description: string;
}

const themesSchema = new Schema<IThemes>({
  vendor: {type: Schema.Types.ObjectId, ref: vendorModelName},
  name: {type: String, required: true},
  image: String,
  description: String,
});

const Themes = model<IThemes>("Themes", themesSchema);

export default Themes


