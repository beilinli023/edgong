import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// 选项卡配置
const TAB_CONFIG = [
  { id: 'overview', label_en: 'Overview', label_zh: '概述' },
  { id: 'itinerary', label_en: 'Itinerary', label_zh: '行程' },
  { id: 'requirements', label_en: 'Additional Information', label_zh: '附加信息' },
  { id: 'gallery', label_en: 'Gallery', label_zh: '图片库' }
];

interface ProgramContentTabsProps {
  program: Program;
}

const ProgramContentTabs: React.FC<ProgramContentTabsProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  // 从程序中获取当前语言的内容
  const getContent = (enContent?: string, zhContent?: string): string => {
    return currentLanguage === 'en' ? (enContent || '') : (zhContent || '');
  };
  
  const description = getContent(program.description_en, program.description_zh);
  const highlights = getContent(program.highlights_en, program.highlights_zh);
  const itinerary = getContent(program.itinerary_en, program.itinerary_zh);
  const features = getContent(program.features_en, program.features_zh);
  const schoolInfo = getContent(program.school_info_en, program.school_info_zh);
  
  // 定义文本配置对象 - 避免硬编码
  const texts = {
    programOverview: currentLanguage === 'en' ? 'Program Overview' : '项目概述',
    programHighlights: currentLanguage === 'en' ? 'Program Highlights' : '项目亮点',
    programFeatures: currentLanguage === 'en' ? 'Program Features' : '项目特色',
    descriptionNotFound: currentLanguage === 'en' ? 'Description not found' : '描述内容未找到',
    detailedItinerary: currentLanguage === 'en' ? 'Detailed itinerary will be provided upon registration.' : '详细行程将在注册后提供。',
    programRequirements: currentLanguage === 'en' ? 'Program requirements and prerequisites information will be provided upon inquiry.' : '项目要求和先决条件信息将在查询后提供。',
    noGalleryImages: currentLanguage === 'en' ? 'No gallery images available for this program.' : '该项目暂无图片。'
  };

  // 清理亮点内容，移除"项目特色"部分
  const cleanHighlights = (content: string): string => {
    if (!content) return '';
    
    // 检查内容是否包含"项目特色"
    const featuresMarker = currentLanguage === 'en' ? 'Program Features:' : '项目特色：';
    
    if (content.includes(featuresMarker)) {
      // 分割内容，获取"项目特色"之前的部分
      const parts = content.split(featuresMarker);
      return parts[0].trim();
    }
    
    return content;
  };

  // 格式化带圆点的列表项
  const formatBulletPoints = (content: string) => {
    if (!content) return [];
    
    // 根据换行符分割内容为行
    let lines = content.split('\n').filter(line => line.trim() !== '');
    
    // 如果是按双换行符分隔的段落，则改为单行处理
    if (lines.length === 1 && content.includes('\n\n')) {
      lines = content.split('\n\n').filter(line => line.trim() !== '');
    }
    
    return lines.map(line => {
      // 处理冒号分隔的内容 (标题: 描述)
      const parts = line.split(/[:：]/);
      if (parts.length > 1) {
        const title = parts[0].trim();
        const description = parts.slice(1).join('：').trim();
        
        return {
          title,
          description,
          hasTitle: true
        };
      }
      
      // 处理普通行
      return {
        title: '',
        description: line,
        hasTitle: false
      };
    });
  };

  // 渲染项目详情
  const renderProgramDetail = () => {
    // 清理亮点内容，移除其中的项目特色部分
    const cleanedHighlights = cleanHighlights(highlights);
    
    return (
      <div className="space-y-8">
        {/* 项目概述部分 */}
        <div>
          <div className="text-2xl font-bold mb-4">{texts.programOverview}</div>
          
          <div className="space-y-4">
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        
        {/* 项目亮点部分 */}
        <div>
          <div className="text-2xl font-bold mb-4">{texts.programHighlights}</div>
          
          <div className="space-y-2">
            {formatBulletPoints(cleanedHighlights).map((item, index) => (
              <div key={index} className="flex mb-4">
                <span className="mr-2">•</span>
                <div>
                  {item.hasTitle ? (
                    <>
                      <span className="font-bold">{item.title}：</span>
                      {item.description}
                    </>
                  ) : (
                    item.description
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 项目特色部分 */}
        <div>
          <div className="text-2xl font-bold mb-4">{texts.programFeatures}</div>
          
          <div className="space-y-2">
            {formatBulletPoints(features).map((item, index) => (
              <div key={index} className="flex mb-4">
                <span className="mr-2">•</span>
                <div>
                  {item.hasTitle ? (
                    <>
                      <span className="font-bold">{item.title}：</span>
                      {item.description}
                    </>
                  ) : (
                    item.description
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b mb-6">
        {TAB_CONFIG.map(tab => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {currentLanguage === 'en' ? tab.label_en : tab.label_zh}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        {renderProgramDetail()}
      </TabsContent>
      
      <TabsContent value="itinerary" className="mt-0">
        <div className="space-y-4">
          {itinerary ? (
            <div className="space-y-4">
              {itinerary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{texts.detailedItinerary}</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="requirements" className="mt-0">
        <div className="space-y-4">
          {features ? (
            <div>
              <div className="space-y-4">
                {/* 内容已在overview标签页的renderProgramDetail方法中显示 */}
                <p className="text-gray-600 italic">
                  {currentLanguage === 'en' 
                    ? 'See the Overview tab for program features and details.' 
                    : '请查看"概述"标签页获取项目特色和详情。'}
                </p>
              </div>
              
              {schoolInfo && (
                <div className="mt-8 space-y-4">
                  {schoolInfo.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">{texts.programRequirements}</p>
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
            <p className="text-gray-600">{texts.noGalleryImages}</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProgramContentTabs;
