
import React from "react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";
import { BlogCategory } from "@/types/blogTypes";
import { User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPostHeaderProps {
  title: string;
  author: string;
  publishedDate: string;
  primaryCategory?: BlogCategory;
  currentLanguage?: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  author,
  publishedDate,
  primaryCategory,
  currentLanguage
}) => {
  const formattedDate = formatLocalizedDate(publishedDate, currentLanguage);
  
  // 使用 formatLocalizedDate 而不是原来的 formatDate
  function formatLocalizedDate(dateString: string, locale: string = 'en'): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', options);
    } catch (error) {
      console.error('Error formatting localized date:', error);
      return dateString;
    }
  }
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
      
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          <span>{author}</span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        
        {primaryCategory && (
          <Link to={`/blog/category/${primaryCategory.slug}`}>
            <Badge className="bg-blue-500 hover:bg-blue-600">
              {primaryCategory.name_en || primaryCategory.name_zh}
            </Badge>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPostHeader;
