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
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center mt-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-4 border-b-4 border-blue-500 pb-2 inline-block">
          🏆 Masculins Séniors
        </h2>
    
          {/* Matchs à venir */}
          <ul className="mb-4 space-y-4">
            {masculinsenior
              .filter((ms) => new Date(ms.date).getTime() > Date.now())
              .map((ms) => {
                const dateObj = new Date(ms.date);
                const formattedDate = `${dateObj
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${dateObj.getFullYear()}`;
    
                return (
                  <li
                    className="flex items-center justify-between gap-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    key={`${ms.section_name}-${ms.date}`}
                  >
                    <div>
                      <p className="font-semibold">{NOTRE_EQUIPE}</p>
                    </div>
                    <div>
                      <img className="max-w-[3vh]" src={versus} alt="vs" />
                    </div>
                    <div>
                      <p className="font-semibold">{ms.team_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{formattedDate}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
    
          {/* Matchs Passés */}
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-4 border-b-4 border-blue-500 pb-2 inline-block">
          🏆 Matchs Passés
        </h3>
          <ul className="mb-4 space-y-4">
            {masculinsenior
              .filter((ms) => new Date(ms.date).getTime() <= Date.now())
              .map((ms) => {
                const dateObj = new Date(ms.date);
                const formattedDate = `${dateObj
                  .getDate()
                  .toString()
                  .padStart(2, "0")}/${(dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}/${dateObj.getFullYear()}`;
    
                return (
                  <li
                    className="flex items-center justify-between gap-x-4 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    key={`${ms.section_name}-${ms.date}`}
                  >
                    <div>
                      <p className="font-semibold">{NOTRE_EQUIPE}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{ms.score}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{ms.team_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{formattedDate}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </>
    );
}

export default Masculinprosenior;