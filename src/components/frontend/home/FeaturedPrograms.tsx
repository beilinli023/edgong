import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// 程序数据类型接口
interface ProgramData {
  id: string;
  title_en: string;
  title_zh: string;
  description_en: string;
  description_zh: string;
  image: string;
  location_en: string;
  location_zh: string;
  duration: string;
  duration_en?: string;
  duration_zh?: string;
  country: string;
  tags: Array<{
    id: string;
    name_en: string;
    name_zh: string;
  }>;
}

interface FeaturedProgramsProps {
  currentLanguage: 'en' | 'zh';
}

const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ currentLanguage }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [programsData, setProgramsData] = useState<ProgramData[]>([]);
  
  // 固定使用Program1, Program2, Program3数据
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // 获取三个特定程序的数据
        const program1Response = await fetch('/content/programs/program1.json');
        const program2Response = await fetch('/content/programs/program2.json');
        const program3Response = await fetch('/content/programs/program3.json');
        
        // 解析JSON数据
        const program1 = await program1Response.json();
        const program2 = await program2Response.json();
        const program3 = await program3Response.json();
        
        // 设置程序数据
        setProgramsData([program1, program2, program3]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching program data:', error);
        setIsLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);
  
  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }
  
  // 介绍文本数据
  const introData = {
    subtitle: currentLanguage === 'en' 
      ? "Every EdGoing program is a carefully crafted adventure, designed to go beyond sightseeing—challenging assumptions, building empathy, and empowering students to see the world, and themselves, in new ways."
      : "每一个 EdGoing 项目都是精心打造的探险之旅，旨在超越简单的观光——挑战固有观念、培养共情能力，并赋予学生以全新的方式看待世界和自我。",
    title: currentLanguage === 'en'
      ? "Study Abroad Reimagined: journeys that inspire, connect, and transform."
      : "留学新视角：激发灵感、建立联系、实现蜕变的旅程。",
    linkText: currentLanguage === 'en' ? "View All Programs" : "查看所有项目",
    linkUrl: "/programs"
  };
  
  return renderContent(programsData, introData);

  // 渲染内容的辅助函数
  function renderContent(programsData: ProgramData[], introData: {
    subtitle: string;
    title: string;
    linkText: string;
    linkUrl: string;
  }) {
    // 确保我们始终有三个项目
    const displayPrograms = programsData.slice(0, 3);

    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-sm mb-2">{introData.subtitle}</p>
              <div>
                <Button variant="link" className="text-blue-600 p-0 h-auto" asChild>
                  <Link to={introData.linkUrl}>
                    {introData.linkText} →
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                {introData.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPrograms.map((program) => (
              <div key={program.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={currentLanguage === 'en' ? program.title_en : program.title_zh} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    {currentLanguage === 'en' ? program.title_en : program.title_zh}
                  </h3>
                </div>
                <div className="p-4 pt-0 mt-auto bg-gray-50 text-sm text-gray-500 flex items-center justify-between">
                  <span>{currentLanguage === 'en' ? program.location_en : program.location_zh}</span>
                  <span>
                    {currentLanguage === 'en' 
                      ? (program.duration_en || program.duration) 
                      : (program.duration_zh || program.duration)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default FeaturedPrograms;
