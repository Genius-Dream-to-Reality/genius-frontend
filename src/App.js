import React from "react";
import { ThemeProvider,CssBaseline  } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from './styles/theme';
import Home from "./pages/HomePage";
import SelectEventType from "./pages/SelectEventType";
import RegisterComponent from "./components/auth/RegisterForm";
import UserTypeSelection from "./components/auth/UserTypeSelection";
import EventPlanningForm from "./components/event-planning/EventPlanningForm";
import VendorAccountForm from "./components/vendor-account/VendorAccountForm";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="select-event" element={<SelectEventType />} />
            <Route path="choose-type" element={<UserTypeSelection />} />
            <Route path="register" element={<RegisterComponent />} />
            <Route path="event-planning" element={<EventPlanningForm/>} />
            <Route path="vendor-account" element={<VendorAccountForm/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
