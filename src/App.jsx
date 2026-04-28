import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Citizen from "./pages/Citizen";
import AdminHome from "./pages/AdminHome";
import LegalExpert from "./pages/LegalExpert";
import Educator from "./pages/Educator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/citizen" element={<Citizen />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/legal" element={<LegalExpert />} />
      <Route path="/educator" element={<Educator />} />
    </Routes>
  );
}

export default App;