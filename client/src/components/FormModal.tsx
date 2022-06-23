import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface ModalProps {
	showState: string;
	id: string;
}
const FormModal = ({ id, showState }: ModalProps) => {
	const [form, setForm] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`/api/form/${id}`);
			if (data.status === 200) {
				setForm(data.data);
			} else {
				alert(`${data.data}`);
			}
		};
		fetchData();
	}, [id]);

	return (
		<Modal
			open={id === showState}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Text in a modal
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
			</Box>
		</Modal>
	);
};

export default FormModal;
