import { Schema, model } from "mongoose";

interface RoomOptions {
  package: string;
  theme: string[];
}

interface Selection {
  roomName: string;
  roomOptions: RoomOptions;
}

interface IForm {
  propertyType: string;
  propertyStatus: string;
  renoType: string;
  renoPriority: string;
  keyCollected: boolean;
  loanRequired: boolean;
  rooms: string[];
  budget: number;
  floorSize: number;
  comments: string;
  selection: [Selection];
}

const formSchema = new Schema<IForm>({
  propertyType: String,
  propertyStatus: String,
  renoType: String,
  renoPriority: String,
  
  keyCollected: Boolean,
  loanRequired: Boolean,
  rooms: [String],
  budget: Number,
  floorSize: Number,
  comments: String,
  selection: [
    { roomName: String, roomOptions: { package: String, theme: [String] } },
  ],
});

const Form = model<IForm>("FormModel", formSchema);

export default Form;
