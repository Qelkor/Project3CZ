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
  const [trigger, setTrigger] = useState(0)
	const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(`/api/user/${user?._id}`);
      if (data.status === 200) {
        setUser({...data.data, userForm: data.data.userForm.map((form: {vendor: {name: any;};}) => ({...form, vendor: form.vendor.name}))});
      } else {
        alert(`${data.data}`);
      }
    };
		fetchData();
	}, [trigger]);

  //Modal config
  const [show, setShow] = useState("");
  const handleClick = (id:string) => {
    setShow(id)
  }

  //typeguard & login check
	if (user === undefined) {
		navigate("/");
		return <h1>error</h1>;
  }
  
  const handleDelete = async(id:string) => {
    const {data} = await axios.delete(`/api/form/${id}`);
    if (data.status === 200) {
      setTrigger((value) => {return (value + 1);})
    } else {
      alert(`${data.data}`)
    }
  }

	return (
		<>
			<Navbar />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>Vendor</TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">Date Submitted</TableCell>
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
                  <IconButton onClick={() => handleClick(form._id)}>
                    <ViewIcon fontSize="large" color="primary" />
                  </IconButton>
                  <FormModal id={form._id} showState={show} setShow={handleClick} />
								</TableCell>
								<TableCell align="right">
                  <IconButton onClick={() => handleDelete(form._id)}>
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
