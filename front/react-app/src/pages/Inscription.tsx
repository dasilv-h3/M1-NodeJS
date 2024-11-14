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
import { Link } from "react-router-dom";
import "../assets/css/inscription.css";

const Inscription: React.FC = () => {
  // Définition des états avec les types pour chaque champ
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    // Ajoute ici la logique pour gérer l'inscription
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
        <p className="text-white text-xs">Les champs suivis d'un <span className="text-red-500 text-xl align-middle">*</span> sont obligatoires.</p>
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
