import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Form} from "./pages/Form";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "../src/pages/Home"
import { atom } from "jotai";

export const userAtom = atom({});


function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
		</BrowserRouter>
	);
}

export default App;
