import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Form} from "./pages/Form";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "../src/pages/Home"
import { atom, Provider } from "jotai";
import IUser from "../../models/userModel"


export const userAtom = atom<IUser | null>({});

function App() {
	return (
    <BrowserRouter>
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Provider>
		</BrowserRouter>
	);
}

export default App;

