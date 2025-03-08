import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFrontendFeaturedPrograms } from '@/hooks/useFrontendFeaturedPrograms';
import { Link } from 'react-router-dom';

interface FeaturedProgramsProps {
  currentLanguage: 'en' | 'zh';
}

const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ currentLanguage }) => {
  const { programs, intro, isLoading } = useFrontendFeaturedPrograms(currentLanguage);

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // 如果没有数据，显示一个回退版本
  if (!programs || programs.length === 0) {
    const fallbackPrograms = [
      { 
        id: 1, 
        image: "/placeholder.svg", 
        title: currentLanguage === 'en' ? "Youth Art Advanced Program" : "青少年艺术高级课程",
        description: currentLanguage === 'en' 
          ? "In collaboration with Mass Academy, perfectly balanced between digital technology, creativity and imagination."
          : "与大众学院合作，在数字技术、创造力和想象力之间完美平衡。",
        location: currentLanguage === 'en' ? "USA" : "美国",
        duration: "7 weeks",
        country: "USA"
      },
      { 
        id: 2, 
        image: "/placeholder.svg", 
        title: currentLanguage === 'en' ? "Japan Tech Innovation Tour" : "日本科技创新之旅",
        description: currentLanguage === 'en'
          ? "Explore Japan's advanced technology and experience the perfect blend between innovation and traditional culture."
          : "探索日本的先进技术，体验创新与传统文化之间的完美融合。",
        location: currentLanguage === 'en' ? "Japan" : "日本",
        duration: "14 days",
        country: "Japan"
      },
      { 
        id: 3, 
        image: "/placeholder.svg", 
        title: currentLanguage === 'en' ? "UK Business Management Experience" : "英国商业管理体验",
        description: currentLanguage === 'en'
          ? "Gain direct insights into UK business to learn and understand organizational strategy and operational excellence."
          : "直接了解英国商业，学习和理解组织战略和卓越运营。",
        location: currentLanguage === 'en' ? "UK" : "英国",
        duration: "3 weeks",
        country: "UK"
      }
    ];

    const fallbackIntro = {
      subtitle: currentLanguage === 'en' 
        ? "Every EdGoing program is a carefully crafted adventure, designed to go beyond sightseeing—challenging assumptions, building empathy, and empowering students to see the world, and themselves, in new ways. Through these transformative experiences, we open minds, build bridges, and create memories that last a lifetime."
        : "每一个 EdGoing 项目都是精心打造的探险之旅，旨在超越简单的观光——挑战固有观念、培养共情能力，并赋予学生以全新的方式看待世界和自我。通过这些变革性的体验，我们开拓思维、搭建桥梁，并创造终生难忘的回忆。",
      title: currentLanguage === 'en'
        ? "Study Abroad Reimagined: journeys that inspire, connect, and transform."
        : "留学新视角：激发灵感、建立联系、实现蜕变的旅程。",
      linkText: currentLanguage === 'en' ? "View All Programs" : "查看所有项目",
      linkUrl: "/programs"
    };

    return renderContent(fallbackPrograms, fallbackIntro);
  }

  // 添加新的intro文本
  if (intro) {
    intro.subtitle = currentLanguage === 'en' 
      ? "Every EdGoing program is a carefully crafted adventure, designed to go beyond sightseeing—challenging assumptions, building empathy, and empowering students to see the world, and themselves, in new ways. Through these transformative experiences, we open minds, build bridges, and create memories that last a lifetime."
      : "每一个 EdGoing 项目都是精心打造的探险之旅，旨在超越简单的观光——挑战固有观念、培养共情能力，并赋予学生以全新的方式看待世界和自我。通过这些变革性的体验，我们开拓思维、搭建桥梁，并创造终生难忘的回忆。";
    
    intro.title = currentLanguage === 'en'
      ? "Study Abroad Reimagined: journeys that inspire, connect, and transform."
      : "留学新视角：激发灵感、建立联系、实现蜕变的旅程。";
  }

  return renderContent(programs, intro);

  // 渲染内容的辅助函数
  function renderContent(programsData: any[], introData: any) {
    // 确保我们始终有三个项目
    const displayPrograms = programsData.slice(0, 3);
    
    // 如果不够三个，添加占位项目
    while (displayPrograms.length < 3) {
      displayPrograms.push({
        id: `placeholder-${displayPrograms.length + 1}`,
        image: "/placeholder.svg",
        title: currentLanguage === 'en' ? "New Program Coming Soon" : "新项目即将推出",
        description: currentLanguage === 'en' 
          ? "Stay tuned for more exciting educational opportunities."
          : "敬请期待更多精彩的教育机会。",
        location: "",
        duration: "",
        country: ""
      });
    }

    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
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
                    alt={program.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                </div>
                <div className="p-4 pt-0 mt-auto bg-gray-50 text-sm text-gray-500 flex items-center justify-between">
                  <span>{program.location}</span>
                  <span>{program.duration}</span>
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
