import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJleGVtcGxlQHh5ei5mciIsInJvbGVfaWQiOjIsImFjdGl2ZSI6MSwiaWF0IjoxNzMxNTg2NTcwLCJleHAiOjE3MzE1OTAxNzB9.1vDJ0paX00czlx2O3aJ_1pS0VxU9PosjgfhshH2uLwI";

const Axios = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }) // Ajout de l'en-tête d'autorisation
    },
});

// Intercepteur pour gérer les requêtes nécessitant un jeton
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupérer le jeton à chaque requête
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default Axios;
