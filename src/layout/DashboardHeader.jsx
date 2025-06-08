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
import { Menu } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "../assets/css/style";
import AppLogo from "../components/shared/AppLogo";
import { getEventDataForCustomer } from "../api/customer-account";

const DashboardHeader = () => {
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
                                <Button
                                    variant="contained"
                                    onClick={handleLogout}
                                    style={{ backgroundColor: '#b91c1c', color: '#fff' }}
                                >
                                    Log out
                                </Button>
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

export default DashboardHeader;
