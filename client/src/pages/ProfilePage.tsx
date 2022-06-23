import axios from "axios";
import React, { ReactEventHandler, useEffect } from "react";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import Navbar from "../components/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Box, Button, TextField } from "@mui/material";
import { IUser } from "../../../models/userModel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NoLuggage } from "@mui/icons-material";

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
          justifyContent: "center",
        }}
      >
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "primary" }}
          >{`Property Type: ${user?.propertyType}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.propertyType === "HDB" ? (
              <FormControlLabel
                value="HDB"
                control={<Radio />}
                label="HDB"
                name="propertyType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="HDB"
                control={<Radio />}
                label="HDB"
                name="propertyType"
                onChange={handleChange}
              />
            )}
            {user?.propertyType === "Condo" ? (
              <FormControlLabel
                value="Condo"
                control={<Radio />}
                label="Condo"
                name="propertyType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Condo"
                control={<Radio />}
                label="Condo"
                name="propertyType"
                onChange={handleChange}
              />
            )}
            {user?.propertyType === "Landed" ? (
              <FormControlLabel
                value="Landed"
                control={<Radio />}
                label="Landed"
                name="propertyType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Landed"
                control={<Radio />}
                label="Landed"
                name="propertyType"
                onChange={handleChange}
              />
            )}
            {user?.propertyType === "Commercial" ? (
              <FormControlLabel
                value="Commercial"
                control={<Radio />}
                label="Commercial"
                name="propertyType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Commercial"
                control={<Radio />}
                label="Commercial"
                name="propertyType"
                onChange={handleChange}
              />
            )}
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "primary" }}
          >{`Property Status: ${user?.propertyStatus}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.propertyStatus === "New" ? (
              <FormControlLabel
                value="New"
                control={<Radio />}
                label="New"
                name="propertyStatus"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="New"
                control={<Radio />}
                label="New"
                name="propertyStatus"
                onChange={handleChange}
              />
            )}
            {user?.propertyStatus === "Resale" ? (
              <FormControlLabel
                value="Resale"
                control={<Radio />}
                label="Resale"
                name="propertyStatus"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Resale"
                control={<Radio />}
                label="Resale"
                name="propertyStatus"
                onChange={handleChange}
              />
            )}
            {user?.propertyStatus === "Existing" ? (
              <FormControlLabel
                value="Existing"
                control={<Radio />}
                label="Existing"
                name="propertyStatus"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Existing"
                control={<Radio />}
                label="Existing"
                name="propertyStatus"
                onChange={handleChange}
              />
            )}
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "primary" }}
          >{`Keys Collected: ${user?.keyCollected}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {/* {user?.keyCollected ? (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="keyCollected"
                onChange={onRadioChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="keyCollected"
                onChange={onRadioChange}
              />
            )}
            {!user?.keyCollected ? (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="keyCollected"
                onChange={onRadioChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="keyCollected"
                onChange={onRadioChange}
              />
            )} */}
          </RadioGroup>
        </FormControl>
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
