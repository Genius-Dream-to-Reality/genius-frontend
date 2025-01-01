import React, { useState } from "react";

const DropDownComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Event Type");
  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Conference',
    'Workshop',
    'Seminar',
    'Networking Event',
    'Concert',
    'Festival',
    'Product Launch',
    'Trade Show',
    'Fundraiser',
    'Corporate Meeting',
    'Webinar',
    'Team Building',
    'Award Ceremony',
    'Exhibition',
    'Bridal Shower',
    'Baby Shower',
    'Charity Event',
    'Sports Event',
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (event) => {
    setSelectedItem(event);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", margin: "20px auto" }}>
      {/* Dropdown Button */}
      <div
        onClick={toggleDropdown}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          border: "2px solid white",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          backgroundColor: "#2A204D", 
        }}
      >
        <span>{selectedItem}</span>
        <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
          ▼
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
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
          }}
        >
          {eventTypes.map((event, index) => (
            <div
              key={index}
              onClick={() => handleSelect(event)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom:
                  index !== eventTypes.length - 1 ? "1px solid #ccc" : "none",
                backgroundColor: "transparent", 
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

export default DropDownComponent;
