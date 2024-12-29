import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  typoLink: {
    color: "#FFFFFF",
    textDecoration: "none",
    "&:hover": {
      color: "#9575CD",
    },
    fontSize: "14px",
  },
  button: {
    fontSize: "12px", 
    padding: "5px 10px",
    color: "#9575CD", 
    backgroundColor: "transparent", 
    "&:hover": {
      backgroundColor: "#FFFFFF", 
    },
  },
  typo: {
    fontSize: "13px"
  },
  formContent: {
    padding: "40px 200px 0px 200px",
    textAlign: "left",
  },
  formInput: {
    width: '100%',
    height: "38px",
    borderBottom: "1px solid #7E57C2", 
    padding: "0 15px", 
    fontSize: "13px",
    fontFamily: 'Poppins',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    outline: 'none', 
    '&:focus': {
      borderBottom: "2px solid #512DA8", 
    },
  },
  submitButton: {
    fontSize: "12px",
    textTransform: "none",
    padding: "5px 10px",
    backgroundColor: "transparent", 
    border: "1px solid", 
    borderColor: "gray", 
    color: "#FFFFFF", 
    "&:hover": {
      backgroundColor: "#9575CD",
      borderColor: "#9575CD", 
    },
  },
  
}));

export default useStyles;
