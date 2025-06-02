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
import RegisterOTP from "./components/auth/RegisterOTP";
import RegisterCompleted from "./components/auth/RegisterCompleted";
import EventPlanningCompletion from "./components/event-planning/EventPlanningCompletion";
import ViewPlan from "./components/event-planning/ViewPlan";
import LoginForm from "./components/auth/LoginForm";
import Callback from "./components/auth/Callback";
import CustomerDashboard from "./components/customer-dashboard/CustomerDashboard";
import VendorDashboardIncompleted from "./components/vendor-dashboard/VendorDashboardIncompleted";
import VendorDashboard from "./components/vendor-dashboard/VendorDashboard";
import {AlertProvider} from "./contexts/AlertContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <AlertProvider>
          <CssBaseline />
          <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path="select-event" element={<SelectEventType />} />
                <Route path="choose-type" element={<UserTypeSelection />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterComponent />} />
                <Route path="auth/callback" element={<Callback />} />
                <Route path="event-planning" element={<EventPlanningForm/>} />
                <Route path="vendor-account" element={<VendorAccountForm/>} />
                <Route path="register-otp" element={<RegisterOTP />} />
                <Route path="register-completed" element={<RegisterCompleted />} />
                <Route path="eventplaning-completed" element={<EventPlanningCompletion />} />
                <Route path="view-plan" element={<ViewPlan />} />
                <Route path="customer-dashboard" element={<CustomerDashboard/>} />
                <Route path="vendor-dashboard-incompleted" element={<VendorDashboardIncompleted/>} />
                <Route path="vendor-dashboard" element={<VendorDashboard/>} />
            </Routes>
          </Router>
        </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
