import React, { useEffect, useState } from 'react';
import axios from "../../../services/Axios";
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface Partner {
    id: number;
    logo: string;
    url: string;
    name: string;
}

const ManageSponsors: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('/sponsors');
                setPartners(response.data);
                setLoading(false);
            } catch (error) {
                setError('Erreur lors du chargement des partenaires.');
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const deleteSponsor = async (id: number) => {
        try {
            await axios.delete(`/sponsors/${id}`);
            setPartners(prevPartners => prevPartners.filter(partner => partner.id !== id));
        } catch (error) {
            console.log(error);
            if((error as AxiosError).status == 401) {
                setError('Vous n\'avez pas les droits !');
            } else {
                setError('Erreur lors de la suppression des partenaires.');
            }
        }
    };

    const handleGoBack = () => {
        navigate('/admin');
    };

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Gestion des partenaires</h2>
            <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mb-4"
            >
                Retour à l'admin
            </button>
            <div className="mb-4">
                <h3 className="text-xl font-medium mb-4">Liste des partenaires</h3>
                <Link to="/admin/sponsors/add-sponsor" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">
                    Ajouter
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-left">Logo</th>
                            <th className="px-4 py-2 text-left">URL</th>
                            <th className="px-4 py-2 text-left">Nom</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && (<tr className="border-b">
                            <td className="px-4 py-2 text-center" colSpan={3}>{error}</td>
                        </tr>)}
                        {partners.map(partner => (
                            <tr key={partner.id} className="border-b">
                                <td className="px-4 py-2">
                                    <img src={`http://localhost:3000/uploads/sponsors/${partner.logo}`} alt="Logo" className="max-w-16 h-auto" />
                                </td>
                                <td className="px-4 py-2">
                                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        {partner.url}
                                    </a>
                                </td>
                                <td className="px-4 py-2">
                                    <a href={partner.name} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        {partner.name}
                                    </a>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Link to={`/admin/sponsors/edit-sponsor/${partner.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 w-full sm:w-auto">
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => deleteSponsor(partner.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
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
        </div>
    );
}

export default ManageSponsors;