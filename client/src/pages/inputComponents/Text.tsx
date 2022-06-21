import { useField } from "formik";
import TextField from "@mui/material/TextField";
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

export default TextInput