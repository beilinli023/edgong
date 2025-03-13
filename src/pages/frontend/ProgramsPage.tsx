import React, { useState, useEffect } from 'react';
import FrontendLayout from "@/components/frontend/FrontendLayout";
import ProgramsHero from "@/components/frontend/programs/ProgramsHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { useProgramList } from "@/hooks/program/useProgramList";
import { Program, ProgramFilterParams } from "@/types/programTypes";
import ProgramFilter from "@/components/frontend/programs/filters/ProgramFilter";
import { X } from "lucide-react";

const ProgramsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { programs: allPrograms, loading, error } = useProgramList();
  
  // 筛选状态
  const [filters, setFilters] = useState<{
    category: string[];
    country: string[];
    gradeLevel: string[];
  }>({
    category: [],
    country: [],
    gradeLevel: []
  });
  
  // 应用筛选后的程序列表
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  
  // 当筛选条件变化或程序列表加载时，应用筛选
  useEffect(() => {
    if (!allPrograms) return;
    
    const filtered = allPrograms.filter(program => {
      const matchesCategory = filters.category.length === 0 || 
        filters.category.some(cat => {
          const programCategory = currentLanguage === 'en' ? program.program_type_en : program.program_type_zh;
          return programCategory?.includes(cat);
        });
      
      const matchesCountry = filters.country.length === 0 ||
        filters.country.some(country => {
          const programCountry = currentLanguage === 'en' 
            ? (program.country_en || program.destination_en) 
            : (program.country_zh || program.destination_zh);
          return programCountry === country;
        });
      
      const matchesGradeLevel = filters.gradeLevel.length === 0 ||
        filters.gradeLevel.some(level => {
          const programGradeLevel = currentLanguage === 'en' ? program.grade_level_en : program.grade_level_zh;
          return programGradeLevel === level;
        });
      
      return matchesCategory && matchesCountry && matchesGradeLevel;
    });
    
    setFilteredPrograms(filtered);
    setCurrentPage(1); // 筛选改变时重置到第一页
  }, [allPrograms, filters, currentLanguage]);
  
  // 处理筛选条件变化
  const handleFilterChange = (filterType: keyof ProgramFilterParams, value: string, checked: boolean) => {
    setFilters(prev => {
      if (checked) {
        return {
          ...prev,
          [filterType]: [...prev[filterType], value]
        };
      } else {
        return {
          ...prev,
          [filterType]: prev[filterType].filter(item => item !== value)
        };
      }
    });
  };
  
  // 清除所有筛选
  const clearAllFilters = () => {
    setFilters({
      category: [],
      country: [],
      gradeLevel: []
    });
  };
  
  // 清除特定筛选
  const removeFilter = (filterType: keyof ProgramFilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };
  
  // 分页逻辑
  const itemsPerPage = 6; // 每页显示 6 个项目
  const totalPages = Math.ceil((filteredPrograms?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrograms = filteredPrograms?.slice(startIndex, endIndex) || [];
  
  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <FrontendLayout>
        <ProgramsHero />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">
              {currentLanguage === 'en' ? 'Loading programs...' : '正在加载项目...'}
            </p>
          </div>
        </div>
      </FrontendLayout>
    );
  }
  
  // 如果有错误，显示错误信息
  if (error) {
    return (
      <FrontendLayout>
        <ProgramsHero />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-red-500">
              {currentLanguage === 'en' ? 'Error loading programs' : '加载项目时出错'}: {error}
            </p>
          </div>
        </div>
      </FrontendLayout>
    );
  }

  // 如果没有数据，显示空状态
  if (!allPrograms?.length) {
    return (
      <FrontendLayout>
        <ProgramsHero />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">
              {currentLanguage === 'en' ? 'No programs available' : '暂无可用项目'}
            </p>
          </div>
        </div>
      </FrontendLayout>
    );
  }

  // 是否有应用的筛选条件
  const hasAppliedFilters = filters.category.length > 0 || filters.country.length > 0 || filters.gradeLevel.length > 0;

  return (
    <FrontendLayout>
      <ProgramsHero />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">
                {currentLanguage === 'en' ? 'Filter Results' : '筛选结果'}
              </h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium">
                    {currentLanguage === 'en' ? 'Applied Filters' : '已应用的筛选'}
                  </h4>
                  {hasAppliedFilters && (
                    <Button 
                      variant="link" 
                      onClick={clearAllFilters}
                      className="text-blue-600 p-0 h-auto text-sm"
                    >
                      {currentLanguage === 'en' ? 'Clear All' : '清除全部'}
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {!hasAppliedFilters ? (
                    <div className="text-sm text-gray-500">
                      {currentLanguage === 'en' ? 'No filters applied' : '未应用筛选'}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {filters.category.map(cat => (
                        <FilterTag 
                          key={`category-${cat}`}
                          label={cat}
                          onRemove={() => removeFilter('category', cat)}
                        />
                      ))}
                      {filters.country.map(country => (
                        <FilterTag 
                          key={`country-${country}`}
                          label={country}
                          onRemove={() => removeFilter('country', country)}
                        />
                      ))}
                      {filters.gradeLevel.map(level => (
                        <FilterTag 
                          key={`grade-${level}`}
                          label={level}
                          onRemove={() => removeFilter('gradeLevel', level)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* 使用新的筛选器组件 */}
              <ProgramFilter 
                programs={allPrograms}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
          
          {/* Programs list */}
          <div className="flex-1">
            {filteredPrograms.length === 0 ? (
              <div className="flex justify-center items-center h-64 border rounded-md p-4">
                <p className="text-gray-500">
                  {currentLanguage === 'en' ? 'No programs match your filters' : '没有符合筛选条件的项目'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPrograms.map((program: Program) => (
                  <Link key={program.id} to={`/programs/${program.id}`} data-testid={`program-card-${program.id}`}>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={program.image || '/images/programs/default.jpg'} 
                          alt={currentLanguage === 'en' ? program.title_en : program.title_zh} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="text-base font-medium mb-2">
                          {currentLanguage === 'en' ? program.title_en : program.title_zh}
                        </h3>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-1 mb-2">
                          {/* 项目类型 */}
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700 mr-1">
                              {currentLanguage === 'en' ? 'Type:' : '类型:'}
                            </span>
                            <span className="text-gray-600">
                              {currentLanguage === 'en' ? program.program_type_en : program.program_type_zh}
                            </span>
                          </div>
                          
                          {/* 时长 */}
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700 mr-1">
                              {currentLanguage === 'en' ? 'Duration:' : '时长:'}
                            </span>
                            <span className="text-gray-600">
                              {currentLanguage === 'en' 
                                ? (program.duration_en || program.duration || 'Not specified')
                                : (program.duration_zh || program.duration || '未指定')
                              }
                            </span>
                          </div>
                          
                          {/* 目的地 */}
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700 mr-1">
                              {currentLanguage === 'en' ? 'Destination:' : '目的地:'}
                            </span>
                            <span className="text-gray-600">
                              {currentLanguage === 'en' 
                                ? (program.destination_en || program.location_en || 'Not specified')
                                : (program.destination_zh || program.location_zh || '未指定')
                              }
                            </span>
                          </div>
                        </div>
                        
                        <div className="border-t mt-auto pt-3">
                          <div className="text-xs text-gray-600">
                            {currentLanguage === 'en' 
                              ? `Suitable for: ${program.grade_level_en || 'All levels'}`
                              : `适合年级: ${program.grade_level_zh || '所有年级'}`
                            }
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <div className="text-sm text-gray-600 mr-4">
                  {currentLanguage === 'en' ? 
                    `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredPrograms.length)} of ${filteredPrograms.length} results` : 
                    `显示第 ${startIndex + 1} 至 ${Math.min(endIndex, filteredPrograms.length)} 项，共 ${filteredPrograms.length} 项结果`
                  }
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={`page-${i + 1}`}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className="h-8 w-8"
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {currentLanguage === 'en' ? 'Ready to Start Your Journey?' : '准备开始您的旅程？'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {currentLanguage === 'en' 
              ? 'Take the first step in your international education adventure. Our team is here to help you find the perfect program.'
              : '迈出国际教育冒险的第一步，我们的团队随时为您找到完美的项目提供帮助。'
            }
          </p>
          <Link to="/start-planning">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2">
              {currentLanguage === 'en' ? 'Start Planning' : '开始计划'}
            </Button>
          </Link>
        </div>
      </div>
    </FrontendLayout>
  );
};

// 筛选标签组件
const FilterTag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center bg-blue-50 text-blue-700 rounded-full text-xs px-3 py-1">
      <span>{label}</span>
      <button 
        onClick={onRemove}
        className="ml-1 p-0.5 rounded-full hover:bg-blue-100"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};

export default ProgramsPage;
