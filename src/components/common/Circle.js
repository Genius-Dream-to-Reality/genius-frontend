import React from 'react';

const Circle = ({ number, active, completed }) => {
  const paddedNumber = number.toString().padStart(2, "0");

  const borderColor = active ? "#7E57C2" : completed ? "#7E57C2" : "white";
  const outerBorderColor = active ? "#7E57C2" : "white";

  return (
    <div
      style={{
        position: "relative",
        width: "65px",
        height: "65px",
        borderRadius: "50%",
        border: `0.25px solid ${borderColor}`,
        textAlign: "center",
        paddingTop: "10px",
        boxSizing: "border-box", 
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-5px", 
          left: "-5px",
          width: "75px", 
          height: "75px",
          borderRadius: "50%",
          border: `1px solid ${outerBorderColor}`,
          boxSizing: "border-box", 
        }}
      />
      <h5
        style={{
          paddingTop: "10px",
          fontSize: "16px",
          color: active ? "#7E57C2" : "white",
        }}
      >
        {paddedNumber}
      </h5>
    </div>
  );
};

export default Circle;
