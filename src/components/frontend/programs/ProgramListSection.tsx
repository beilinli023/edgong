
import React from 'react';
import { Program } from '@/types/programTypes';
import ProgramCard from './ProgramCard';
import { useProgramOrdering } from '@/hooks/useProgramOrdering';

interface ProgramListSectionProps {
  programs: Program[];
  isLoading: boolean;
  error?: string | null;
}

const ProgramListSection: React.FC<ProgramListSectionProps> = ({ programs, isLoading, error }) => {
  const { orderedPrograms } = useProgramOrdering(programs);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-[350px] animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-red-500">Error loading programs</p>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  if (orderedPrograms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-500">没有找到符合条件的项目</p>
        <p className="text-gray-400 mt-2">请尝试调整过滤器或清除所有过滤条件</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {orderedPrograms.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

export default ProgramListSection;
