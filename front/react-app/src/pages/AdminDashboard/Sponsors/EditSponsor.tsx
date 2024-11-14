import React, { useState, useEffect } from 'react';
import axios from '../../../services/Axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditSponsor: React.FC = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null); // État pour l'aperçu de l'image
    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchSponsor = async () => {
            try {
                const response = await axios.get(`/sponsors/${id}`);
                setUrl(response.data.url);
                setPreview(`http://localhost:3000/uploads/sponsors/${response.data.logo}`);
            } catch (error) {
                setError("Erreur lors du chargement des informations du sponsor.");
            }
        };
        fetchSponsor();
    }, [id]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setLogo(file);
            setPreview(URL.createObjectURL(file)); // Génère l'URL d'aperçu pour l'image sélectionnée
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        const formData = new FormData();
        if (logo) formData.append('logo', logo);
        formData.append('url', url);

        try {
            setLoading(true);
            await axios.put(`/sponsors/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            navigate('/admin/sponsors');
        } catch (error) {
            setError("Erreur lors de la mise à jour du sponsor.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Éditer le sponsor</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                
                <div className="mb-4">
                    <label htmlFor="logo" className="block text-gray-700 font-medium mb-2">
                        Logo
                    </label>
                    <input
                        type="file"
                        id="logo"
                        onChange={handleLogoChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        accept="image/*"
                    />
                    {preview && (
                        <div className="mt-4">
                            <p className="text-gray-700">Aperçu du logo :</p>
                            <img src={preview} alt="Aperçu du logo" className="max-w-xs mt-2 border border-gray-300 rounded" />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
                        URL
                    </label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={handleUrlChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="https://example.com"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {loading ? 'Mise à jour en cours...' : 'Mettre à jour le sponsor'}
                </button>
            </form>
        </div>
    );
};

export default EditSponsor;