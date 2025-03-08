
import React from 'react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import { useProgramDetail } from '@/hooks/program/useProgramDetail';
import ProgramDetailHero from '@/components/frontend/programs/detail/ProgramDetailHero';
import ProgramContentTabs from '@/components/frontend/programs/detail/ProgramContentTabs';
import ProgramInfoSidebar from '@/components/frontend/programs/detail/ProgramInfoSidebar';
import ProgramDetailLoading from '@/components/frontend/programs/detail/ProgramDetailLoading';
import ProgramDetailError from '@/components/frontend/programs/detail/ProgramDetailError';

const ProgramDetailPage = () => {
  const { program, loading, error } = useProgramDetail();
  
  if (loading) {
    return (
      <FrontendLayout>
        <ProgramDetailLoading />
      </FrontendLayout>
    );
  }
  
  if (error || !program) {
    return (
      <FrontendLayout>
        <ProgramDetailError error={error} />
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      {/* Hero section */}
      <ProgramDetailHero program={program} />
      
      {/* Content section */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <ProgramContentTabs program={program} />
          </div>
          
          <div className="lg:w-1/3">
            <ProgramInfoSidebar program={program} />
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default ProgramDetailPage;
