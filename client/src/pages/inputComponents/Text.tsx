import { useField } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  margin?: number;
}

const TextInput = ({ label, name, type, margin }: TextInputProps) => {
  const [field, meta] = useField(name);
  return (
    <Box>
      	<FormLabel>
				<Typography variant="h6" color="primary">{label}</Typography></FormLabel>
      <TextField  fullWidth type={type} variant="outlined" label={label} {...field} margin="normal"/>
      {meta.touched && meta.error ? <Typography color="error" >*{meta.error}</Typography> : null}
    </Box>
  );
};

export default TextInput