
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
    <div className="relative pt-32 pb-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div className="container-fluid w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-center">{subtitle}</p>
      </div>
    </div>
  );
};

export default PlanningFormHero;
