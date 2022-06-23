import axios from "axios";

import React, { useEffect } from "react";
import { jotaiUser, userAtom } from "../App";
import { useAtom } from "jotai";
import Navbar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  InputAdornment,
  Typography,
  Box,
  Button,
  TextField,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
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

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    } as IUser);
  };

  const toggle = (e: any) => {
    if (e.target.value === "Yes") {
      setForm({ ...form, [e.target.name]: true } as IUser);
    } else if (e.target.value === "No") {
      setForm({ ...form, [e.target.name]: false } as IUser);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`/api/user/${id}`, form);
      navigate(`/user/${id}`);
      console.log(user);
      console.log(form);
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
          width: 550,
          justifyContent: "center",
          marginLeft: "35px",
          padding: "15px",
          boxShadow:
            "0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)",
        }}
      >
        {/* Property Type */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
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
        <br></br>

        {/* Property Status */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
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
        <br></br>

        {/* Key Collected */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
          >{`Keys Collected: ${user?.keyCollected}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.keyCollected ? (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="keyCollected"
                onChange={toggle}
                checked
              />
            ) : (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="keyCollected"
                onChange={toggle}
              />
            )}
            {!user?.keyCollected ? (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="keyCollected"
                onChange={toggle}
                checked
              />
            ) : (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="keyCollected"
                onChange={toggle}
              />
            )}
          </RadioGroup>
        </FormControl>
        <br></br>

        {/* LoanRequired */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
          >{`Loan Required: ${user?.loanRequired}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.loanRequired ? (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="loanRequired"
                onChange={toggle}
                checked
              />
            ) : (
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
                name="loanRequired"
                onChange={toggle}
              />
            )}
            {!user?.loanRequired ? (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="loanRequired"
                onChange={toggle}
                checked
              />
            ) : (
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                name="loanRequired"
                onChange={toggle}
              />
            )}
          </RadioGroup>
        </FormControl>
        <br></br>

        {/* Renovation Priority */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
          >{`Renovation Priority: ${user?.renovationPriority}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.renovationPriority === "Stick to Budget" ? (
              <FormControlLabel
                value="Stick to Budget"
                control={<Radio />}
                label="Stick to Budget"
                name="renovationPriority"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Stick to Budget"
                control={<Radio />}
                label="Stick to Budget"
                name="renovationPriority"
                onChange={handleChange}
              />
            )}
            {user?.renovationPriority === "Pay for better design" ? (
              <FormControlLabel
                value="Pay for better design"
                control={<Radio />}
                label="Pay for better design"
                name="renovationPriority"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Pay for better design"
                control={<Radio />}
                label="Pay for better design"
                name="renovationPriority"
                onChange={handleChange}
              />
            )}
          </RadioGroup>
        </FormControl>
        <br></br>

        {/* Renovation Type */}
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
          >{`Property Status: ${user?.renovationType}`}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {user?.renovationType === "Full" ? (
              <FormControlLabel
                value="Full"
                control={<Radio />}
                label="Full"
                name="renovationType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Full"
                control={<Radio />}
                label="Full"
                name="renovationType"
                onChange={handleChange}
              />
            )}
            {user?.renovationType === "Partial" ? (
              <FormControlLabel
                value="Partial"
                control={<Radio />}
                label="Partial"
                name="renovationType"
                onChange={handleChange}
                checked
              />
            ) : (
              <FormControlLabel
                value="Partial"
                control={<Radio />}
                label="Partial"
                name="renovationType"
                onChange={handleChange}
              />
            )}
          </RadioGroup>
        </FormControl>

        {/* Budget */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: "#2196f3" }}
          >{`Budget: ${user?.budget}`}</FormLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            name="budget"
            value={form?.budget}
            onChange={handleChange}
            placeholder={`${user?.budget}`}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <br></br>
        {/* Update amd Delete buttons */}
        <Stack direction="row" spacing={3}>
          <Button variant="contained" color="success" onClick={updateUser}>
            {"Update Details"}
          </Button>
          <Button variant="outlined" color="error" onClick={Delete}>
            {"DELETE Profile"}
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default ProfilePage;
