import { createTheme } from '@mui/material/styles';

const purplePalette = {
  primary: {
    main: "#7E57C2",  // Main purple color
    light: "#B39DDB",  // Lighter purple
    dark: "#512DA8",   // Darker purple
    contrastText: "#FFFFFF",  // White text for contrast
  },
  secondary: {
    main: "#9575CD",  // Muted purple
    light: "#D1C4E9",  // Light lavender
    dark: "#5E35B1",   // Darker purple for accents
    contrastText: "#FFFFFF",  // White text for contrast
  },
  background: {
    default: "#F3E5F5", // Light lavender background
  },
  text: {
    primary: "#FFFFFF", // white text
  },
};

const theme = createTheme({
  palette: purplePalette,
});

export default theme;
