import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextInput from "./inputComponents/Text";
import PasswordInput from "./inputComponents/Password";
import RadioButtons from "./inputComponents/RadioButtons";
import RoomOptions from "./inputComponents/RoomOptions";

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
		keyCollected: null,
		loanRequired: null,
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
	});

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
				<TextInput label="Username" name="name" />
				<PasswordInput label="Password" name="password" />
				<PasswordInput label="PasswordCheck" name="passwordCheck" />
				<TextInput label="Email" name="email" />
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
				<RadioButtons label="Renovation Type" name="renovationType" op1="Full" op2="Partial" />
				<RadioButtons
					label="Renovation Priority"
					name="renovationPriority"
					op1="Stick to Budget"
					op2="Pay for better design"
				/>
				<RadioButtons label="Key Collected" name="keyCollected" op1="Yes" op2="No" />
				<RadioButtons label="Loan Required" name="loanRequired" op1="Yes" op2="No" />
				<RoomOptions name="rooms"/>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Form>
		</Formik>
	);
};

export default Signup;
