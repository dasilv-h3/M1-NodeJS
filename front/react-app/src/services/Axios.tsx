import axios from 'axios';

const token = localStorage.getItem('authToken');

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
        const token = localStorage.getItem('authToken'); // Récupérer le jeton à chaque requête
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
