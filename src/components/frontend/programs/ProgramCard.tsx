import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Program } from '@/types/programTypes';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// CSS类名常量，避免重复
const IMAGE_STYLES = "w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105";
const BADGE_STYLES = "rounded-full px-2 py-1 text-xs bg-primary/10 text-primary border-none mb-1 mr-1";

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  // 多语言文本和内容获取
  const title = currentLanguage === 'en' ? program.title_en : program.title_zh;
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  
  // 标签显示逻辑
  const displayTags = program.tags ? program.tags.slice(0, 3) : [];
  
  return (
    <Link to={`/programs/${program.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full group overflow-hidden">
        {/* 主图 */}
        <div className="overflow-hidden">
          <img
            src={program.image || "/placeholder.svg"}
            alt={title}
            className={IMAGE_STYLES}
          />
        </div>
        
        {/* 内容区域 */}
        <div className="p-5">
          {/* 标题 */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          
          {/* 位置和时长 */}
          <div className="flex items-center gap-5 text-gray-600 mb-3">
            {location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span className="text-sm">{location}</span>
              </div>
            )}
            
            {program.duration && (
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span className="text-sm">{program.duration}</span>
              </div>
            )}
          </div>
          
          {/* 标签 */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap">
              {displayTags.map(tag => (
                <Badge key={tag.id} className={BADGE_STYLES}>
                  {currentLanguage === 'en' ? tag.name_en : tag.name_zh}
                </Badge>
              ))}
            </div>
          )}
          
          {/* 价格 */}
          {program.price && (
            <div className="mt-3 text-right">
              <span className="font-bold text-lg text-primary">
                ${program.price}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
