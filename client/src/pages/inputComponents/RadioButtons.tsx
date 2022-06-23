import { useField } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

interface RadioButtonsProps {
	label: string;
	name: string;
	op1?: string;
	op2?: string;
	op3?: string;
	op4?: string;
}

const RadioButtons = ({ label, name, op1, op2, op3, op4 }: RadioButtonsProps) => {
	const yesNoToBool = (option: string): boolean | string => {
		if (option === "Yes") {
			return true;
		} else if (option === "No") {
			return false;
		}
		return option;
	};

	const [field, meta] = useField(name);
	return (
		<FormControl sx={{ mb: 1 }}>
			<FormLabel>
				<Typography variant="h6" color="primary">
					{label}
				</Typography>
			</FormLabel>
			<RadioGroup row aria-labelledby={label} {...field}>
				{op1 && <FormControlLabel value={yesNoToBool(op1)} control={<Radio />} label={op1} />}
				{op2 && <FormControlLabel value={yesNoToBool(op2)} control={<Radio />} label={op2} />}
				{op3 && <FormControlLabel value={yesNoToBool(op3)} control={<Radio />} label={op3} />}
				{op4 && <FormControlLabel value={yesNoToBool(op4)} control={<Radio />} label={op4} />}
			</RadioGroup>
			{meta.touched && meta.error ? <Typography color="error">*{meta.error}</Typography> : null}
		</FormControl>
	);
};

export default RadioButtons;
