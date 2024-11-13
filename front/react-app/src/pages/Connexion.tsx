import { useState } from "react";
import "../assets/css/connexion.css";
import {
  useNavigate,
} from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    if (password.length < 7) {
      setPasswordError("password must be 8 character or longer");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("please enter a vlid email address");
      return;
    }

    if (email) {
        navigate("/");
    } else {
        navigate("/connexion");
    }
    //navigate("../Home")
  };

  return (
    <div className="login-box">
      <h2>Se Connecter</h2>
      <form>
        <div className="user-box">
          <input
            value={email}
            placeholder="Enter email address here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"user-box"}
          />

          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder="Enter password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <input
          onClick={onButtonClick}
          className={"inputButton"}
          type="button"
          value={"Submit"}
        />
      </form>
    </div>
  );
}

export default Connexion;
