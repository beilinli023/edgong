
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const ProgramsHero: React.FC = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="relative pt-32 pb-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div className="container-fluid w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          {currentLanguage === 'en' ? 'Explore Our Programs' : '探索我们的项目'}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 text-center">
          {currentLanguage === 'en' 
            ? 'Discover a world of learning opportunities through our diverse range of educational programs.' 
            : '通过我们多样化的教育项目探索学习机会的世界。'}
        </p>
      </div>
    </div>
  );
};

export default ProgramsHero;
