import { Schema, model } from "mongoose";

interface IRooms {
	name: string;
}

const roomsSchema = new Schema<IRooms>({
  name: {type: String, required: true}
});

const Rooms = model<IRooms>("Rooms", roomsSchema);

export default Rooms