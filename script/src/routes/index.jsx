import Home from "../pages/dashboard";
import { LoginAndRegister } from "../pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const Start = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};
