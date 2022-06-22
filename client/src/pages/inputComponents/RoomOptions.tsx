import { useEffect, useState } from "react";
import { useField } from "formik";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";

interface RoomOptionsProps {
	name: string;
}

interface RoomsData {
	name: string;
	_id: string;
}

const RoomOptions = ({ name }: RoomOptionsProps) => {
	const [RoomOptions, setRoomOptions] = useState([]);
	const [field, meta] = useField(name);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("/api/room");
			setRoomOptions(data);
		};
		fetchData();
	}, []);

	return (
		<FormGroup>
			<FormLabel>
				<Typography variant="h6" color="primary">
					Please select the rooms you wish to renovate:
				</Typography>
			</FormLabel>
			{RoomOptions.map((room: RoomsData) => (
				<>
					<FormControlLabel control={<Checkbox {...field} value={room._id} />} label={room.name} />
					
				</>
			))}
			{meta.touched && meta.error ? <Typography color="error" >*{meta.error}</Typography> : null}
		</FormGroup>
	);
};

export default RoomOptions;
