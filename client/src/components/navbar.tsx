import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../App";


interface LogoutResponse {
  status: string;
}

const Navbar = () => {
	const [user, setUser] = useAtom(userAtom);
	const navigate = useNavigate();

	const Logout = async () => {
		const { data } = await axios.get<LogoutResponse>("/api/user/logout");
    alert(data.status);
    setUser(undefined);
    navigate("/")
	};

	return (
		<>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/loginTest">Login Test</Link>
				<Link to="/signup"> Sign up</Link>
        <button onClick={Logout}>Logout</button>
			</nav>
		</>
	);
};

export default Navbar;
