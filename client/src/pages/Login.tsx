import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  }

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
  })

	interface TextInputProps {
		label: string;
		name: string;
	}

	const TextInput = ({ label, name }: TextInputProps) => {
		const [field, meta] = useField(name);
		return (
			<>
				<TextField variant="outlined" label={label} {...field} />
				{meta.touched && meta.error ? <div>{meta.error}</div> : null}
			</>
		);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, {setSubmitting}) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form>
				<h1>Login Page</h1>
				<TextInput label="Username" name="username" />
				<TextInput label="Password" name="password" />
				<TextInput label="Email" name="email" />
				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
};

export default Login;
