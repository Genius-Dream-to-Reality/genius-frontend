import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import theme from './styles/theme';
import Home from "./pages/HomePage";
import SelectEventType from "./pages/SelectEventType";
import RegisterComponent from "./components/auth/RegisterForm";
import UserTypeSelection from "./components/auth/UserTypeSelection";
import EventPlanningForm from "./components/event-planning/EventPlanningForm";
import RegisterOTP from "./components/auth/RegisterOTP";
import RegisterCompleted from "./components/auth/RegisterCompleted";
import EventPlanningCompletion from "./components/event-planning/EventPlanningCompletion";
import ViewPlan from "./components/event-planning/ViewPlan";
import LoginForm from "./components/auth/LoginForm";
import Callback from "./components/auth/Callback";
import VendorAccountForm   from "./components/vendor-account/VendorAccountForm";
import CustomerDashboard from "./components/customer-dashboard/CustomerDashboard";
import VendorDashboardIncompleted from "./components/vendor-dashboard/VendorDashboardIncompleted";
import VendorDashboard from "./components/vendor-dashboard/VendorDashboard";
import ServiceDetails from "./pages/vendor/ServiceDetails";
import Payment  from "./components/payments/Payment";
import PaymentProcessing  from "./components/payments/PaymentProcessing";
import PaymentSuccess  from "./components/payments/PaymentSuccess";
import { AlertProvider } from "./contexts/AlertContext";
import { authService } from './services/authService';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    authService.initializeAuth();
  }, []); 

  return (
    <ThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
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
              <Route path="event-planning" element={<EventPlanningForm />} />
              <Route path="vendor-account" element={<VendorAccountForm />} />
              <Route path="register-otp" element={<RegisterOTP />} />
              <Route path="register-completed" element={<RegisterCompleted />} />
              <Route path="eventplaning-completed" element={<EventPlanningCompletion />} />
              <Route path="view-plan" element={<ViewPlan />} />
              <Route path="customer-dashboard" element={<CustomerDashboard />} />
              <Route path="vendor-dashboard-incompleted" element={<VendorDashboardIncompleted />} />
              <Route path="vendor-dashboard" element={<VendorDashboard />} />
              <Route path="vendor/service/:serviceId" element={<ServiceDetails />} />
              <Route path="payment" element={<Payment />} />
              <Route path="payment-processing" element={<PaymentProcessing />} />
              <Route path="payment-success" element={<PaymentSuccess />} />
            </Routes>
          </Router>
        </AlertProvider>
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
