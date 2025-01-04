import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { FaCartPlus } from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/shared/DropdownMenu";
import { User } from "lucide-react";
import theme from "../styles/theme";
import useStyles from "../assets/css/style";
import AppLogo from "../components/shared/AppLogo";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const links = ["Explore", "About Us", "Contact Us"];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleRegisterClick = () => {
    navigate("/register", { state: { userType: "vendor" } });
  };

  const handleLoginClick = () => {
    // navigate("/login");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          height: "80px",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
            px: 2,
          }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid
              item
              xs={10}
              md={2}
              container
              justifyContent="center"
              spacing={4}
            >
              <AppLogo size="lg" />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="center"
              spacing={4}
            >
              {links.map((link, index) => (
                <Grid item key={index}>
                  <Typography
                    component="a"
                    href="#"
                    className={classes.typoLink}
                  >
                    {link}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              justifyContent="flex-end"
              alignItems="center"
              gap={1}
            >
              <IconButton>
                <FaCartPlus style={{ color: "#FFFFFF", fontSize: "20px" }} />
              </IconButton>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton>
                      <User style={{ color: "#FFFFFF" }} className="h-5 w-5" />
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    sideOffset={5}
                    className="w-56 mt-2"
                  >
                    <DropdownMenuLabel class="flex my-2">
                      <div>
                        <IconButton>
                          <User
                            style={{ color: "#FFFFFF" }}
                            className="h-5 w-5 mr-1"
                          />
                        </IconButton>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/orders")}>
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton>
                      <User style={{ color: "#FFFFFF" }} className="h-5 w-5" />
                    </IconButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    sideOffset={5}
                    className="w-48 mt-2"
                  >
                    <DropdownMenuItem onClick={handleLoginClick}>
                      Log in
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleRegisterClick}>
                      Sign up
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Show Sign Up button only for guest users */}
              {!isAuthenticated && (
                <Button
                  className={classes.button}
                  onClick={handleRegisterClick}
                >
                  Sign Up
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
