import React, { useState, useEffect } from 'react';
import axios from '../../../services/Axios';
import { useNavigate } from 'react-router-dom';

interface Team {
    id: number;
    name: string;
    section_name: string;
}

interface Section {
    id: number;
    name: string;
}

const AddMatch: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [sections, setSections] = useState<Section[]>([]);  // Etat pour les sections
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [selectedSection, setSelectedSection] = useState<number | null>(null);
    const [score, setScore] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeamsAndSections = async () => {
            try {
                const [teamsResponse, sectionsResponse] = await Promise.all([
                    axios.get('/teams'),
                    axios.get('/sections')  // Assurez-vous d'avoir une route qui renvoie toutes les sections
                ]);

                setTeams(teamsResponse.data);
                setSections(sectionsResponse.data);
            } catch (error) {
                setError('Erreur lors du chargement des équipes et des sections.');
            }
        };

        fetchTeamsAndSections();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSection || !selectedTeam || !score || !date || !time) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
    
        // Combine date and time into a single string (e.g., 'YYYY-MM-DD HH:mm:ss')
        const combinedDateTime = formatDateTime(date, time); // Formaté en 'YYYY-MM-DD HH:mm:ss'
    
        const matchData = {
            section_id: selectedSection,
            score,
            opponent_id: selectedTeam,
            date: combinedDateTime,  // Using the custom formatted date
        };
    
        try {
            setLoading(true);
            await axios.post('/matches', matchData);
            setLoading(false);
            navigate('/admin/manage-matches');
        } catch (error) {
            setError('Erreur lors de l\'ajout du match.');
            setLoading(false);
        }
    };

    // Fonction pour formater la date et l'heure en 'YYYY-MM-DD HH:mm:ss'
    const formatDateTime = (date: string, time: string): string => {
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        return `${year}-${month}-${day} ${hour}:${minute}:00`;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Ajouter un match</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                
                {/* Dropdown pour les équipes */}
                <div className="mb-4">
                    <label htmlFor="team" className="block text-gray-700 font-medium mb-2">Équipe</label>
                    <select
                        id="team"
                        value={selectedTeam ?? ''}
                        onChange={(e) => setSelectedTeam(Number(e.target.value))}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Sélectionnez une équipe</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dropdown pour les sections */}
                <div className="mb-4">
                    <label htmlFor="section" className="block text-gray-700 font-medium mb-2">Section</label>
                    <select
                        id="section"
                        value={selectedSection ?? ''}
                        onChange={(e) => setSelectedSection(Number(e.target.value))}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Sélectionnez une section</option>
                        {sections.map(section => (
                            <option key={section.id} value={section.id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Champ pour le score */}
                <div className="mb-4">
                    <label htmlFor="score" className="block text-gray-700 font-medium mb-2">Score</label>
                    <input
                        type="text"
                        id="score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Score du match"
                    />
                </div>

                {/* Champ pour la date */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Champ pour l'heure */}
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Heure</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {loading ? 'Ajout en cours...' : 'Ajouter le match'}
                </button>
            </form>
        </div>
    );
};

export default AddMatch;