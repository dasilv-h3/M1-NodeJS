import React from 'react';

interface CardProps {
  title: string;
  created_at: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, created_at, description }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(created_at).toLocaleDateString("fr-FR")}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
