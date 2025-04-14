import React from 'react';

const Circle = ({ number, active, completed }) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        width: "65px",
        height: "65px",
        backgroundColor: completed ? "#B88E2F" : "transparent",
        border: active ? "2px solid #B88E2F" : "1px solid #8F8F8F",
        textAlign: "center",
        paddingTop: "10px",
      }}
    >
      <h5
        style={{
          paddingTop: "10px",
          fontSize: "16px",
          color: active ? "#fff" : completed ? "#fff" : "#8F8F8F",
        }}
      >
        {number}
      </h5>
    </div>
  );
};

export default Circle;
