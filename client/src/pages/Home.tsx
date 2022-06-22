import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import axios from "axios";
import { response } from "express";
import { IVendor } from "../../../models/vendorModel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const filter = createFilterOptions<IVendor>();

const Home = () => {
  const [user, setUser] = useAtom(userAtom);
  const [vendors, setVendors] = useState([]);
  const [value, setValue] = React.useState<IVendor | null>(null);

  useEffect(() => {
    axios.get(`/api/vendor/`).then((res) => {
      const data = res.data;
      setVendors(data);
      console.log(data);
    });
  }, []);

  if (vendors.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Navbar />
      <Autocomplete
        value={value}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={vendors}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Enter Interior Designer name" />
        )}
      />
      {vendors?.map((vendorId: IVendor) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {`Vendor: ${vendorId.name}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Description: ${vendorId.description}`}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{`Certifications: ${vendorId.certs}`}</Button>
            {user ? <Button size="small">Learn More</Button> : null}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Home;
