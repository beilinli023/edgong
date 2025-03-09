import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";
import { BlogCategory, BlogTag } from "@/types/blogTypes";
import { User, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import BlogPostTags from "./BlogPostTags";

interface BlogPostHeaderProps {
  title: string;
  author: string;
  publishedDate: string;
  primaryCategory?: BlogCategory;
  currentLanguage?: string;
  tags?: BlogTag[];
  tagsLabel?: string;
  getLocalizedText?: (en: string, zh: string) => string;
}

const BlogPostHeaderNew: React.FC<BlogPostHeaderProps> = ({
  title,
  author,
  publishedDate,
  primaryCategory,
  currentLanguage,
  tags,
  tagsLabel,
  getLocalizedText = (en, zh) => currentLanguage === 'zh' ? zh : en
}) => {
  // 添加强制更新机制
  const [key, setKey] = useState(Date.now());
  const [localDate, setLocalDate] = useState('');
  
  // 添加调试信息
  console.log('BlogPostHeaderNew原始日期: ', publishedDate, '渲染key:', key);
  
  useEffect(() => {
    // 强制在组件挂载和publishedDate变化时更新日期
    console.log('发现日期变化，重新格式化:', publishedDate);
    const formatted = formatLocalizedDate(publishedDate, currentLanguage);
    setLocalDate(formatted);
    // 强制重新渲染
    setKey(Date.now());
  }, [publishedDate, currentLanguage]);
  
  // 使用 formatLocalizedDate 而不是原来的 formatDate
  function formatLocalizedDate(dateString: string, locale: string = 'en'): string {
    if (!dateString) return '';
    
    try {
      console.log('格式化日期输入: ', dateString);
      const date = new Date(dateString);
      console.log('解析后的Date对象: ', date);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const formatted = date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', options);
      console.log('格式化后的日期: ', formatted);
      return formatted;
    } catch (error) {
      console.error('Error formatting localized date:', error);
      return dateString;
    }
  }
  
  return (
    <div className="mb-8" key={key}>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title || 'No Title Provided'}</h1>
      
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          <span data-testid="author-display">{author || 'Unknown Author'}</span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span data-testid="date-display">{localDate || formatLocalizedDate(publishedDate, currentLanguage) || 'No Date'}</span>
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex items-center ml-1">
            <Tag className="w-4 h-4 mx-1" />
            <div className="flex flex-wrap gap-2" data-testid="tags-container">
              {tags.map((tag, index) => {
                // 根据tag类型选择正确的属性
                const tagName = typeof tag === 'string' 
                  ? tag 
                  : (currentLanguage === 'zh' ? tag.name_zh : tag.name_en);
                
                return (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="px-3 py-1 text-sm hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                    data-tag-name={tagName}
                  >
                    {tagName || `Tag ${index}`}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostHeaderNew; 