import axios from "axios";
import React, { ReactEventHandler, useEffect } from "react";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Box, Button, TextField } from "@mui/material";
import { IUser } from "../../../models/userModel";

interface userBegone {
  status: string;
}

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useAtom(userAtom);
  const [form, setForm] = React.useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  if (user === undefined) {
    navigate("/");
  }

  useEffect(() => {
    axios.get(`/api/user/${id}`).then((res) => {
      const data = res.data;
      setForm(data);
    });
  }, []);

  // const handleChange = (evt: any) => {
  //   const value = evt.target.value;
  //   setForm((form) => {
  //     const newForm = {...form, evt.target.name: value}
  //   })
  //   console.log(form?.name);
  // };

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    } as IUser);
  };

  const updateUser = async () => {
    setUser(form);
    try {
      await axios.put(`/api/user/${id}`, user);
      navigate(`/user/${id}`);
    } catch (err: any) {
      console.log(Error);
    }
  };

  const Delete = async () => {
    const { data } = await axios.delete<userBegone>(`/api/user/${user?._id}`);
    alert(data.status);
    setUser(undefined);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <br></br>
      <Box sx={{ maxWidth: "500", marginLeft: "15px" }}>
        <Typography variant="h3" component="div" gutterBottom>
          {`${user?.name}'s Profile`}
        </Typography>
      </Box>
      <br></br>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        <TextField
          type="text"
          label={`${user?.name}`}
          placeholder={`${user?.name}`}
          name="name"
          value={form?.name}
          onChange={handleChange}
        />
      </Box>

      <Box sx={{ justifyContent: "center" }}>
        <Button size="small" sx={{ color: "Green" }} onClick={updateUser}>
          {"Update Details"}
        </Button>
        <br></br>
        <Button size="small" sx={{ color: "red" }} onClick={Delete}>
          {"DELETE Profile"}
        </Button>
      </Box>
    </>
  );
}

export default ProfilePage;
