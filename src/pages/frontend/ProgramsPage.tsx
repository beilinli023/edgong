import React, { useState } from 'react';
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

const ProgramsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { programs: allPrograms, loading, error } = useProgramList();
  
  // 分页逻辑
  const itemsPerPage = 6; // 每页显示 6 个项目
  const totalPages = Math.ceil((allPrograms?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrograms = allPrograms?.slice(startIndex, endIndex) || [];
  
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
                  <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                    {currentLanguage === 'en' ? 'Clear All' : '清除全部'}
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">
                    {currentLanguage === 'en' ? 'No filters applied' : '未应用筛选'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Program Type Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">
                      {currentLanguage === 'en' ? 'Program Type' : '项目类型'}
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Academic Enrichment', '学术强化'],
                      ['Heritage & Arts Exploration', '文化艺术探索'],
                      ['Performing Arts', '表演艺术'],
                      ['Language & Lifestyle', '语言与生活方式'],
                      ['Language Intensive', '语言强化'],
                      ['History & Civic', '历史与公民'],
                      ['STEM & Science', 'STEM与科学'],
                      ['Religion & Belief', '宗教与信仰'],
                      ['Community Service', '社区服务'],
                      ['Sports', '体育'],
                      ['Academic Courses', '学术课程']
                    ].map(([en, zh]) => (
                      <label key={en} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>{currentLanguage === 'en' ? en : zh}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Destination Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">
                      {currentLanguage === 'en' ? 'Destination' : '目的地'}
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Australia', '澳大利亚'],
                      ['France', '法国'],
                      ['Japan', '日本'],
                      ['United Kingdom', '英国'],
                      ['United States', '美国']
                    ].map(([en, zh]) => (
                      <label key={en} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>{currentLanguage === 'en' ? en : zh}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Grade Level Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">
                      {currentLanguage === 'en' ? 'Grade Level' : '年级水平'}
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {[
                      ['Elementary', '小学'],
                      ['Middle School', '初中'],
                      ['High School', '高中'],
                      ['University', '大学'],
                      ['Adult', '成人']
                    ].map(([en, zh]) => (
                      <label key={en} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>{currentLanguage === 'en' ? en : zh}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Programs list */}
          <div className="flex-1">
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
                            {formatProgramType(currentLanguage === 'en' ? program.program_type_en : program.program_type_zh)}
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
                            : `适合年级: ${decodeUnicodeString(program.grade_level_zh) || '所有年级'}`
                          }
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <div className="text-sm text-gray-600 mr-4">
                  {currentLanguage === 'en' ? 
                    `Showing ${startIndex + 1} to ${Math.min(endIndex, allPrograms.length)} of ${allPrograms.length} results` : 
                    `显示第 ${startIndex + 1} 至 ${Math.min(endIndex, allPrograms.length)} 项，共 ${allPrograms.length} 项结果`
                  }
                </div>
                
                <button
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'border'}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border disabled:opacity-50"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
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

export default ProgramsPage;
