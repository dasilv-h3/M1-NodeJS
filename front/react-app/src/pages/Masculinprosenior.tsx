import { useEffect, useState } from "react";
import { Matches } from "../interfaces/MatchesIterfaces";
import axios from "../services/Axios";
import versus from "../assets/versus.png";
import Navbar from "../components/Navbar";

const Masculinprosenior = () =>{
    const NOTRE_EQUIPE = "FrontKick FC";
    const [masculinsenior, setMasculinSenior] = useState<Matches[]>([]);

    const masculin = async () => {
        try {
            const response = await axios.get('/matches/masculinsenior');

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            console.log('data:', data);
            setMasculinSenior(data);
        } catch (e: any) {
            // Ajoutez un log pour l’erreur complète
            console.error('Erreur réseau:', e.response ? e.response.data : e.message);
        }
    }

    useEffect(() => {
        masculin();
    }, []);
    return(
      <>
      <Navbar />
      <div className="">
        <h2 className="text-black mb-4">Masculins Séniors</h2>
      
        {/* Matchs à venir */}
   
        <ul className=" mb-4">
          {masculinsenior
            .filter((ms) => new Date(ms.date).getTime() > Date.now())
            .map((ms) => {
              const dateObj = new Date(ms.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      
              return (
                <li className="flex gap-x-4 list-disc" key={`${ms.section_name}-${ms.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div><img className="max-w-[3vh]" src={versus} alt="vs" /></div>
                  <div>
                    <p>{ms.team_name}</p>
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
          {masculinsenior
            .filter((ms) => new Date(ms.date).getTime() <= Date.now())
            .map((ms) => {
              const dateObj = new Date(ms.date);
              const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
      
              return (
                <li className="flex gap-x-4 list-disc" key={`${ms.section_name}-${ms.date}`}>
                  <div>
                    <p>{NOTRE_EQUIPE}</p>
                  </div>
                  <div>{ms.score}</div>
                  <div>
                    <p>{ms.team_name}</p>
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

export default Masculinprosenior;