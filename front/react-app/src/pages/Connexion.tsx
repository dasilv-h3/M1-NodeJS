import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/connexion.css";
import { useAuth } from "../context/AuthContext";
import Axios from "../services/Axios";
import logo from "../assets/img/logo3.png";

const Connexion: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const { setToken, setUser } = useAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Veuillez écrire votre email");
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Veuillez écrire une adresse email valide");
      valid = false;
    }

    if (!password) {
      setPasswordError("Veuillez écrire votre mot de passe");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères");
      valid = false;
    }

    return valid;
  };

  const onButtonClick = async () => {
    if (!validateForm()) return;
  
    try {
      const response = await Axios.post("users/login", { email, password });
      const data = response.data;
  
      if (response.status === 200) {
        setUser(data.user); // Stocke les informations de l'utilisateur dans le contexte
        setToken(data.token); // Stocke le token dans le contexte
        localStorage.setItem("authToken", data.token);
        navigate("/"); // Redirige vers la page d'accueil ou une autre page protégée
      } else {
        if (data.message === "Invalid email or password") {
          setPasswordError("Email ou mot de passe invalide");
        } else {
          console.error("Erreur de connexion:", data.message);
        }
      }
    } catch (error) {
      console.error("Erreur de requête:", error);
    }
  };

  return (
    <>
    <div className="flex justify-center">
      <Link className="contents" to="/">
        <img className="max-w-[10%]" src={logo} alt="logo" />
      </Link>
    </div>
    <div className="login-box">
      <h2>Connexion à FrontKick FC</h2>
      <form>
        <div className="user-box">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <input
          onClick={onButtonClick}
          className="inputButton"
          type="button"
          value="Se connecter"
        />
      </form>
    </div>
    </>
  );
};

export default Connexion;