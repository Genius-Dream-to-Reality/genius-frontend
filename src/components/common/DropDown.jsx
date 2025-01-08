import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
  "& .MuiPaper-root": {
    backgroundColor: "#1a1a1a",
  },
  "& .MuiMenuItem-root": {
    color: "#fff",
  },
});

const DropDown = ({ label, items, selectedItem, setSelectedItem }) => {
  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
        {label}
      </InputLabel>
      <StyledSelect
        value={selectedItem}
        onChange={handleChange}
        label={label}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor:"#fff",
              maxHeight: 48 * 4.5 + 8, 
              "& .MuiMenuItem-root": {
                color: "#1a1a1a",
                "&:hover": {
                  bgcolor: "rgba(69, 64, 64, 0.1)",
                },
                "&.Mui-selected": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                  },
                },
              },
            },
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default DropDown;
