import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJleGVtcGxlQHh5ei5mciIsInJvbGVfaWQiOjIsImFjdGl2ZSI6MSwiaWF0IjoxNzMxNjYxMDcwLCJleHAiOjE3MzE2NjQ2NzB9.N86dScV-lTWJJNtZxU5TNJ8omrSMSyg_iRdbmUZKyKA";

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
