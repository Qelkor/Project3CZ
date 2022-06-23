import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginTest from "./pages/LoginTest";
import Home from "../src/pages/Home";
import { atom } from "jotai";
import { IUser } from "../../models/userModel";
import VendorForm from "./pages/VendorX";
import ProfilePage from "./pages/ProfilePage";
import Applications from "./pages/Applications"


export const userAtom = atom<IUser | undefined>(undefined);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginTest" element={<LoginTest />} />
        <Route path="/:id" element={<VendorForm />} />
        <Route path="/applications" element={<Applications/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
