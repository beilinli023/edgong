import React from 'react';
import FrontendLayout from '@/components/frontend/FrontendLayout';
import { useProgramDetail } from '@/hooks/program/useProgramDetail';
import ProgramDetailHero from '@/components/frontend/programs/detail/ProgramDetailHero';
import ProgramContentTabs from '@/components/frontend/programs/detail/ProgramContentTabs';
// 移除不需要的import
import ProgramDetailLoading from '@/components/frontend/programs/detail/ProgramDetailLoading';
import ProgramDetailError from '@/components/frontend/programs/detail/ProgramDetailError';

const ProgramDetailPage = () => {
  const { id, program, loading, error } = useProgramDetail();
  
  // 添加调试信息，仅在开发环境中显示
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('ProgramDetailPage - ID:', id);
      console.log('ProgramDetailPage - Program:', program);
    }
  }, [id, program]);
  
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
      <div className="container mx-auto py-8 px-8 max-w-6xl">
        <div className="flex flex-col">
          <div className="w-full">
            <ProgramContentTabs program={program} />
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default ProgramDetailPage;
