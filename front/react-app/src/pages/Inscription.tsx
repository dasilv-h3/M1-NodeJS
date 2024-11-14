import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import de useNavigate pour redirection
import "../assets/css/inscription.css";

const Inscription: React.FC = () => {
  // Définition des états pour chaque champ
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate(); // Création de navigate pour la redirection

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          first_name: name,
          last_name: surname,
        }),
      });

      if (!response.ok) {
        // Affiche un message d'erreur si la requête échoue
        const errorData = await response.json();
        console.error("Erreur d'inscription :", errorData.message);
        alert("Erreur lors de l'inscription : " + errorData.message);
        return;
      }

      // Si l'inscription est réussie
      const data = await response.json();
      console.log("Inscription réussie :", data);
      alert("Inscription réussie !");
      
      // Redirige vers la page de connexion
      navigate('/connexion'); 

    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <Container className="signup-box" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography className="text-white" variant="h5">S'inscrire</Typography>
        <p className="text-white text-xs">
          Les champs suivis d'un <span className="text-red-500 text-xl align-middle">*</span> sont obligatoires.
        </p>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} className="input-field">
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Nom"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                  sx: {
                    '& .MuiFormLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} className="input-field">
              <TextField
                name="surname"
                required
                fullWidth
                id="surname"
                label="Prénom"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                  sx: {
                    '& .MuiFormLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} className="input-field">
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                  sx: {
                    '& .MuiFormLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} className="input-field">
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                  sx: {
                    '& .MuiFormLabel-asterisk': {
                      color: 'red',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            className="register-button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            S'inscrire
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className="login-link" to="/connexion">
                Vous avez déjà un compte? Se connecter
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Inscription;
