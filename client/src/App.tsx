import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Form} from "./pages/Form";
import Login from "./pages/Login"

function App() {
	return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
		</BrowserRouter>
	);
}

export default App;
