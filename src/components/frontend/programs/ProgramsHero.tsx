
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const ProgramsHero: React.FC = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="relative w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/023aa03a-5bbe-40b1-b72a-85dd082c5c50.png')" }}>
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl font-bold mb-3">
          {currentLanguage === 'en' ? 'Explore Our Programs' : '探索我们的项目'}
        </h1>
        <p className="max-w-2xl">
          {currentLanguage === 'en' 
            ? 'Discover a world of learning opportunities through our diverse range of educational programs.' 
            : '通过我们多样化的教育项目探索学习机会的世界。'}
        </p>
      </div>
    </div>
  );
};

export default ProgramsHero;
