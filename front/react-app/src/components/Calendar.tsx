import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { Matches } from '../interfaces/MatchesIterfaces';
import axios from "../services/Axios";

const Calendar = () => {
  const [matchesPrev, setMatchesPrev] = useState<Matches[]>([]);
  const [matchesNext, setMatchesNext] = useState<Matches[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Stocker l'événement sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false); // Contrôle de la modal
  const NOTRE_EQUIPE = 'FrontKick FC';
  
  const fullMatch = async () => {
    try {
      const previousMatches = await axios.get("/matches/previousMatches");
      const nextMatches = await axios.get("/matches/nextMatches");

      if (previousMatches.status < 200 || previousMatches.status >= 300) {
        throw new Error("Network response was not ok");
      }

      if (nextMatches.status < 200 || nextMatches.status >= 300) {
        throw new Error("Network response was not ok");
      }

      const dataPrev = previousMatches.data;
      const dataNext = nextMatches.data;
      console.log("data previous:", dataPrev, "\ndata nextMatches:", dataNext);
      setMatchesPrev(dataPrev);
      setMatchesNext(dataNext);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    fullMatch();
  }, []);

  const events = [
    ...matchesPrev.map((match) => ({
      title: `${match.team_name} - ${match.section_name} (${match.score})`,
      date: new Date(match.date).toISOString().split("T")[0],
      className: "custom-event",
      backgroundColor: "red", // Couleur pour les matchs précédents
      borderColor: "red",
      extendedProps: match, // Ajouter toutes les données du match
    })),
    ...matchesNext.map((match) => ({
      title: ` ${match.team_name} - ${match.section_name}`,
      date: new Date(match.date).toISOString().split("T")[0],
      className: "custom-event",
      backgroundColor: "green", // Couleur pour les matchs à venir
      borderColor: "green",
      extendedProps: match, // Ajouter toutes les données du match
    })),
  ];

  const handleEventClick = (info: any) => {
    // Récupérer les données étendues de l'événement
    setSelectedEvent(info.event.extendedProps);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick} // Gérer le clic sur un événement
      />

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">
              {NOTRE_EQUIPE} Vs {selectedEvent.team_name}
            </h2>
            <h2 className="text-xl mb-4 text-center">
              {selectedEvent.section_name}
            </h2>
            {selectedEvent.score && (
              <p className="text-gray-700 mb-2">
                <strong>Score :</strong> {selectedEvent.score}
              </p>
            )}
            <p className="text-gray-700 mb-2">
              <strong>Date :</strong>{" "}
              {new Date(selectedEvent.date).toLocaleDateString("fr-FR")}
            </p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

