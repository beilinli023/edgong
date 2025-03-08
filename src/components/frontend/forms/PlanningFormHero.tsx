
import React from "react";

interface PlanningFormHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const PlanningFormHero: React.FC<PlanningFormHeroProps> = ({ 
  title, 
  subtitle, 
  backgroundImage 
}) => {
  return (
    <div 
      className="bg-gray-500 bg-opacity-70 bg-blend-overlay py-16 text-white text-center bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default PlanningFormHero;
