import React, { useState } from "react";
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
    Avatar,
    Tooltip,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "../assets/css/style";
import AppLogo from "../components/shared/AppLogo";
import { useSelector } from 'react-redux';
import { authService } from '../services/authService';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

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
    const { user } = useSelector(state => state.auth);

    // Add state for profile menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleProfileNavigate = () => {
        navigate('/vendor-account');
        handleProfileClose();
    };

    const handleRegisterClick = () => {
        navigate("/choose-type", { state: { userType: "vendor" } });
        setDrawerOpen(false);
    };

    const handleLoginClick = () => {
        navigate("/login");
        setDrawerOpen(false);
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally show an error message to the user
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
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

                {!user && (
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

                {user && (
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
                        {shouldShowLogo && (
                            <Grid item xs={6} md={2} container alignItems="center">
                                <AppLogo size="lg" />
                            </Grid>
                        )}

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
                        <Grid item xs={6} md={6} container justifyContent="flex-end" alignItems="center" spacing={2}>
                            {isMobile && (
                                <Grid item>
                                    <IconButton
                                        onClick={toggleDrawer(true)}
                                        sx={{ color: "white" }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                            )}
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

            {mobileMenu}
        </ThemeProvider>
    );
};

export default DashboardHeader;
