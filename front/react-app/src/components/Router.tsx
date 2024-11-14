import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Masculinprojunior from "../pages/Masculinprojunior";
import Masculinprosenior from "../pages/Masculinprosenior";
import Femininprojunior from "../pages/Femininprojunior";
import Femininprosenior from "../pages/Femininprosenior";
import Actualite from "../pages/Actualite";

import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription"

const Rooter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smj" element={<Masculinprojunior />} />
            <Route path="/sms" element={<Masculinprosenior />} />
            <Route path="/sfj" element={<Femininprojunior />} />
            <Route path="/sfs" element={<Femininprosenior />} />
            <Route path="/actualites" element={<Actualite />} />
            <Route path="/contact" element={<Masculinprojunior />} />
            <Route path="/administration" element={<Masculinprojunior />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
        </Routes>
    </BrowserRouter>
  );
};

export default Rooter;