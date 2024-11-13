import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Masculinprojunior from "../pages/Masculinprojunior";


const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smj" element={<Masculinprojunior />} />
            <Route path="/sms" element={<Masculinprojunior />} />
            <Route path="/sfj" element={<Masculinprojunior />} />
            <Route path="/sfs" element={<Masculinprojunior />} />
            <Route path="/actualites" element={<Masculinprojunior />} />
            <Route path="/contact" element={<Masculinprojunior />} />
            <Route path="/administration" element={<Masculinprojunior />} />
        </Routes>
    </BrowserRouter>
  );
};

export default Rooter;