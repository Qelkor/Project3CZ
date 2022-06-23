import { FieldArray } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface selection {
	room: string;
	package: string;
}

interface IProps {
	name: string;
	label: string;
	room: string;
	selection: selection[] | [];
}

const PackageOptions = ({ name, label, room, selection }: IProps) => {
	const value = {
		room: room,
		package: label,
	};

	const findIndex = () => {
		const index = selection.findIndex((object) => {
			return object.room === room && object.package === label;
    });
    return index
	};

	return (
		<FieldArray
			name="selection"
			render={(arrayHelpers) => (
				<FormControlLabel
					key={name}
					control={
						<Checkbox
							checked={findIndex() > -1}
							onChange={(e) => {
								if (e.target.checked) {
									arrayHelpers.push(value);
								} else {
									arrayHelpers.remove(findIndex());
								}
							}}
						/>
					}
					label={label}
				/>
			)}
		/>
	);
};

export default PackageOptions;
