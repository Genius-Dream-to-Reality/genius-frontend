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
    fontSize: "14px"
  },
  formContent: {
    padding: "40px 150px 0px 150px",
    textAlign: "left",
  },
  formInput: {
    width: '100%',
    height: "38px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
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
  BoxButton: {
    display: "flex",
    alignItems: "center",
    border: "2px solid white",
    borderRadius: "5px",
    color: "white",
    padding: "11px 20px"
  },
  DropDown: {
    position: "absolute",
    top: "100%",
    left: "0",
    width: "100%",
    border: "1px solid white",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
    color: "black",
    maxHeight: "200px",
    overflowY: "auto",
  },
  DropDownItems: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontSize: "14px"
  }
}));

export default useStyles;
