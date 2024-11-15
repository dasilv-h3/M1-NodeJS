import React, { useEffect, useState } from 'react';
import axios from "../../../services/Axios";
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface Match {
    id: number;
    opponent_name: string;
    section_name: string;
    score: string;
    match_date: string;
    match_time: string;
}

const ManageMatches: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('/matches');
                console.log("MATCHES", response.data);
                setMatches(response.data);
                setLoading(false);
            } catch (error) {
                const axiosError = error as AxiosError;
    
                if (axiosError.response) {  // Vérifie que response est défini
                    // Vérification du status pour gérer une erreur 404
                    if (axiosError.response.status === 404) {
                        const errorMessage = axiosError.response.data?.message as string ||undefined || 'Les matchs n\'ont pas été trouvés.';
                        setError(errorMessage);
                    } else {
                        const errorMessage = axiosError.response.data?.message || 'Erreur lors du chargement des matchs.';
                        setError(errorMessage);
                    }
                } else {
                    // Si l'erreur n'a pas de réponse (par exemple, une erreur réseau)
                    setError('Erreur de connexion. Veuillez vérifier votre réseau.');
                }
    
                setLoading(false);
            }
        };
    
        fetchMatches();
    }, []);

    const deleteMatch = async (id: number) => {
        try {
            await axios.delete(`/matches/${id}`);
            setMatches(prevMatches => prevMatches.filter(match => match.id !== id));
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 401) {
                setError('Vous n\'avez pas les droits !');
            } else {
                setError('Erreur lors de la suppression du match.');
            }
        }
    };

    const handleGoBack = () => {
        navigate('/admin');
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatTime = (timeStr: string) => {
        const date = new Date(`1970-01-01T${timeStr}`);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Gestion des matchs</h2>
            <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4"
            >
                Retour à l'admin
            </button>
            <div className="mb-4">
                <h3 className="text-xl font-medium mb-4">Liste des matchs</h3>
                <Link to="/admin/matches/add-match" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">
                    Ajouter un match
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">Adversaire</th>
                            <th className="px-4 py-2 text-left">Section</th>
                            <th className="px-4 py-2 text-left">Score</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Heure</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match => (
                            <tr key={match.id} className="border-b">
                                <td className="px-4 py-2">{match.opponent_name}</td>
                                <td className="px-4 py-2">{match.section_name}</td>
                                <td className="px-4 py-2">{match.score}</td>
                                <td className="px-4 py-2">{formatDate(match.match_date)}</td>
                                <td className="px-4 py-2">{formatTime(match.match_time)}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Link
                                            to={`/admin/matches/edit-match/${match.id}`}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                        >
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => deleteMatch(match.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default ManageMatches;