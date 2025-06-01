import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  ListItemButton,
} from "@mui/material";
import { FaCartPlus } from "react-icons/fa";
import { Menu } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useLocation } from "react-router-dom";
import { Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/shared/DropdownMenu";
import { User } from "lucide-react";
import useStyles from "../assets/css/style";
import AppLogo from "../components/shared/AppLogo";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const hideLogoRoutes = ["/register", "/choose-type"];
  const isHideLogoRoute = hideLogoRoutes.includes(location.pathname);

  const shouldShowLogo = !isHideLogoRoute || (isHideLogoRoute && isMobile);

  const links = ["Explore", "About Us", "Contact Us"];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("userInfo");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

  const handleRegisterClick = () => {
    navigate("/choose-type", { state: { userType: "vendor" } });
    setDrawerOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login")
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/");
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: 250,
          backgroundColor: "#e9dfff",
          padding: "20px 0",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <Box sx={{ padding: "0 20px", marginBottom: "20px" }}>
          <Typography variant="h6" sx={{ color: "#000" }}>
            Menu
          </Typography>
        </Box>

        <List>
          {links.map((link) => (
            <ListItem key={link} disablePadding>
              <ListItemButton
                sx={{
                  padding: "12px 20px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemText
                  primary={link}
                  primaryTypographyProps={{
                    sx: {
                      color: "#000",
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {!isAuthenticated && (
          <Box sx={{ padding: "0 20px", marginTop: "20px" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLoginClick}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#2e1d5a",
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleRegisterClick}
              sx={{
                borderColor: "#2e1d5a",
                color: "#2e1d5a",
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {isAuthenticated && (
          <Box sx={{ padding: "0 20px", marginTop: "20px" }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogout}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#2e1d5a",
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Log out
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );

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
            {/* Logo Section */}
            {shouldShowLogo && (
              <Grid item xs={6} md={2} container alignItems="center">
                <AppLogo size="lg" />
              </Grid>
            )}

            {/* Navigation Links - Hidden on Mobile */}
            {!isMobile && (
              <Grid item md={4} container justifyContent="center" spacing={4}>
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
            )}

            {/* Actions Section */}
            <Grid
              item
              xs={6}
              md={4}
              container
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <IconButton>
                  <FaCartPlus style={{ color: "#FFFFFF", fontSize: "20px" }} />
                </IconButton>
              </Grid>

              <Grid item>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <IconButton>
                        <User
                          style={{ color: "#FFFFFF" }}
                          className="h-5 w-5"
                        />
                      </IconButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      alignOffset={-5}
                      sideOffset={5}
                      className="w-64 bg-[#1A103D] text-white rounded-xl shadow-lg p-5"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm text-gray-300 ml-auto">{userInfo?.userType}</p>
                      </div>
                      <div className="flex items-start space-x-4 mb-4">
                        <div>
                          <p className="text-lg font-semibold">{userInfo?.username}</p>
                          <p className="text-xs text-gray-500">{userInfo?.email}</p>
                        </div>
                      </div>
                      <div className="space-y-3 mb-4 text-sm">
                        <div
                          onClick={() =>
                            userInfo?.userType === "CUSTOMER"
                              ? navigate("/customer-dashboard")
                              : navigate("/customer-dashboard2") //To do
                          }
                          className="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
                        >
                          <User className="h-5 w-5" />
                          <span>Account</span>
                        </div>
                        <div
                          onClick={() => navigate("/settings")}
                          className="flex items-center space-x-2 cursor-pointer hover:text-gray-600"
                        >
                          <Settings className="h-5 w-5" />
                          <span>Setting</span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full bg-[#A33B3B] hover:bg-[#8c3232] text-white font-semibold py-2 rounded-md"
                      >
                        Log out
                      </button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <IconButton>
                        <User
                          style={{ color: "#FFFFFF" }}
                          className="h-5 w-5"
                        />
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
              </Grid>

              {/* Hamburger Menu - Only on Mobile */}
              {isMobile && (
                <Grid item>
                  <IconButton
                    onClick={toggleDrawer(true)}
                    sx={{ color: "white" }}
                  >
                    <Menu />
                  </IconButton>
                </Grid>
              )}

              {/* Sign Up Button - Only on Desktop */}
              {!isMobile && (
                <Grid item>
                  {!isAuthenticated ? (
                    <Button className={classes.button} onClick={handleRegisterClick}>
                      Sign Up <LoginIcon />
                    </Button>
                  ) : (
                    <Typography className={classes.userText}>
                      {userInfo?.username ? userInfo.username.split(" ")[0] : ""}
                    </Typography>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {mobileMenu}
    </ThemeProvider>
  );
};

export default Header;
