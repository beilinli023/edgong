
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { PartnerUniversity } from '@/types/studyAbroadTypes';
import PartnerUniversityCard from './PartnerUniversityCard';
import PartnerUniversityListItem from './PartnerUniversityListItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartnerUniversitiesSectionProps {
  universities: PartnerUniversity[];
}

const PartnerUniversitiesSection: React.FC<PartnerUniversitiesSectionProps> = ({ universities }) => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 3; // 每页显示3所大学，便于测试分页功能
  
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
  
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-8 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl">{sectionDescription}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUniversities.map((university) => (
            <PartnerUniversityCard key={university.id} university={university} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Previous' : '上一页'}
          </Button>
          
          {/* 页码按钮 */}
          <div className="flex items-center gap-1 md:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(pageNumber)}
                className={cn(
                  "min-w-[32px] h-8",
                  pageNumber === currentPage && "bg-blue-600 hover:bg-blue-700 text-white"
                )}
              >
                {pageNumber}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            {currentLanguage === 'en' ? 'Next' : '下一页'}
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="w-full text-center mt-2 text-sm text-gray-600">
            {currentLanguage === 'en' 
              ? `Page ${currentPage} of ${totalPages}`
              : `第 ${currentPage} 页，共 ${totalPages} 页`
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversitiesSection;
