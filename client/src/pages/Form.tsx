import RadioButtons from "../components/MUI/RadioButtons";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

export const Form = () => {
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				width: "50vw",
				mx: "auto",
			}}
		>
			<h1>Login</h1>
			<TextField id="outlined" label="Username" defaultValue="username" />
			<TextField id="outlined-password-input" label="Password" type="password" />
			<TextField id="outlined" label="Email" defaultValue="email" />
			<TextField id="outlined" label="Contact Number" defaultValue="" />
			<h1>Form 1: General</h1>
			<RadioButtons label="Property Type" op1="HDB" op2="Condo" op3="Landed" op4="Commercial" />
			<RadioButtons label="Property Status" op1="New" op2="Resale" op3="Existing" />
      <RadioButtons label="Renovation Type" op1="Full" op2="Partial" />
      <RadioButtons label="Renovation Priority" op1="Stick to Budget" op2="Pay for better design" />
			<RadioButtons label="Keys Collected?" op1="Yes" op2="No" />
      <RadioButtons label="Loan Required?" op1="Yes" op2="No" />
      {/* conditinallly load options based on vendor */}
      <RadioButtons label="Rooms" op1="Bedroom" op2="Toilet" op3="Kitchen" /> 
			<TextField
				id="filled-number"
				label="Budget (SGD)"
				type="number"
				InputLabelProps={{
					shrink: true,
				}}
				variant="filled"
			/>
			<TextField
				id="filled-number"
				label="Floor Size (sqm)"
				type="number"
				InputLabelProps={{
					shrink: true,
				}}
				variant="filled"
			/>
			<TextField
				id="outlined-multiline-static"
				label="Additional Comments"
				multiline
				rows={4}
      />
      <h3>Upload floor plan placeholder</h3>
		</Card>
	);
};
