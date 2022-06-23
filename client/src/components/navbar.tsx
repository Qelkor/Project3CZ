import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import React from "react";

interface LogoutResponse {
  status: string;
}

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Logout = async () => {
    const { data } = await axios.get<LogoutResponse>("/api/user/logout");
    alert(data.status);
    setUser(undefined);
    navigate("/");
  };

  return (
    <>
      <nav>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                CREDO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem key={"Home"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/">{"Home"}</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem key={"login"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/login">{"Login"}</Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  key={"home"}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/">{"Home"}</Link>
                </Button>

                {!user ? (
                  <Button
                    key={"Login"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link to="/login">{"Login"}</Link>
                  </Button>
                ) : null}
              </Box>
              {user ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Button size="small" onClick={Logout}>
                          {"Logout"}
                        </Button>
                      </Typography>
                    </MenuItem>
                    <MenuItem key={"Settings"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Button size="small">
                          <Link to={`/user/${user._id}`}>
                            {"Profile Settings"}
                          </Link>
                        </Button>
                      </Typography>
                    </MenuItem>
                    <MenuItem key={"Settings"} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Button size="small">
                          <Link to={`/applications`}>
                            {"View Applications"}
                          </Link>
                        </Button>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : null}
            </Toolbar>
          </Container>
        </AppBar>
      </nav>
    </>
  );
};

export default Navbar;
