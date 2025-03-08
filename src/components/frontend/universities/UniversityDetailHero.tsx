
import React from 'react';
import { MapPin, GraduationCap, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { PartnerUniversityDetail } from '@/types/studyAbroadTypes';

interface UniversityDetailHeroProps {
  university: PartnerUniversityDetail;
}

const UniversityDetailHero: React.FC<UniversityDetailHeroProps> = ({ university }) => {
  const { currentLanguage } = useLanguage();
  
  const name = currentLanguage === 'en' ? university.name_en : university.name_zh;
  const location = currentLanguage === 'en' ? university.location_en : university.location_zh;
  const programs = currentLanguage === 'en' ? university.programs_en : university.programs_zh;
  const visitText = currentLanguage === 'en' ? 'Visit Official Website' : '访问官方网站';
  
  return (
    <div 
      className="relative bg-cover bg-center py-16 md:py-32 text-white"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${university.featured_image || university.image})` 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{name}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span>{university.founded ? `${currentLanguage === 'en' ? 'Est. ' : '创建于 '}${university.founded}` : ''}</span>
            </div>
          </div>
          
          <p className="text-lg mb-8 text-white/90">{programs}</p>
          
          {university.website && (
            <Button 
              className="bg-white text-blue-900 hover:bg-blue-50 flex items-center gap-2"
              onClick={() => window.open(`https://${university.website}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              {visitText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailHero;
