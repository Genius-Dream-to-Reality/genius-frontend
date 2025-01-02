import React from "react";
import { ThemeProvider,CssBaseline  } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from './styles/theme';
import Home from "./pages/HomePage";
import SelectEventType from "./pages/SelectEventType";
import RegisterComponent from "./components/auth/RegisterForm";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="select-event" element={<SelectEventType />} />
            <Route path="register" element={<RegisterComponent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
