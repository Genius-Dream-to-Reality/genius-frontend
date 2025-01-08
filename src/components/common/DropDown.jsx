import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import useStyles from "../../assets/css/style";

const DropDown = ({
  items,
  selectedItem,
  setSelectedItem
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (event) => {
    setSelectedItem(event);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Box
        className={classes.BoxButton}
        justifyContent="space-between"
        cursor="pointer"
        padding="12px 20px"
        onClick={toggleDropdown}
      >
        <Typography sx={{
          flex: 1,
          color: "white",
          fontSize: "14px",
        }}>
          {selectedItem}
        </Typography>
        <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
          ▼
        </span>
      </Box>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={classes.DropDown}>
          {items.map((event, index) => (
            <div
              key={index}
              onClick={() => handleSelect(event)}
              className={classes.DropDownItems}
              style={{
                borderBottom: index !== items.length - 1 ? "1px solid #ccc" : "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              {event}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
