import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button, IconButton } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";
import { ThemeProvider } from "@mui/material/styles";  
import theme from "../../theme"; 
import useStyles from "../../assets/css/style"; 

const Header = () => {
  const classes = useStyles(); 
  const links = ["Explore", "About", "Contact"];

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
            <Grid item md={4} />
            <Grid item xs={12} md={4} container justifyContent="center" spacing={4}>
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
            <Grid item xs={12} md={4} container justifyContent="flex-end" alignItems="center" gap={1} >
              <IconButton>
                <FaCartPlus style={{ color: "#FFFFFF", fontSize: "20px" }} />
              </IconButton>
              <Button className={classes.button}>Login</Button>
              <Button className={classes.button}>Register</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
