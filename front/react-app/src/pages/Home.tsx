import Navbar from "../components/Navbar";
import Presentation from "../assets/video/presentation.mp4";
import Calendar from "../components/Calendar";
import { useEffect, useState } from "react";
import axios from "../services/Axios";
import { News } from "../interfaces/NewsInterfaces";
import { Club } from "../interfaces/ClubInterfaces";
// import Footer from "../components/Footer";

const Home = () => {
    const [newsPrincipal, setNewsPrincipal] = useState<News | null >(null);
    const [club, setClub] = useState<Club | null>(null);
    const actu = async () =>{
        try {
            const response = await axios.get('/news');
            const responseClub = await axios.get('/club');

            
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            const dataClub = responseClub.data;
            console.log('data news:', data,  '\ndata club:', dataClub,'\nnewsPrincipal:',newsPrincipal);
            setNewsPrincipal(data[0]);
            setClub(dataClub[0]);
        } catch (e: any) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        actu();
    }, []); 
    return (
        <>
            <Navbar />
            <section className="relative w-full h-screen overflow-hidden mb-4">
                {/* Vidéo en plein écran */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                    autoPlay
                    muted
                    loop
                >
                    <source src={Presentation} type="video/mp4" />
                    Votre navigateur ne supporte pas la balise vidéo.
                </video>

                {/* Bannière de bienvenue centrée */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 text-black p-8 rounded-lg">
                        <h1 className="text-4xl font-bold">Bienvenue sur notre site</h1>
                        <p className="text-lg mt-4">Découvrez notre contenu passionnant !</p>
                    </div>
                </div>
            </section>
            {club && (() => {
                return (
                    <section className="max-w-[75%] bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-bold text-gray-800">Historique du FrontKick FC</h2>
                            {/* <p className="text-sm text-gray-500 mb-2">{formattedDate}</p> */}
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <p className="text-gray-600">{club.history}</p>
                        </div>
                        <div className="px-6 py-4">
                            <h2 className="text-xl font-bold text-gray-800">Descriptif des équipes du FrontKick FC</h2>
                            {/* <p className="text-sm text-gray-500 mb-2">{formattedDate}</p> */}
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <p className="text-gray-600">{club.description}</p>
                        </div>
                    </section>
                );
            })()}

            <div className="p-[20%]">
                <Calendar />
            </div>
        </>
    );
};

export default Home;
