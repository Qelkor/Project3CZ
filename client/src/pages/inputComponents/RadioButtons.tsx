import { useField } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface RadioButtonsProps {
	label: string;
	name: string;
	op1?: string;
	op2?: string;
	op3?: string;
	op4?: string;
}

const RadioButtons = ({label, name, op1, op2, op3, op4}: RadioButtonsProps) => {
  const yesNoToBool = (option: string):(boolean | string) => {
    if (option === 'Yes') {
      return true
    } else if (option === 'No') {
      return false
    } 
    return option
  }


	const [field, meta] = useField(name);
	return (
		<FormControl>
			<FormLabel>{label}</FormLabel>
			<RadioGroup row aria-labelledby={label} {...field}>
				{op1 && <FormControlLabel value={yesNoToBool(op1)} control={<Radio />} label={op1} />}
				{op2 && <FormControlLabel value={yesNoToBool(op2)} control={<Radio />} label={op2} />}
				{op3 && <FormControlLabel value={yesNoToBool(op3)} control={<Radio />} label={op3} />}
				{op4 && <FormControlLabel value={yesNoToBool(op4)} control={<Radio />} label={op4} />}
				{meta.touched && meta.error ? <div>{meta.error}</div> : null}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioButtons;
