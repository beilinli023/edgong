import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { fetchProgramFilters } from '@/services/frontendProgramService';
import { Program } from '@/types/programTypes';

interface FilterOptionsProps {
  filterType: 'program_type' | 'country' | 'grade_level';
  onChange?: (value: string, checked: boolean) => void;
  programs: Program[];
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ filterType, onChange, programs }) => {
  const { currentLanguage } = useLanguage();
  const [options, setOptions] = useState<string[]>([]);
  
  useEffect(() => {
    // 从程序数据中提取唯一的筛选选项
    if (programs?.length) {
      const uniqueValues = new Set<string>();
      
      programs.forEach(program => {
        if (filterType === 'program_type') {
          const value = currentLanguage === 'en' ? program.program_type_en : program.program_type_zh;
          if (value) {
            // 处理多个逗号分隔的值
            value.split(',').map(v => v.trim()).forEach(v => {
              if (v) uniqueValues.add(v);
            });
          }
        } else if (filterType === 'country') {
          const value = currentLanguage === 'en' ? program.country_en || program.destination_en : program.country_zh || program.destination_zh;
          if (value) uniqueValues.add(value);
        } else if (filterType === 'grade_level') {
          const value = currentLanguage === 'en' ? program.grade_level_en : program.grade_level_zh;
          if (value) uniqueValues.add(value);
        }
      });
      
      setOptions(Array.from(uniqueValues).sort());
    }
  }, [programs, filterType, currentLanguage]);
  
  if (options.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-2">
        {currentLanguage === 'en' ? 'No options available' : '暂无可用选项'}
      </div>
    );
  }
  
  return (
    <div className="space-y-2 py-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox 
            id={`${filterType}-${option}`} 
            onCheckedChange={(checked) => {
              onChange?.(option, checked === true);
            }}
          />
          <Label 
            htmlFor={`${filterType}-${option}`}
            className="text-sm font-normal cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default FilterOptions;
