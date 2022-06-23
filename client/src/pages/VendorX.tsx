import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import PackageOptions from "../pages/inputComponents/PackageOptions";
import Button from "@mui/material/Button";
import ThemeOptions from "../pages/inputComponents/ThemeOptions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


interface packageOptions {
	name: string;
	info: string[];
}

interface rooms {
	_id: string;
	name: string;
}

interface Selection {
	roomName: rooms;
	packageOptions: packageOptions[];
}

interface IThemes {
	_id: string;
	name: string;
	image: string;
	description: string;
}

interface VendorPopulated {
	_id?: string;
	name: string;
	themes: IThemes[];
	description: string;
	address: string;
	certs: string[];
	img: string;
	selection: Selection[];
}

interface Ires {
	status: number;
	data: any;
}

interface choices {
	room: string;
	package: string;
}

interface FormValues {
	user: string | undefined;
	vendor: string | undefined;
	themes: string[];
	selection: choices[];
	comments?: string;
	propertyType: string;
	propertyStatus: string;
	renovationType: string;
	renovationPriority: string;
	keyCollected: boolean;
	loanRequired: boolean;
	budget: number;
	status: string;
	dateSubmitted: string;
}
const VendorForm = () => {
	//Initial data fetches
	const [user, setUser] = useAtom(userAtom);
	const [vendor, setVendor] = useState<VendorPopulated>();
	const {id} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVendor = async () => {
			const { data } = await axios.get(`/api/vendor/${id}`);
			setVendor(data);
		};
		fetchVendor();
	}, [id]);

	//Tab configs
	const [value, setValue] = useState("1");
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	if (vendor === undefined || user === undefined) {
		return <div>Loading...</div>;
	}

	var today = new Date();
	var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

	//Formik config
	const initialValues = {
		user: user._id,
		vendor: vendor._id,
		themes: [],
		selection: [],
		propertyType: user.propertyType,
		propertyStatus: user.propertyStatus,
		renovationType: user.renovationType,
		renovationPriority: user.renovationPriority,
		keyCollected: user.keyCollected,
		loanRequired: user.loanRequired,
		budget: user.budget,
		status: "pending",
		dateSubmitted: date,
	};

	const handleSubmit = async (values: FormValues) => {
		const data: Ires = await axios.post("/api/form/", values);
		if (data.status === 200) {
			navigate("/applications")
		} else if (data.status >= 400) {
			alert("Submission Failed. Please try again.");
		}
	};

	return (
		<>
			<Navbar />
			<Typography variant="h4" align="center">
				{vendor.name}
			</Typography>
			<Typography variant="h6" align="center">Please select your packages and themes</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={null}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values);
					setTimeout(() => {
						setSubmitting(false);
					}, 400);
				}}
			>
				{(props) => (
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							props.handleSubmit(e);
						}}
					>
						<Box sx={{ width: "100%", typography: "body1", display: "flex" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList
										orientation="vertical"
										onChange={handleChange}
										aria-label="lab API tabs example"
									>
										{vendor.selection.map((selection, index) => (
											<Tab
												key={selection.roomName.name}
												label={selection.roomName.name}
												value={`${index}`}
											/>
										))}
										<Tab key={"themes"} label={"Themes"} value={`${vendor.selection.length}`} />
									</TabList>
								</Box>
								{/* Mapping packages for each room */}
								{vendor.selection.map((selection, index) => (
									<TabPanel value={`${index}`}>
										<Box sx={{ display: "flex" }}>
											{selection.packageOptions.map((option) => (
												// Each card is a package
												<Card sx={{ mx: 2, px:2}}>
													<PackageOptions
														name={"selection"}
														label={option.name}
														room={selection.roomName.name}
														selection={props.values.selection}
													/>
													<ul>
														{option.info.map((item) => (
															<li>{item}</li>
														))}
													</ul>
												</Card>
											))}
										</Box>
									</TabPanel>
								))}
								<TabPanel value={`${vendor.selection.length}`}>
									<Box sx={{ display: "flex" }}>
										{vendor.themes.map((theme) => (
											<ThemeOptions
												label={theme.name}
												img={theme.image}
												description={theme.description}
												value={theme._id}
												themes={props.values.themes}
												name="themes"
											/>
										))}
									</Box>
								</TabPanel>
							</TabContext>
						</Box>
						<Container sx={{display: "flex", justifyContent: "center", width: "100vw"}}>
							<Button sx={{width: "10rem"}} type="submit" variant="contained">
								Submit
							</Button>
						</Container>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default VendorForm;
