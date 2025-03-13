import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 选项卡配置
const TAB_CONFIG = [
  {
    id: 'highlights',
    label_en: 'Highlights',
    label_zh: '项目亮点'
  },
  {
    id: 'features',
    label_en: 'Features',
    label_zh: '项目特色'
  },
  {
    id: 'itinerary',
    label_en: 'Itinerary',
    label_zh: '行程安排'
  },
  {
    id: 'other',
    label_en: 'Other Information',
    label_zh: '额外信息'
  }
];

interface ProgramContentTabsProps {
  program: Program;
}

const ProgramContentTabs: React.FC<ProgramContentTabsProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  // 根据当前语言获取对应内容
  const getLocalizedContent = (key: string): string => {
    const contentKey = `${key}_${currentLanguage === 'en' ? 'en' : 'zh'}` as keyof Program;
    const content = program[contentKey];
    return typeof content === 'string' ? content : '';
  };
  
  // 处理Unicode转义序列
  const decodeUnicodeEscapes = (text: string): string => {
    // 处理形如 u2022 的Unicode转义序列（没有前导反斜杠）
    return text.replace(/u([0-9a-fA-F]{4})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    });
  };
  
  // 处理内容的格式化
  const formatContent = (text: string): JSX.Element[] => {
    if (!text || text.trim() === '') {
      return [
        <p key="empty" className="text-gray-500 italic">
          {currentLanguage === 'en' 
            ? 'No information available.' 
            : '暂无相关信息。'
          }
        </p>
      ];
    }
    
    // 处理Unicode转义序列
    text = decodeUnicodeEscapes(text);
    
    // 分割文本为段落
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map((paragraph, idx) => {
      // 检查是否为标题（以 ## 开头）
      if (paragraph.startsWith('##')) {
        const level = paragraph.match(/^#+/)[0].length;
        const heading = paragraph.replace(/^#+\s*/, '').trim();
        const headingClass = level === 2 ? "text-xl mt-8 mb-4 text-gray-800" :
                           level === 3 ? "text-lg mt-6 mb-3 text-gray-800" :
                           "text-base mt-4 mb-2 text-gray-800";
        
        return (
          <h3 key={`heading-${idx}`} className={headingClass}>
            {heading}
          </h3>
        );
      }
      
      // 检查是否为带标题的段落（包含冒号的行）
      if (paragraph.includes(':')) {
        const [title, ...content] = paragraph.split(':');
        return (
          <div key={`section-${idx}`} className="mb-4">
            <h4 className="text-gray-800 mb-2">{title.trim()}</h4>
            <p className="text-gray-700 leading-relaxed">
              {content.join(':').trim()}
            </p>
          </div>
        );
      }
      
      // 检查是否为列表项（以 - 或 * 或 • 开头）
      if (paragraph.match(/^[-*•]\s/m)) {
        const items = paragraph.split('\n')
          .filter(line => line.trim())
          .map(line => line.replace(/^[-*•]\s/, '').trim());
        
        return (
          <div key={`list-${idx}`} className="mb-6">
            <ul className="space-y-3">
              {items.map((item, itemIdx) => {
                // 检查列表项是否包含子标题（冒号分隔）
                if (item.includes(':')) {
                  const [subtitle, ...itemContent] = item.split(':');
                  return (
                    <li key={itemIdx} className="flex">
                      <span className="text-gray-800 mr-2">•</span>
                      <div>
                        <span className="text-gray-800">{subtitle.trim()}：</span>
                        <span className="text-gray-700">{itemContent.join(':').trim()}</span>
                      </div>
                    </li>
                  );
                }
                
                // 普通列表项
                return (
                  <li key={itemIdx} className="flex">
                    <span className="text-gray-800 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }
      
      // 特殊处理行程安排部分 - 每个时间点单独一行
      if (paragraph.match(/\d{2}:\d{2}/) && paragraph.includes(':')) {
        // 将时间和活动分成单独的行
        const lines = paragraph.split('\n').filter(line => line.trim());
        
        return (
          <div key={`itinerary-${idx}`} className="mb-6">
            {lines.map((line, lineIdx) => {
              // 检查是否为时间点行
              if (line.match(/\d{2}:\d{2}/) && line.includes(':')) {
                const [time, ...activity] = line.split(':');
                return (
                  <div key={`time-${lineIdx}`} className="flex mb-3">
                    <span className="text-gray-800 mr-2">•</span>
                    <div>
                      <span className="text-gray-800">{time.trim()}: </span>
                      <span className="text-gray-700">{activity.join(':').trim()}</span>
                    </div>
                  </div>
                );
              }
              
              // 其他行
              return (
                <p key={`line-${lineIdx}`} className="mb-2 text-gray-700">
                  {line}
                </p>
              );
            })}
          </div>
        );
      }
      
      // 检查是否为列表项（以句号或冒号结尾）
      return (
        <div key={`para-${idx}`}>
          {/* 检查是否可能是列表内容（包含多个短句子，每个句子以中文句号、英文句号或冒号结尾） */}
          {paragraph.includes('。') || paragraph.includes('：') || paragraph.includes(':') || paragraph.includes('.') ? (
            <ul className="space-y-3">
              {paragraph.split(/[。.]/)
                .filter(line => line.trim())
                .map((line, lineIdx) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;
                  
                  // 检查是否包含冒号（中文或英文）
                  if (trimmedLine.includes('：') || trimmedLine.includes(':')) {
                    const [subtitle, ...content] = trimmedLine.split(/[：:]/);
                    return (
                      <li key={lineIdx} className="flex">
                        <span className="text-gray-800 mr-2">•</span>
                        <div>
                          <span className="text-gray-800">{subtitle.trim()}：</span>
                          <span className="text-gray-700">{content.join(':').trim()}</span>
                        </div>
                      </li>
                    );
                  }
                  
                  // 普通列表项
                  return trimmedLine ? (
                    <li key={lineIdx} className="flex">
                      <span className="text-gray-800 mr-2">•</span>
                      <span className="text-gray-700">{trimmedLine}</span>
                    </li>
                  ) : null;
                }).filter(Boolean)}
            </ul>
          ) : (
            <p className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          )}
        </div>
      );
    });
  };
  
  // 获取各个标签的内容
  const tabContents = {
    highlights: formatContent(getLocalizedContent('highlights')),
    features: formatContent(getLocalizedContent('features')),
    itinerary: formatContent(getLocalizedContent('itinerary')),
    other: formatContent(getLocalizedContent('other_info'))
  };

  return (
    <Tabs defaultValue="highlights" className="w-full">
      <TabsList className="w-full justify-start border-b mb-6 bg-transparent">
        {TAB_CONFIG.map(tab => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-700"
          >
            {currentLanguage === 'en' ? tab.label_en : tab.label_zh}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {TAB_CONFIG.map(tab => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0">
          <div className="prose prose-lg max-w-none">
            {tabContents[tab.id as keyof typeof tabContents]}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProgramContentTabs;
