import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MapPin, Clock, Calendar, BookOpen, Award, Globe } from 'lucide-react';

interface ProgramDetailHeroProps {
  program: Program;
}

const ProgramDetailHero: React.FC<ProgramDetailHeroProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  const title = currentLanguage === 'en' ? program.title_en : program.title_zh;
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  const overview = currentLanguage === 'en' ? program.overview_en || '' : program.overview_zh || '';
  const programType = currentLanguage === 'en' ? program.program_type_en || '' : program.program_type_zh || '';
  const destination = currentLanguage === 'en' ? program.destination_en || location : program.destination_zh || location;
  const gradeLevel = currentLanguage === 'en' ? program.grade_level_en : program.grade_level_zh;
  
  // 使用特定语言的时长字段
  const duration = currentLanguage === 'en' 
    ? program.duration_en || program.duration 
    : program.duration_zh || program.duration;
  
  // 图片轮播状态
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // 确保图片数组可用，使用正确的gallery_images字段
  const galleryImages = useMemo(() => {
    // 使用gallery_images字段
    if (program.gallery_images && program.gallery_images.length > 0) {
      return program.gallery_images;
    }
    
    // 如果gallery_images不存在，尝试使用image字段
    if (program.image) {
      return [program.image];
    }
    
    // 兜底方案：使用默认图片
    return ['/images/programs/default.jpg'];
  }, [program]);
  
  // 自动轮播
  useEffect(() => {
    if (isHovering || galleryImages.length <= 1) return; // 如果用户在悬停或只有一张图片，则不自动轮播
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 每5秒切换一次
    
    return () => clearInterval(interval);
  }, [galleryImages.length, isHovering]);
  
  // 切换到下一张图片
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [galleryImages.length]);
  
  // 切换到上一张图片
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  }, [galleryImages.length]);
  
  return (
    <section className="program-detail-hero">
      {/* 蓝色背景标题区 */}
      <div className="bg-blue-600 text-white pt-24 pb-8">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* 标题和标签 */}
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
              
              {/* 类型标签 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {programType && (
                  <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {programType}
                  </span>
                )}
              </div>
              
              {/* 项目ID，如果有的话 */}
              <div className="text-blue-100 text-sm">
                {program.program_id && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    {program.program_id}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 主体内容区域 - 使用两栏布局 */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 左侧栏 - 轮播图 */}
            <div className="md:w-2/3">
              <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-lg">
                {/* 轮播图显示 */}
                {galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ))}
                
                {/* 左右箭头 - 只在有多张图片时显示 */}
                {galleryImages.length > 1 && (
                  <div 
                    className="absolute inset-0 flex items-center justify-between p-4"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <button 
                      onClick={prevImage}
                      className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2 transition-all transform hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2 transition-all transform hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                )}
                
                {/* 图片指示器 - 只在有多张图片时显示 */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white w-4' 
                            : 'bg-white bg-opacity-50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* 项目概述 */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
                  {currentLanguage === 'en' ? 'Program Overview' : '项目概述'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="leading-relaxed">{overview}</p>
                </div>
              </div>
            </div>
            
            {/* 右侧栏 - 项目信息 */}
            <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg h-fit">
              {/* 添加项目信息标题 */}
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                {currentLanguage === 'en' ? 'Program Information' : '项目信息'}
              </h2>
              <div className="space-y-4">
                {/* 地点信息 */}
                {destination && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-700">
                        {currentLanguage === 'en' ? 'Location' : '地点'}
                      </h3>
                      <p className="text-gray-600">{destination}</p>
                    </div>
                  </div>
                )}
                
                {/* 时长信息 */}
                {duration && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-700">
                        {currentLanguage === 'en' ? 'Duration' : '时长'}
                      </h3>
                      <p className="text-gray-600">{duration}</p>
                    </div>
                  </div>
                )}
                
                {/* 年级水平 */}
                {gradeLevel && (
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-700">
                        {currentLanguage === 'en' ? 'Grade Level' : '年级水平'}
                      </h3>
                      <p className="text-gray-600">{gradeLevel}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetailHero;
