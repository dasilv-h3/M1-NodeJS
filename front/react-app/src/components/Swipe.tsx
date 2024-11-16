import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import des modules spécifiques


import Card from "./Card"; // Assurez-vous que le composant Card est bien importé
import { Link } from "react-router-dom";

interface SwipeProps {
  news: {
    id: number;
    title: string;
    created_at: string;
    description: string;
  }[];
}

const Swipe: React.FC<SwipeProps> = ({ news }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="my-6"
    >
    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/actualite">
      {news.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            created_at={item.created_at}
            description={item.description}
          />
        ))}
        </Link>
    </div>
  </Swiper>  
  );
};

export default Swipe;
