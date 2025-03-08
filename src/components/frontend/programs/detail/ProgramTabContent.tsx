
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { TabsContent } from '@/components/ui/tabs';

interface ProgramTabContentProps {
  program: Program;
  programImages: string[];
}

const ProgramTabContent: React.FC<ProgramTabContentProps> = ({ program, programImages }) => {
  const { currentLanguage } = useLanguage();
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  
  return (
    <>
      <TabsContent value="highlights" className="mt-0">
        <div className="prose prose-blue max-w-none">
          {program.highlights_en || program.highlights_zh ? (
            <div dangerouslySetInnerHTML={{ 
              __html: currentLanguage === 'en' 
                ? program.highlights_en || '' 
                : program.highlights_zh || '' 
            }} />
          ) : (
            <p className="text-gray-500">{currentLanguage === 'en' ? 'No highlights available' : '暂无亮点信息'}</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="itinerary" className="mt-0">
        <div className="prose max-w-none">
          {program.itinerary_en || program.itinerary_zh ? (
            <div dangerouslySetInnerHTML={{ 
              __html: currentLanguage === 'en' 
                ? program.itinerary_en || '' 
                : program.itinerary_zh || '' 
            }} />
          ) : (
            <p className="text-gray-500">{currentLanguage === 'en' ? 'Detailed itinerary will be provided upon registration.' : '详细行程将在注册后提供。'}</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="features" className="mt-0">
        <div className="prose max-w-none">
          {program.features_en || program.features_zh ? (
            <div dangerouslySetInnerHTML={{ 
              __html: currentLanguage === 'en' 
                ? program.features_en || '' 
                : program.features_zh || '' 
            }} />
          ) : (
            <p className="text-gray-500">{currentLanguage === 'en' ? 'Features information not available' : '特色信息不可用'}</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="info" className="mt-0">
        <div className="prose max-w-none">
          {program.information_en || program.information_zh ? (
            <div dangerouslySetInnerHTML={{ 
              __html: currentLanguage === 'en' 
                ? program.information_en || '' 
                : program.information_zh || '' 
            }} />
          ) : (
            <div>
              <h3>{currentLanguage === 'en' ? 'Program Details' : '项目详情'}</h3>
              <ul>
                <li>{currentLanguage === 'en' ? `Duration: ${program.duration || 'N/A'}` : `时长: ${program.duration || '暂无'}`}</li>
                <li>{currentLanguage === 'en' ? `Location: ${location || 'N/A'}` : `地点: ${location || '暂无'}`}</li>
                {program.price && <li>{currentLanguage === 'en' ? `Price: ${program.price}` : `价格: ${program.price}`}</li>}
              </ul>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="gallery" className="mt-0">
        {programImages.length > 1 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programImages.map((img, index) => (
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
    </>
  );
};

export default ProgramTabContent;
