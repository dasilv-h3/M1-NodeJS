import { useEffect, useState } from "react";
import axios from "../services/Axios";
import versus from "../assets/versus.png"
import { Matches } from "../interfaces/MatchesIterfaces";
import Navbar from "../components/Navbar";
import "../assets/css/masculinprojunior.css";

const Masculinprojunior = () => {
    const NOTRE_EQUIPE = "FrontKick FC";
    const [masculinjuior, setMasculinJunior] = useState<Matches[]>([]);

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
        <>
        <Navbar />
        <div className="">
        <h2 className="text-black mb-4">Masculins Juniors</h2>
      
        {/* Matchs à venir */}
   
        <ul className=" mb-4">
          {masculinjuior
            .filter((mj) => new Date(mj.date).getTime() > Date.now())
            .map((mj) => {
              const dateObj = new Date(mj.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      
              return (
                <li className="flex gap-x-4 list-disc" key={`${mj.section_name}-${mj.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div><img className="max-w-[3vh]" src={versus} alt="vs" /></div>
                  <div>
                    <p>{mj.team_name}</p>
                  </div>
                  <div>
                    <p>{formattedDate}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      
        {/* Matchs Passés */}
        <h3 className="text-gray-500 mb-4">Matchs Passés</h3>
        <ul className="mb-4">
          {masculinjuior
            .filter((mj) => new Date(mj.date).getTime() <= Date.now())
            .map((mj) => {
              const dateObj = new Date(mj.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      
              return (
                <li className="flex gap-x-4 list-disc" key={`${mj.section_name}-${mj.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div>{mj.score}</div>
                  <div>
                    <p>{mj.team_name}</p>
                  </div>
                  <div>
                    <p>{formattedDate}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      </> 
    );
};

export default Masculinprojunior;
