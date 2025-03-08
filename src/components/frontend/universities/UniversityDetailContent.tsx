
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PartnerUniversityDetail } from '@/types/studyAbroadTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Trophy, BookOpen, Building, GraduationCap } from 'lucide-react';

interface UniversityDetailContentProps {
  university: PartnerUniversityDetail;
}

const UniversityDetailContent: React.FC<UniversityDetailContentProps> = ({ university }) => {
  const { currentLanguage } = useLanguage();
  const [imageIndex, setImageIndex] = useState(0);
  
  const name = currentLanguage === 'en' ? university.name_en : university.name_zh;
  const description = currentLanguage === 'en' 
    ? university.description_en || '' 
    : university.description_zh || '';
  
  const universityImages = university.gallery_images 
    ? [university.featured_image || university.image, ...university.gallery_images] 
    : [university.featured_image || university.image];
  
  const universityTabs = [
    { id: 'highlights', label_en: 'Highlights', label_zh: '亮点', icon: <Trophy className="h-4 w-4 mr-1" /> },
    { id: 'academics', label_en: 'Academics', label_zh: '学术', icon: <BookOpen className="h-4 w-4 mr-1" /> },
    { id: 'facilities', label_en: 'Facilities', label_zh: '设施', icon: <Building className="h-4 w-4 mr-1" /> },
    { id: 'admission', label_en: 'Admission', label_zh: '入学', icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { id: 'gallery', label_en: 'Gallery', label_zh: '图片库', icon: null }
  ];
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="col-span-2">
            {universityImages.length > 1 ? (
              <Carousel 
                className="w-full mb-6" 
                setApi={(api) => {
                  api?.on("select", () => {
                    setImageIndex(api.selectedScrollSnap());
                  });
                }}
              >
                <CarouselContent>
                  {universityImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={img} 
                        alt={`${name} - ${index + 1}`} 
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
                
                <div className="flex justify-center gap-1 mt-2">
                  {universityImages.map((_, index) => (
                    <span 
                      key={index} 
                      className={`inline-block h-2 w-2 rounded-full transition-colors ${
                        index === imageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </Carousel>
            ) : (
              <img 
                src={university.image} 
                alt={name} 
                className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
              />
            )}
            
            <p className="text-gray-700 mb-6">{description}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-semibold mb-3">
              {currentLanguage === 'en' ? 'University Information' : '大学信息'}
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-0.5">
                  {currentLanguage === 'en' ? 'Location' : '地点'}
                </p>
                <p className="font-medium">{currentLanguage === 'en' ? university.location_en : university.location_zh}</p>
              </div>
              
              {university.founded && (
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">
                    {currentLanguage === 'en' ? 'Founded' : '创建于'}
                  </p>
                  <p className="font-medium">{university.founded}</p>
                </div>
              )}
              
              {university.ranking && (
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">
                    {currentLanguage === 'en' ? 'Ranking' : '排名'}
                  </p>
                  <p className="font-medium text-blue-700">{university.ranking}</p>
                </div>
              )}
              
              {university.website && (
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">
                    {currentLanguage === 'en' ? 'Website' : '网站'}
                  </p>
                  <a 
                    href={`https://${university.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {university.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="highlights" className="w-full">
          <TabsList className="mb-8 border-b w-full justify-start bg-transparent h-auto p-0 space-x-4">
            {universityTabs.map(tab => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className="px-3 py-2 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent rounded-none border-transparent bg-transparent text-gray-600 hover:text-blue-700 transition-colors flex items-center"
              >
                {tab.icon}
                {currentLanguage === 'en' ? tab.label_en : tab.label_zh}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="highlights" className="mt-0">
            <div className="prose prose-blue max-w-none">
              {university.highlights_en || university.highlights_zh ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: currentLanguage === 'en' 
                    ? university.highlights_en || '' 
                    : university.highlights_zh || '' 
                }} />
              ) : (
                <p className="text-gray-500">{currentLanguage === 'en' ? 'No highlights available' : '暂无亮点信息'}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="academics" className="mt-0">
            <div className="prose max-w-none">
              {university.academics_en || university.academics_zh ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: currentLanguage === 'en' 
                    ? university.academics_en || '' 
                    : university.academics_zh || '' 
                }} />
              ) : (
                <p className="text-gray-500">{currentLanguage === 'en' ? 'Academic information not available.' : '学术信息暂不可用。'}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="facilities" className="mt-0">
            <div className="prose max-w-none">
              {university.facilities_en || university.facilities_zh ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: currentLanguage === 'en' 
                    ? university.facilities_en || '' 
                    : university.facilities_zh || '' 
                }} />
              ) : (
                <p className="text-gray-500">{currentLanguage === 'en' ? 'Facilities information not available' : '设施信息暂不可用'}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="admission" className="mt-0">
            <div className="prose max-w-none">
              {university.admission_en || university.admission_zh ? (
                <div dangerouslySetInnerHTML={{ 
                  __html: currentLanguage === 'en' 
                    ? university.admission_en || '' 
                    : university.admission_zh || '' 
                }} />
              ) : (
                <p className="text-gray-500">{currentLanguage === 'en' ? 'Admission information not available' : '入学信息暂不可用'}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-0">
            {universityImages.length > 1 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {universityImages.map((img, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-md overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{currentLanguage === 'en' ? 'No additional images available' : '暂无额外图片'}</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UniversityDetailContent;
