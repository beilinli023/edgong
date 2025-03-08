
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProgramInfoSidebarProps {
  program: Program;
}

const ProgramInfoSidebar: React.FC<ProgramInfoSidebarProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  const tags = program.tags.map(tag => currentLanguage === 'en' ? tag.name_en : tag.name_zh);

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">
        {currentLanguage === 'en' ? 'Program Information' : '项目信息'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">
            {currentLanguage === 'en' ? 'Duration' : '时长'}
          </h4>
          <p className="mt-1 text-gray-600">{program.duration}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">
            {currentLanguage === 'en' ? 'Grade Levels' : '年级水平'}
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {program.grade_levels.map((level, idx) => (
              <span 
                key={idx} 
                className="bg-gray-100 text-gray-800 px-3 py-1 text-sm rounded-full"
              >
                {level}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700">
            {currentLanguage === 'en' ? 'Program Type' : '项目类型'}
          </h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-blue-50 text-blue-700 px-3 py-1 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            {currentLanguage === 'en' ? 'Request Information' : '请求更多信息'}
          </Button>
          <Link to="/start-planning">
            <Button variant="outline" className="w-full mt-3">
              {currentLanguage === 'en' ? 'Apply Now' : '立即申请'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ProgramInfoSidebar;
