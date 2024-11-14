import React, { useState } from 'react';
import axios from '../../../services/Axios';
import { useNavigate } from 'react-router-dom';

const AddSponsor: React.FC = () => {
    const [logo, setLogo] = useState<File | null>(null);
    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setLogo(e.target.files[0]);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!logo || !url) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('url', url);

        try {
            setLoading(true);
            await axios.post('/sponsors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            navigate('/admin/sponsors');
        } catch (error) {
            setError("Erreur");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Ajouter un sponsor</h2>
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
                    {loading ? 'Ajout en cours...' : 'Ajouter le sponsor'}
                </button>
            </form>
        </div>
    );
};

export default AddSponsor;