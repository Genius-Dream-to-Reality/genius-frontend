import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  typoLink: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    fontSize: "14px",
  },

  button: {
    fontSize: "12px", 
    padding: "5px 10px",
    color: theme.palette.text.primary, 
    backgroundColor: "transparent", 
    "&:hover": {
      backgroundColor: theme.palette.secondary.main, 
    },
  },
}));

export default useStyles;
