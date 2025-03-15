import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PartnerUniversityDetail } from '@/types/studyAbroadTypes';

interface UniversityDetailHeroProps {
  university: PartnerUniversityDetail;
}

const UniversityDetailHero: React.FC<UniversityDetailHeroProps> = ({ university }) => {
  const { currentLanguage } = useLanguage();
  
  const name = currentLanguage === 'en' ? university.name_en : university.name_zh;
  const location = currentLanguage === 'en' ? university.location_en : university.location_zh;
  
  return (
    <div 
      className="relative bg-cover bg-center py-16 md:py-32 text-white"
      style={{ 
        backgroundImage: `url(/Edgoing/stuy%20board/malaysia/Picture-1.png)` 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center pt-16 md:pt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{name}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 justify-center">
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailHero;
