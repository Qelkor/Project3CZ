import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import FormModal from "../components/FormModal";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const Applications = () => {
	const [user, setUser] = useAtom(userAtom);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`/api/user/${user?._id}`);
			if (data.status === 200) {
				setUser(data.data);
			} else {
				alert(`${data.data}`);
			}
		};
		fetchData();
	}, [user, setUser]);

	if (user === undefined) {
		navigate("/");
		return <h1>error</h1>;
	}

	return (
		<>
			<Navbar />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>Vendor</TableCell>
							<TableCell align="right">Date Submitted</TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">View Form</TableCell>
							<TableCell align="right">Delete</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.userForm.map((form) => (
							<TableRow key={form.vendor}>
								<TableCell component="th" scope="row">
									{form.vendor}
								</TableCell>
								<TableCell align="right">{form.status}</TableCell>
								<TableCell align="right">{form.dateSubmitted}</TableCell>
								<TableCell align="right">
									<IconButton>
										<ViewIcon fontSize="large" color="primary" />
									</IconButton>
								</TableCell>
								<TableCell align="right">
									<IconButton>
										<DeleteIcon fontSize="large" color="primary" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Applications;
