import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextInput from "./inputComponents/Text";
import PasswordInput from "./inputComponents/Password";
import RadioButtons from "./inputComponents/RadioButtons";
import RoomOptions from "./inputComponents/RoomOptions";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignupReview from "./inputComponents/SignupReview";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from '@mui/icons-material/Error';
import Typography from "@mui/material/Typography"

const Signup = () => {
	//Formik Config
	const initialValues = {
		name: "",
		password: "",
		passwordCheck: "",
		email: "",
		userForm: [],
		propertyType: "",
		propertyStatus: "",
		renovationType: "",
		renovationPriority: "",
		keyCollected: undefined,
		loanRequired: undefined,
		rooms: [],
		budget: 0,
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Username is required"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		passwordCheck: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Required"),
		email: Yup.string().email("Invalid email address").required("Email is required"),
		propertyType: Yup.string().required("Please select one"),
		propertyStatus: Yup.string().required("Please select one"),
		keyCollected: Yup.bool().required("Please select one"),
		loanRequired: Yup.bool().required("Please select one"),
		renovationPriority: Yup.string().required("Please select one"),
		renovationType: Yup.string().required("Please select one"),
		budget: Yup.number().moreThan(0, "Please state your approximate budget"),
		rooms: Yup.array().min(1, "Please select at least 1"),
	});

	//TAB Config
	const [tabValue, setValue] = useState("1");
	const handleTab = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleNext = () => {
		setValue((value) => (Number(value) + 1).toString());
	};

	const handleBack = () => {
		setValue((value) => (Number(value) - 1).toString());
	};

	//Alert Response Config
	const navigate = useNavigate();
	const [respStatus, setRespStatus] = useState(0)
	
	useEffect(() => {
		if (respStatus === 200) {
			setTimeout(() => {
				navigate("/login")
			}, 1500)
		}
	}, [respStatus, navigate])

	return (
		<>
			{respStatus === 200 && <Alert icon={<CheckIcon fontSize="inherit" />}  variant="filled" severity="info">Sign up was a great success! If you are not redirected <Link to="/login">click here</Link></Alert>}
			{respStatus >= 400 && <Alert icon={<ErrorIcon fontSize="inherit" />} onClose={() => setRespStatus(0)} variant="filled" severity="error"> Sign up failed. Please try again.</Alert>}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					axios.post("/api/user/signup", values).then((data) => setRespStatus(data.status)).catch(error => setRespStatus(400));
					setTimeout(() => {
						setSubmitting(false);
					}, 400);
				}}
			>
				{(props) => (
					<Form>
					<Typography sx={{width: "100vw", backgroundColor: "#757de8"}} color="white" align="center" variant="h5">Sign up for Credo!</Typography>
						<Box sx={{mt:2, display: "flex", width: "100vw", justifyContent: "center"}}>
							<Card elevation={7}>
								<TabContext value={tabValue}>
									<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
										<TabList onChange={handleTab} aria-label="lab API tabs example">
											<Tab label="Account" value="1" />
											<Tab label="House" value="2" />
											<Tab label="Renovation" value="3" />
											<Tab label="Review" value="4" />
										</TabList>
									</Box>
									<TabPanel value="1">
										<Typography sx={{mb: 1}} variant="body1" color="black">Please fill in the following account details.</Typography>
										<TextInput label="Username" name="name" />
										<TextInput label="Email" name="email" />
										<PasswordInput label="Password" name="password" />
										<PasswordInput label="Enter password again" name="passwordCheck" />
										<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
											<Button sx={{ mt: 2 }} onClick={handleNext} variant="contained">
												Next
											</Button>
										</Box>
									</TabPanel>
									<TabPanel value="2">
									<Typography sx={{mb: 1}} variant="body1" color="black">Tell us more about your property.</Typography>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<RadioButtons
												label="Property Type"
												name="propertyType"
												op1="HDB"
												op2="Condo"
												op3="Landed"
												op4="Commercial"
											/>
											<RadioButtons
												label="Property Status"
												name="propertyStatus"
												op1="New"
												op2="Resale"
												op3="Existing"
											/>
											<RadioButtons
												label="Keys Collected?"
												name="keyCollected"
												op1="Yes"
												op2="No"
											/>
										</Box>
										<Box sx={{ display: "flex", justifyContent: "space-between" }}>
											<Button onClick={handleBack} variant="contained">
												Previous
											</Button>
											<Button onClick={handleNext} variant="contained">
												Next
											</Button>
										</Box>
									</TabPanel>
									<TabPanel value="3">
										<Typography sx={{mb: 1}} variant="body1" color="black">Tell us more about your intended renovation.</Typography>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<RadioButtons
												label="Renovation Priority"
												name="renovationPriority"
												op1="Stick to Budget"
												op2="Pay for better design"
											/>
											<RadioButtons
												label="Renovation Type"
												name="renovationType"
												op1="Full"
												op2="Partial"
											/>
											<RadioButtons label="Loan Required" name="loanRequired" op1="Yes" op2="No" />
											<TextInput label="Budget" name="budget" type="number" margin={2} />
											<RoomOptions name="rooms" />
										</Box>
										<Box sx={{ display: "flex", justifyContent: "space-between" }}>
											<Button onClick={handleBack} variant="contained">
												Previous
											</Button>
											<Button onClick={handleNext} variant="contained">
												Next
											</Button>
										</Box>
									</TabPanel>
									<TabPanel value="4">
										<Typography sx={{mb: 1}} variant="body1" color="black">Please check your information.</Typography>
										<SignupReview {...props.values} />
										<Box sx={{ display: "flex", justifyContent: "space-between" }}>
											<Button onClick={handleBack} variant="contained">
												Previous
											</Button>
											<Button type="submit" variant="contained">
												Submit
											</Button>
										</Box>
									</TabPanel>
								</TabContext>
							</Card>
						</Box>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Signup;
