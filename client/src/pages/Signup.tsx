import { useState } from "react";
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

const Signup = () => {
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
		budget:Yup.number().moreThan(0, "Please state your approximate budget"),
		rooms: Yup.array().min(1, "Please select at least 1")
	});

	const [tabValue, setValue] = useState("1");
	const handleTab = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				axios.post("/api/user/signup", values).then((data) => console.log(data.status));
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form>
				<h1>Sign up for Credo</h1>
				<Box sx={{ display: "flex", width: "100vw", justifyContent: "center" }}>
					<Card elevation={7} sx={{ width: "70vw" }}>
						<TabContext value={tabValue}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleTab} aria-label="lab API tabs example">
									<Tab label="Account" value="1" />
									<Tab label="House" value="2" />
									<Tab label="Renovation" value="3" />
								</TabList>
							</Box>
							<TabPanel value="1">
								<TextInput label="Username" name="name" />
								<TextInput label="Email" name="email" />
								<PasswordInput label="Password" name="password" />
								<PasswordInput label="Enter password again" name="passwordCheck" />
							</TabPanel>
							<TabPanel value="2">
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
									<RadioButtons label="Keys Collected?" name="keyCollected" op1="Yes" op2="No" />
								</Box>
							</TabPanel>
							<TabPanel value="3">
								<Box sx={{display: "flex", flexDirection: "column"}}>
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
									<RoomOptions name="rooms"/>
								</Box>
							</TabPanel>
						</TabContext>
						<Button type="submit" variant="contained">
							Submit
						</Button>
					</Card>
				</Box>
			</Form>
		</Formik>
	);
};

export default Signup;
