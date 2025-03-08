
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';

interface ProgramDetailHeroProps {
  program: Program;
}

const ProgramDetailHero: React.FC<ProgramDetailHeroProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  const title = currentLanguage === 'en' ? program.title_en : program.title_zh;
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  const tags = program.tags.map(tag => currentLanguage === 'en' ? tag.name_en : tag.name_zh);

  return (
    <div className="relative h-[300px] md:h-[400px]">
      <img 
        src={program.image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-blue-500 text-white px-3 py-1 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {location}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {program.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailHero;
