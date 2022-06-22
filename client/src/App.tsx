import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginTest from "./pages/LoginTest";
import Home from "../src/pages/Home";
import { atom} from "jotai";
import { IUser } from "../../models/userModel";

export const userAtom = atom<IUser | undefined>(undefined);

function App() {
	return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/loginTest" element={<LoginTest />} />
				</Routes>
			</BrowserRouter>
	);
}

export default App;
