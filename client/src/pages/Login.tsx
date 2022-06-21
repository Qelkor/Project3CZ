import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Text from "./inputComponents/Text";
import Password from "./inputComponents/Password";
import Button from "@mui/material/Button";

interface Res {
  message: String;
}

interface IValues {
  email: String;
  password: String;
}

const Login = () => {
	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Not a valid email').required("email required"),
		password: Yup.string().required("Password required"),
  });
  
  const handleResponse = async (val:IValues) => {
    try {
      const {data} = await axios.post<Res>("api/user/login", val)
      alert(data.message)
    } catch (error:any) {
      alert(error.message)
    }
  }

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
        handleResponse(values)
				setTimeout(() => {
					setSubmitting(false);
				}, 400);
			}}
		>
			<Form>
				<h1>Login Page</h1>
				<Text label="Email" name="email" />
        <Password label="Password" name="password" />
        <Button type="submit">Submit</Button>
			</Form>
		</Formik>
	);
};

export default Login;
