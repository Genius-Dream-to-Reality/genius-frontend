import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Twitter, Instagram } from "@mui/icons-material";
import AppLogo from "../shared/AppLogo";

const SideNavBar = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "150px",
        backgroundColor: "transparent",
        padding: "10px 0",
        display: { xs: "none", md: "flex" }, 
      }}
    >
      <Grid item>
        <AppLogo style={{ width: "100px" }} />
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ flexGrow: 1 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "white",
            marginBottom: 1,
            writingMode: "vertical-rl",
            textAlign: "center",
          }}
        >
          Follow Us
        </Typography>
        <IconButton
          sx={{ color: "white", display: "block" }}
          href="https://www.instagram.com"
          target="_blank"
        >
          <Instagram />
        </IconButton>
        <IconButton
          sx={{ color: "white", display: "block", marginBottom: 2 }}
          href="https://www.twitter.com"
          target="_blank"
        >
          <Twitter />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SideNavBar;
