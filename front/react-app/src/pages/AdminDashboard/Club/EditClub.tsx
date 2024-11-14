import React, { useEffect, useState } from 'react';
import axios from "../../../services/Axios";
import { useNavigate } from 'react-router-dom';

interface ClubInfo {
    id: number;
    description: string;
    history: string;
}

const EditClub: React.FC = () => {
    const [clubInfo, setClubInfo] = useState<ClubInfo>({ id: 1, description: '', history: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubInfo = async () => {
            try {
                const response = await axios.get('/club');
                setClubInfo(response.data[0]);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors du chargement des informations du club.');
                setLoading(false);
            }
        };

        fetchClubInfo();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClubInfo(prevInfo => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/club/${clubInfo.id}`, {
                description: clubInfo.description,
                history: clubInfo.history,
            });
            alert('Informations mises à jour avec succès.');
        } catch (error) {
            setError("Erreur lors de la mise à jour des informations du club.");
        }
    };

    const handleGoBack = () => {
        navigate('/admin');
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Modifier la présentation du club</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                        Nom du club
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={clubInfo.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="history">
                        Histoire du club
                    </label>
                    <textarea
                        id="history"
                        name="history"
                        value={clubInfo.history}
                        onChange={handleInputChange}
                        rows={5}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Enregistrer les modifications
                </button>
            </form>
            <button
                type="button"
                onClick={handleGoBack}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
                Retour à l'admin
            </button>
        </div>
    );
};

export default EditClub;