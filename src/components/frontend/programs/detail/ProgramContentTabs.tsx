
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProgramContentTabsProps {
  program: Program;
}

const ProgramContentTabs: React.FC<ProgramContentTabsProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  const description = currentLanguage === 'en' ? program.description_en || "" : program.description_zh || "";
  const highlights = currentLanguage === 'en' ? program.highlights_en || "" : program.highlights_zh || "";
  const itinerary = currentLanguage === 'en' ? program.itinerary_en || "" : program.itinerary_zh || "";
  const features = currentLanguage === 'en' ? program.features_en || "" : program.features_zh || "";

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b mb-6">
        <TabsTrigger value="overview">
          {currentLanguage === 'en' ? 'Overview' : '概述'}
        </TabsTrigger>
        <TabsTrigger value="itinerary">
          {currentLanguage === 'en' ? 'Itinerary' : '行程'}
        </TabsTrigger>
        <TabsTrigger value="requirements">
          {currentLanguage === 'en' ? 'Requirements' : '要求'}
        </TabsTrigger>
        <TabsTrigger value="gallery">
          {currentLanguage === 'en' ? 'Gallery' : '图片库'}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-0">
        <div className="prose max-w-none">
          <p className="text-lg mb-4">{description}</p>
          <h3 className="text-xl font-bold mt-6 mb-3">
            {currentLanguage === 'en' ? 'Program Highlights' : '项目亮点'}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: highlights }} />
        </div>
      </TabsContent>
      <TabsContent value="itinerary" className="mt-0">
        <div className="space-y-4">
          {itinerary ? (
            <div dangerouslySetInnerHTML={{ __html: itinerary }} />
          ) : (
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'Detailed itinerary will be provided upon registration.' 
                : '详细行程将在注册后提供。'}
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="requirements" className="mt-0">
        <div className="space-y-4">
          {features ? (
            <div dangerouslySetInnerHTML={{ __html: features }} />
          ) : (
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'Program requirements and prerequisites information will be provided upon inquiry.' 
                : '项目要求和先决条件信息将在查询后提供。'}
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="gallery" className="mt-0">
        <div className="space-y-4">
          {program.gallery_images && program.gallery_images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {program.gallery_images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden h-48">
                  <img 
                    src={image} 
                    alt={`Program image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? 'No gallery images available for this program.' 
                : '该项目暂无图片。'}
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProgramContentTabs;
