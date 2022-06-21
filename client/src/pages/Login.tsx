import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Text from "./inputComponents/Text";
import Password from "./inputComponents/Password";

const Login = () => {
	const initialValues = {
		name: "",
		password: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Username required"),
		password: Yup.string().required("Password required"),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				axios
					.get("/api/login")
					.then((data) => alert(data))
					.catch((error) => alert(error.message));
				setTimeout(() => {
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form>
				<h1>Login Page</h1>
				<Text label="Username" name="name" />
				<Password label="Password" name="password" />
			</Form>
		</Formik>
	);
};

export default Login;
