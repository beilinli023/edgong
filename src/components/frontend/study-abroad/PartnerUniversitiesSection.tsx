
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PartnerUniversity } from '@/types/studyAbroadTypes';
import PartnerUniversityCard from './PartnerUniversityCard';
import PartnerUniversityListItem from './PartnerUniversityListItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Grid2x2, LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartnerUniversitiesSectionProps {
  universities: PartnerUniversity[];
}

type LayoutView = 'grid' | 'list';

const PartnerUniversitiesSection: React.FC<PartnerUniversitiesSectionProps> = ({ universities }) => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutView, setLayoutView] = useState<LayoutView>('grid');
  const universitiesPerPage = 6; // 每页显示6所大学
  
  const sectionTitle = currentLanguage === 'en' ? 'Partner Universities' : '合作大学';
  const sectionDescription = currentLanguage === 'en' 
    ? 'Explore our prestigious partner universities offering world-class educational opportunities'
    : '探索我们提供世界一流教育机会的知名合作大学';
  
  // 计算分页
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(universities.length / universitiesPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const toggleLayoutView = (view: LayoutView) => {
    setLayoutView(view);
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl">{sectionDescription}</p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-1",
                layoutView === 'grid' && "bg-blue-50 border-blue-200 text-blue-700"
              )}
              onClick={() => toggleLayoutView('grid')}
              aria-label={currentLanguage === 'en' ? 'Grid view' : '网格视图'}
            >
              <Grid2x2 className="h-4 w-4" />
              <span className="hidden sm:inline">{currentLanguage === 'en' ? 'Grid' : '网格'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center gap-1",
                layoutView === 'list' && "bg-blue-50 border-blue-200 text-blue-700"
              )}
              onClick={() => toggleLayoutView('list')}
              aria-label={currentLanguage === 'en' ? 'List view' : '列表视图'}
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">{currentLanguage === 'en' ? 'List' : '列表'}</span>
            </Button>
          </div>
        </div>
        
        {layoutView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUniversities.map((university) => (
              <PartnerUniversityCard key={university.id} university={university} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentUniversities.map((university) => (
              <PartnerUniversityListItem key={university.id} university={university} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {currentLanguage === 'en' ? 'Previous' : '上一页'}
            </Button>
            <span className="flex items-center text-sm text-gray-600">
              {currentLanguage === 'en' 
                ? `Page ${currentPage} of ${totalPages}`
                : `第 ${currentPage} 页，共 ${totalPages} 页`
              }
            </span>
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2"
            >
              {currentLanguage === 'en' ? 'Next' : '下一页'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerUniversitiesSection;
