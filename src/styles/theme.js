import { createTheme } from '@mui/material/styles';

const purplePalette = {
  background: {
    default: "#201439", 
  },
  text: {
    primary: "#FFFFFF", 
  },
};

const theme = createTheme({
  palette: purplePalette,
});

export default theme;
