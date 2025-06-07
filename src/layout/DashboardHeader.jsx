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
                                            sx={{
                                                color: "#000",
                                                textDecoration: "none",
                                                fontWeight: 500,
                                                "&:hover": {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            {link}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <Grid item xs={6} md={6} container justifyContent="flex-end" alignItems="center" spacing={2}>
                            {user ? (
                                <>
                                    <Grid item>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar
                                                onClick={handleProfileClick}
                                                sx={{
                                                    bgcolor: theme.palette.primary.main,
                                                    cursor: 'pointer',
                                                    width: 40,
                                                    height: 40,
                                                    '&:hover': {
                                                        opacity: 0.8,
                                                        transform: 'scale(1.05)',
                                                        transition: 'all 0.2s ease-in-out'
                                                    }
                                                }}
                                            >
                                                {user.username?.[0]?.toUpperCase()}
                                            </Avatar>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleProfileClose}
                                                onClick={handleProfileClose}
                                                PaperProps={{
                                                    sx: {
                                                        mt: 1.5,
                                                        minWidth: 200,
                                                        backgroundColor: '#403557',
                                                        color: 'white',
                                                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                                                        '& .MuiMenuItem-root': {
                                                            px: 2,
                                                            py: 1,
                                                            borderRadius: 1,
                                                            mx: 1,
                                                            my: 0.5,
                                                            color: 'white',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            },
                                                        },
                                                        '& .MuiDivider-root': {
                                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                                        },
                                                    },
                                                }}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <Box sx={{ px: 2, py: 1.5 }}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                                                        {user.username}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                                        {user.email}
                                                    </Typography>
                                                </Box>
                                                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                                                <MenuItem onClick={handleProfileNavigate}>
                                                    <PersonIcon sx={{ mr: 2, color: 'white' }} />
                                                    Profile
                                                </MenuItem>
                                                <MenuItem onClick={handleLogout}>
                                                    <LogoutIcon sx={{ mr: 2, color: 'white' }} />
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            onClick={handleLoginClick}
                                            sx={{
                                                backgroundColor: "#2e1d5a",
                                                color: "#fff",
                                                "&:hover": {
                                                    backgroundColor: theme.palette.primary.dark,
                                                },
                                            }}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
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
                                    </Grid>
                                </>
                            )}
                            {isMobile && (
                                <Grid item>
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        aria-label="menu"
                                        onClick={toggleDrawer(true)}
                                        sx={{ color: "#000" }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
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
