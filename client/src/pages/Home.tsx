import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import axios from "axios";
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
import { CardMedia, Container } from "@mui/material";
import { Link } from "react-router-dom";
import e from "express";

const filter = createFilterOptions<IVendor>();

const Home = () => {
  const [user, setUser] = useAtom(userAtom);
  const [vendors, setVendors] = useState<any>([]);
  const [value, setValue] = React.useState<IVendor | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`/api/vendor/`).then((res) => {
      const data = res.data;
      setVendors(data);
    });
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  let firms = [];
  if (search === "") {
    firms = vendors;
  } else if (vendors.length > 0) {
    firms = vendors.filter((e: any) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // if (vendors.length === 0) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <div>
      <Navbar />
      <br></br>
      <Container sx={{ display: "fit-to-screen", justifyContent: "center" }}>
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
            <TextField
              {...params}
              label="Enter Designer Firm name"
              onChange={handleChange}
              type="text"
              value={search}
            />
          )}
        />
      </Container>
      <br></br>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        {firms?.map((vendorId: IVendor) => (
          <Card
            sx={{
              maxWidth: "flex",
              justifyContent: "center",
              spacing: 8,
              margin: "15px",
            }}
          >
            <CardMedia
              component="img"
              alt="Credo pic"
              height="180"
              image={`${vendorId.img}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {`${vendorId.name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${vendorId.description}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{`${vendorId.certs}`}</Button>
              {user ? (
                <Button size="small">
                  <Link to={`/${vendorId._id}`}>{"Learn More"}</Link>
                </Button>
              ) : null}
            </CardActions>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Home;
