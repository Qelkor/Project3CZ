import { useField } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel"

interface PasswordProps {
  label: string;
  name: string;
}

const PasswordInput = ({ label, name }: PasswordProps) => {
  const [field, meta] = useField(name);
  return (
    <Box sx={{width: "25rem"}}>
      <FormLabel>
				<Typography variant="h6" color="primary">{label}</Typography></FormLabel>
      <TextField variant="outlined" fullWidth label={label} {...field} type="password" />
      {meta.touched && meta.error ? <Typography color="error" >*{meta.error}</Typography> : null}
    </Box>
  );
};

export default PasswordInput