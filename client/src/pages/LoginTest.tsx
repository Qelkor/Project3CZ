import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
import { useAtom } from "jotai";
import { userAtom } from "../App";

const LoginTest = () => {
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      return navigate("/")
    }
  },[user, navigate])

  return (
    <div>Login Test Succesful!</div>
  )
}

export default LoginTest