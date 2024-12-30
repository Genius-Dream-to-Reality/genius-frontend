import React from "react";
import { ThemeProvider,CssBaseline  } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from './theme';
import Home from "./components/Home/Home";
import SelectEventType from "./components/Home/SelectEventType";
import RegisterComponent from "./components/auth-service/RegisterComponent";
import EventPlanningComponent from "./components/event-planning/EventPlanningComponent";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="select-event" element={<SelectEventType />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route path="event-planning" element={<EventPlanningComponent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
