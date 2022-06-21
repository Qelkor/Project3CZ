import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Form} from "./pages/Form";
import Signup from "./pages/Signup"
import Home from "../src/pages/Home"

function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
		</BrowserRouter>
	);
}

export default App;
