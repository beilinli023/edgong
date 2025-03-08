
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';

interface ProgramSidebarProps {
  program: Program;
}

const ProgramSidebar: React.FC<ProgramSidebarProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  const gradeLevels = program.grade_levels && program.grade_levels.length > 0 
    ? program.grade_levels.join(', ') 
    : currentLanguage === 'en' ? 'All grades' : '所有年级';
    
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit">
      <h3 className="text-xl font-semibold mb-3">
        {currentLanguage === 'en' ? 'Program Details' : '项目详情'}
      </h3>
      
      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-500 mb-0.5">
            {currentLanguage === 'en' ? 'Location' : '地点'}
          </p>
          <p className="font-medium">{location}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-0.5">
            {currentLanguage === 'en' ? 'Duration' : '时长'}
          </p>
          <p className="font-medium">{program.duration || 'N/A'}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-0.5">
            {currentLanguage === 'en' ? 'Grade Levels' : '适用年级'}
          </p>
          <p className="font-medium">{gradeLevels}</p>
        </div>
        
        {program.price && (
          <div>
            <p className="text-sm text-gray-500 mb-0.5">
              {currentLanguage === 'en' ? 'Price' : '价格'}
            </p>
            <p className="font-medium text-blue-700">{program.price}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramSidebar;
