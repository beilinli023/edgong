import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import FilterSection from './FilterSection';
import FilterOptions from './FilterOptions';
import { Program, ProgramFilterParams } from '@/types/programTypes';

interface ProgramFilterProps {
  programs: Program[];
  onFilterChange: (filterType: keyof ProgramFilterParams, value: string, checked: boolean) => void;
}

const ProgramFilter: React.FC<ProgramFilterProps> = ({ programs, onFilterChange }) => {
  const { currentLanguage } = useLanguage();
  
  const labels = {
    programType: currentLanguage === 'en' ? 'Program Type' : '项目类型',
    country: currentLanguage === 'en' ? 'Destination' : '目的地',
    gradeLevel: currentLanguage === 'en' ? 'Grade Level' : '年级水平',
  };

  return (
    <div className="space-y-6">
      <FilterSection title={labels.programType}>
        <FilterOptions 
          filterType="program_type" 
          programs={programs}
          onChange={(value, checked) => onFilterChange('category', value, checked)}
        />
      </FilterSection>
      
      <FilterSection title={labels.country}>
        <FilterOptions 
          filterType="country" 
          programs={programs}
          onChange={(value, checked) => onFilterChange('country', value, checked)}
        />
      </FilterSection>
      
      <FilterSection title={labels.gradeLevel}>
        <FilterOptions 
          filterType="grade_level" 
          programs={programs}
          onChange={(value, checked) => onFilterChange('gradeLevel', value, checked)}
        />
      </FilterSection>
    </div>
  );
};

export default ProgramFilter;
