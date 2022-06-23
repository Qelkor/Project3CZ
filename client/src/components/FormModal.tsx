import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";

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
	setShow: any;
}

interface FormState {
	user: any;
	vendor: any;
	themes: any;
	selection: any;
	comments?: string;
	propertyType: string;
	propertyStatus: string;
	renovationType: string;
	renovationPriority: string;
	keyCollected: boolean;
	loanRequired: boolean;
	budget: number;
	status: string;
	dateSubmitted: string;
}
const FormModal = ({ id, showState, setShow }: ModalProps) => {
	const [form, setForm] = useState<FormState>();
	const handleClose = () => setShow("empty");

	useEffect(() => {
		const fetchData = async () => {
			if (id !== undefined) {
				const { data } = await axios.get(`/api/form/${id}`);
				if (data.status === 200) {
					setForm(data.data);
				} else {
					alert(`${data.data}`);
				}
			}
		};
		fetchData();
	}, [id]);

	if (form === undefined) {
		return <h1> error </h1>
	}

	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'SGD',
	});

	return (
			<Modal
				open={id === showState}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
			<Box sx={style}>
				<Typography variant="h6" color="primary">Vendor</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{form.vendor.name}</Typography>
				<Typography variant="h6" color="primary">{`Rooms & Packages`}</Typography>
				{<ul>
					{form.selection.map((choice:any) =>
						<li key={choice._id}>
							<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${choice.room}: ${choice.package}`}</Typography>
						</li>
					)}
				</ul>}
				<Typography variant="h6" color="primary">Themes</Typography>
				{<ul>
					{form.themes.map((choice:any) =>
						<li key={choice._id}>
							<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${choice.name}`}</Typography>
						</li>
					)}
				</ul>}
				<Typography variant="h6" color="primary">Property Type</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{form.propertyType}</Typography>
				<Typography variant="h6" color="primary">Property Status</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{form.propertyStatus}</Typography>
				<Typography variant="h6" color="primary">Keys Collected</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${form.keyCollected}`[0].toUpperCase() + `${form.keyCollected}`.substring(1)}</Typography>
				<Typography variant="h6" color="primary">Renovation Type</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{form.renovationType}</Typography>
				<Typography variant="h6" color="primary">Renovation Priority</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{form.renovationPriority}</Typography>
				<Typography variant="h6" color="primary">Budget</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{formatter.format(form.budget)}</Typography>
				<Typography variant="h6" color="primary">Loan Required</Typography>
				<Typography sx={{mb: 1, fontWeight: "bold"}} variant="body1" color="black">{`${form.loanRequired}`[0].toUpperCase() + `${form.loanRequired}`.substring(1)}</Typography>
			</Box>
			</Modal>
	);
};

export default FormModal;
