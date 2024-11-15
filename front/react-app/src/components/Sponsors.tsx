import React, { useEffect, useState } from "react";

type Partenaire = {
  id: number;
  logo: string;
  url: string;
};

const Partenaires: React.FC = () => {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/sponsors");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des partenaires");
        }
        const data = await response.json();
        setPartenaires(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartenaires();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement des partenaires...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Nos Partenaires
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-8">
        {partenaires.map((partenaire) => (
          <div
            key={partenaire.id}
            className="flex flex-col items-center space-y-2"
          >
            <img
              src={partenaire.url}
              alt={partenaire.logo}
              className="w-24 h-24 object-contain"
            />
            <p className="text-gray-600 text-sm">{partenaire.logo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partenaires;
