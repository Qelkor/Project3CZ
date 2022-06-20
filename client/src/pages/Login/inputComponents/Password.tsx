import { useField } from "formik";
import TextField from "@mui/material/TextField";

interface PasswordProps {
  label: string;
  name: string;
}

const PasswordInput = ({ label, name }: PasswordProps) => {
  const [field, meta] = useField(name);
  return (
    <>
      <TextField variant="outlined" label={label} {...field} type="password" />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default PasswordInput