import { useEffect, useState } from "react";
import { Matches } from "../interfaces/MatchesIterfaces";
import axios from "../services/Axios";
import versus from "../assets/versus.png";
import Navbar from "../components/Navbar";

const Femininprosenior = () =>{
    const NOTRE_EQUIPE = "FrontKick FC";
    const [femininsenior, setFemininSenior] = useState<Matches[]>([]);

    const feminin = async () => {
        try {
            const response = await axios.get('/matches/femininsenior');

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            console.log('data:', data);
            setFemininSenior(data);
        } catch (e: any) {
            // Ajoutez un log pour l’erreur complète
            console.error('Erreur réseau:', e.response ? e.response.data : e.message);
        }
    }

    useEffect(() => {
        feminin();
    }, []); // Utilisez un tableau de dépendance vide pour ne pas provoquer de boucles
    return(
      <>
      <Navbar />
        <div className="">
        <h2 className="text-black mb-4">Féminin Junior</h2>
      
        {/* Matchs à venir */}
   
        <ul className=" mb-4">
          {femininsenior
            .filter((fs) => new Date(fs.date).getTime() > Date.now())
            .map((fs) => {
              const dateObj = new Date(fs.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
              return (
                <li className="flex gap-x-4 list-disc" key={`${fs.section_name}-${fs.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div><img className="max-w-[3vh]" src={versus} alt="vs" /></div>
                  <div>
                    <p>{fs.team_name}</p>
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
          {femininsenior
            .filter((fs) => new Date(fs.date).getTime() <= Date.now())
            .map((fs) => {
              const dateObj = new Date(fs.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      
              return (
                <li className="flex gap-x-4 list-disc" key={`${fs.section_name}-${fs.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div>{fs.score}</div>
                  <div>
                    <p>{fs.team_name}</p>
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
    )
}

export default Femininprosenior;