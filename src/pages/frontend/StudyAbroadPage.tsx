
import React from 'react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useFrontendStudyAbroad } from '@/hooks/useFrontendStudyAbroad';
import PartnerUniversitiesSection from '@/components/frontend/study-abroad/PartnerUniversitiesSection';
import BenefitsSection from '@/components/frontend/study-abroad/BenefitsSection';

const StudyAbroadPage = () => {
  const { currentLanguage } = useLanguage();
  const { content, isLoading, error } = useFrontendStudyAbroad(currentLanguage as 'en' | 'zh');
  
  const title = content?.title_en && content?.title_zh 
    ? (currentLanguage === 'en' ? content.title_en : content.title_zh)
    : (currentLanguage === 'en' ? 'Study Abroad Programs' : '留学项目');
    
  const description = content?.description_en && content?.description_zh
    ? (currentLanguage === 'en' ? content.description_en : content.description_zh)
    : '';
  
  if (isLoading) {
    return (
      <FrontendLayout>
        <div className="container mx-auto py-20 text-center">
          <div className="h-24 w-24 rounded-full border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">
            {currentLanguage === 'en' ? 'Loading content...' : '正在加载内容...'}
          </p>
        </div>
      </FrontendLayout>
    );
  }
  
  if (error) {
    return (
      <FrontendLayout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {currentLanguage === 'en' ? 'Error Loading Content' : '加载内容出错'}
          </h1>
          <p className="text-gray-600">
            {currentLanguage === 'en' 
              ? 'Sorry, we couldn\'t load the study abroad information.' 
              : '抱歉，我们无法加载留学信息。'
            }
          </p>
        </div>
      </FrontendLayout>
    );
  }
  
  if (!content) {
    return (
      <FrontendLayout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {currentLanguage === 'en' ? 'No Content Available' : '无可用内容'}
          </h1>
          <p className="text-gray-600">
            {currentLanguage === 'en' 
              ? 'Study abroad program information is currently unavailable.' 
              : '留学项目信息当前不可用。'
            }
          </p>
        </div>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <div className="relative py-20 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">{description}</p>
        </div>
      </div>
      
      {/* Benefits Section */}
      <BenefitsSection benefits={content.benefits} />
      
      {/* Partner Universities Section */}
      <PartnerUniversitiesSection universities={content.universities} />
      
      {/* Call to Action Section - Could be implemented separately */}
    </FrontendLayout>
  );
};

export default StudyAbroadPage;
