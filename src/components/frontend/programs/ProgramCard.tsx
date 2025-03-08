
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Program, ProgramTag } from "@/types/programTypes";

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { currentLanguage } = useLanguage();
  
  const title = currentLanguage === 'en' ? program.title_en : program.title_zh;
  const location = currentLanguage === 'en' ? program.location_en : program.location_zh;
  
  // Ensure id is string for the URL
  const programId = program.id.toString();
  
  return (
    <Link to={`/programs/${programId}`} className="block">
      <div className="border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md flex flex-col h-full">
        {/* Program Image */}
        <div className="h-48 overflow-hidden relative">
          <img 
            src={program.image || "/placeholder.svg"} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {/* Program ID overlay removed */}
        </div>
        
        {/* Program Content */}
        <div className="p-4 flex-grow">
          {/* Program Title */}
          <h3 className="text-lg font-semibold mb-3 line-clamp-2">
            {title}
          </h3>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {program.tags && program.tags.length > 0 ? (
              program.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-100"
                >
                  {currentLanguage === 'en' ? tag.name_en : tag.name_zh}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                {currentLanguage === 'en' ? 'General' : '通用'}
              </Badge>
            )}
          </div>
          
          {/* Location and Duration */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{program.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Grade Levels */}
        <div className="p-4 pt-0 mt-2 border-t border-gray-100 text-sm">
          <div className="flex items-center flex-wrap gap-1">
            {program.grade_levels && program.grade_levels.length > 0 ? (
              program.grade_levels.map((level, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-gray-50"
                >
                  {level}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="bg-gray-50">
                {currentLanguage === 'en' ? 'All Grades' : '所有年级'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgramCard;
