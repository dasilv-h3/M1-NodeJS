import { useEffect, useState } from "react";
import axios from "../services/Axios";
import { MasculinJunior } from "../interfaces/MatchesIterfaces";

const Masculinprojunior = () => {
    const [masculinjuior, setMasculinJunior] = useState<MasculinJunior[]>([]);

    const masculin = async () => {
        try {
            const response = await axios.get('/matches/masculinjunior');

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            console.log('data:', data);
            setMasculinJunior(data);
        } catch (e: any) {
            // Ajoutez un log pour l’erreur complète
            console.error('Erreur réseau:', e.response ? e.response.data : e.message);
        }
    }

    useEffect(() => {
        masculin();
    }, []); // Utilisez un tableau de dépendance vide pour ne pas provoquer de boucles

    return (
        <div className="">
            <h2 className="text-black">Matchs Précédents</h2>
            <div>
                <ul>
                    {masculinjuior.map((mj) => <li key={mj.section_id}>{mj.score}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default Masculinprojunior;
