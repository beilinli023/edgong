import React, { useState, useMemo } from 'react';
import FrontendLayout from "@/components/frontend/FrontendLayout";
import ProgramsHero from "@/components/frontend/programs/ProgramsHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { useProgramList } from "@/hooks/program/useProgramList";
import { Program } from "@/types/programTypes";
import { decodeUnicodeString } from '@/utils/unicodeHelper';
import { formatProgramType } from '@/utils/formatters';
import ProgramFilters from '@/components/frontend/programs/ProgramFilters';

const ProgramsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { programs: allPrograms, loading, error } = useProgramList();
  
  // 筛选状态
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedGradeLevels, setSelectedGradeLevels] = useState<string[]>([]);
  
  // 处理筛选变化
  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1); // 重置页码
  };
  
  const handleCountryChange = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
    setCurrentPage(1);
  };
  
  const handleGradeLevelChange = (level: string) => {
    setSelectedGradeLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setCurrentPage(1);
  };
  
  const handleClearAll = () => {
    setSelectedTypes([]);
    setSelectedCountries([]);
    setSelectedGradeLevels([]);
    setCurrentPage(1);
  };
  
  // 筛选程序
  const filteredPrograms = useMemo(() => {
    if (!allPrograms) return [];
    
    return allPrograms.filter(program => {
      // 项目类型筛选逻辑
      const typeMatch = selectedTypes.length === 0 || 
        selectedTypes.some(type => {
          // 获取当前语言的项目类型数组
          const programTypes = currentLanguage === 'en' 
            ? program.program_type_en || [] 
            : program.program_type_zh || [];
          
          // 根据筛选值匹配对应类型
          switch(type) {
            case 'language-intensive':
              return programTypes.some(pt => 
                pt.toLowerCase().includes('language intensive') || 
                pt.toLowerCase().includes('语言强化')
              );
            case 'language-lifestyle':
              return programTypes.some(pt => 
                pt.toLowerCase().includes('language & lifestyle') || 
                pt.toLowerCase().includes('语言与生活')
              );
            case 'stem-science':
              return programTypes.some(pt => 
                pt.toLowerCase().includes('stem') || 
                pt.toLowerCase().includes('science') ||
                pt.toLowerCase().includes('科学')
              );
            case 'heritage-arts':
              return programTypes.some(pt => 
                pt.toLowerCase().includes('heritage') || 
                pt.toLowerCase().includes('arts') ||
                pt.toLowerCase().includes('民俗') ||
                pt.toLowerCase().includes('艺术')
              );
            case 'academic-enrichment':
              return programTypes.some(pt => 
                pt.toLowerCase().includes('academic') || 
                pt.toLowerCase().includes('学术')
              );
            default:
              return false;
          }
        });
        
      // 国家和地区筛选逻辑改为使用 country 字段
      const countryMatch = selectedCountries.length === 0 ||
        selectedCountries.some(country => {
          // 获取当前语言的国家数组，确保处理字符串或数组格式
          const countryValues = currentLanguage === 'en'
            ? (Array.isArray(program.country_en) ? program.country_en : [program.country_en]).filter(Boolean)
            : (Array.isArray(program.country_zh) ? program.country_zh : [program.country_zh]).filter(Boolean);
          
          // 将国家值转换为小写以进行不区分大小写的比较
          const countryLower = countryValues.map(c => (c || '').toLowerCase());
          
          switch(country) {
            case 'singapore':
              return countryLower.some(c => c.includes('singapore') || c.includes('新加坡'));
            case 'malaysia':
              return countryLower.some(c => c.includes('malaysia') || c.includes('马来西亚'));
            case 'uk':
              return countryLower.some(c => c.includes('kingdom') || c.includes('uk') || c.includes('英国'));
            case 'us':
              return countryLower.some(c => c.includes('united states') || c.includes('america') || c.includes('美国'));
            case 'japan':
              return countryLower.some(c => c.includes('japan') || c.includes('日本'));
            default:
              return false;
          }
        });
        
      // 年级水平筛选逻辑改进
      const gradeLevelMatch = selectedGradeLevels.length === 0 ||
        selectedGradeLevels.some(level => {
          const gradeLevels = currentLanguage === 'en'
            ? (Array.isArray(program.grade_level_en) ? program.grade_level_en : [program.grade_level_en]).filter(Boolean)
            : (Array.isArray(program.grade_level_zh) ? program.grade_level_zh : [program.grade_level_zh]).filter(Boolean);
          
          switch(level) {
            case 'primary':
              return gradeLevels.some(gl => 
                gl.toLowerCase().includes('primary') || 
                gl.toLowerCase().includes('elementary') || 
                gl.toLowerCase().includes('小学')
              );
            case 'middle':
              return gradeLevels.some(gl => 
                gl.toLowerCase().includes('middle') || 
                gl.toLowerCase().includes('初中')
              );
            case 'high':
              return gradeLevels.some(gl => 
                gl.toLowerCase().includes('high') || 
                gl.toLowerCase().includes('高中')
              );
            default:
              return false;
          }
        });
        
      return typeMatch && countryMatch && gradeLevelMatch;
    });
  }, [allPrograms, selectedTypes, selectedCountries, selectedGradeLevels, currentLanguage]);
  
  // 分页逻辑
  const itemsPerPage = 6;
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

  return (
    <FrontendLayout>
      <ProgramsHero />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 筛选侧边栏 */}
          <div className="w-full md:w-64 shrink-0">
            <ProgramFilters
              selectedTypes={selectedTypes}
              selectedCountries={selectedCountries}
              selectedGradeLevels={selectedGradeLevels}
              onTypeChange={handleTypeChange}
              onCountryChange={handleCountryChange}
              onGradeLevelChange={handleGradeLevelChange}
              onClearAll={handleClearAll}
            />
          </div>
          
          {/* 程序列表 */}
          <div className="flex-1">
            {filteredPrograms.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500">
                  {currentLanguage === 'en' ? 'No matching programs found' : '未找到匹配的项目'}
                </p>
              </div>
            ) : (
              <>
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
                              <span>
                                {currentLanguage === 'en' 
                                  ? program.program_type_en?.[0] 
                                  : program.program_type_zh?.[0]}
                              </span>
                            </div>
                            
                            {/* 国家 */}
                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 mr-1">
                                {currentLanguage === 'en' ? 'Country:' : '国家:'}
                              </span>
                              <span>
                                {currentLanguage === 'en' 
                                  ? (Array.isArray(program.country_en) ? program.country_en[0] : program.country_en)
                                  : (Array.isArray(program.country_zh) ? program.country_zh[0] : program.country_zh)
                                }
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {currentLanguage === 'en' 
                              ? program.overview_en 
                              : program.overview_zh}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                {/* 分页控制 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-md"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {currentLanguage === 'en' ? 'Previous' : '上一页'}
                    </Button>
                    
                    <div className="flex items-center">
                      <div 
                        className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-600 text-white font-medium"
                      >
                        {currentPage}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 rounded-md"
                    >
                      {currentLanguage === 'en' ? 'Next' : '下一页'}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
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

export default ProgramsPage;
