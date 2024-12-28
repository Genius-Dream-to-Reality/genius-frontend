import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from './theme';
import Home from "./components/Home/Home";
import SelectEventType from "./components/Home/SelectEventType";

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <Router>
        <Routes>
            <Route index element={<Home />} />
            <Route path="select-event" element={<SelectEventType />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
