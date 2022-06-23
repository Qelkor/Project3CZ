import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginTest from "./pages/LoginTest";
import Home from "../src/pages/Home";
import { atom } from "jotai";
import VendorForm from "./pages/VendorX";
import ProfilePage from "./pages/ProfilePage";
import Applications from "./pages/Applications";

interface choices {
  room: string;
  package: string;
}

interface jotaiForm {
  user: string;
  vendor: string;
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

export interface jotaiUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userForm: jotaiForm[];
  propertyType: string;
  propertyStatus: string;
  renovationType: string;
  renovationPriority: string;
  keyCollected: boolean;
  loanRequired: boolean;
  rooms: string;
  budget: number;
}

export const userAtom = atom<jotaiUser | undefined>(undefined);

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
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
