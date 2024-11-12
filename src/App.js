import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./Pages/Home";
import SelectEventType from "./components/layout/Home/SelectEventType";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="select-event" element={<SelectEventType />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
