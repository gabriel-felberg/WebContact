import Home from "../pages/home";
import { LoginAndRegister } from "../pages/loginAndRegister";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


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
