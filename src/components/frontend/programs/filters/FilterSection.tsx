import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

interface FilterSectionProps {
  title: string;
  isExpanded?: boolean;
  toggleExpanded?: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isExpanded: initialExpanded = true,
  toggleExpanded: externalToggle,
  isLoading = false,
  children
}) => {
  const [internalExpanded, setInternalExpanded] = useState(initialExpanded);
  
  // 使用内部状态或外部状态
  const expanded = externalToggle ? initialExpanded : internalExpanded;
  const toggleExpanded = externalToggle || (() => setInternalExpanded(!internalExpanded));
  
  return (
    <div className="border rounded-md">
      {/* 过滤器部分头部 */}
      <button 
        onClick={toggleExpanded}
        className="flex justify-between items-center w-full px-4 py-2 text-left font-medium"
      >
        <span>{title}</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {/* 过滤器选项 */}
      {expanded && (
        <div className="px-4 py-2 border-t">
          <div className="space-y-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
