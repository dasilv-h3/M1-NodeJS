import { useEffect, useState } from "react";
import axios from "../services/Axios";
import Navbar from "../components/Navbar";
import Card from "../components/Card"; // Importez le composant Card
import { News } from "../interfaces/NewsInterfaces";



const Actualite = () => {
  const [news, setNews] = useState<News[]>([]);

  const actu = async () => {
    try {
      const response = await axios.get("/news");

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      console.log("data news:", data, "\nnewsPrincipal:", news);

      setNews(data);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    actu();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center font-bold mt-4">
        <h1>Actualité</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {news.map((n) => (
          <Card
            key={n.title} // Utilisez une clé unique
            title={n.title}
            created_at={n.created_at}
            description={n.description}
          />
        ))}
      </div>
    </>
  );
};

export default Actualite;
