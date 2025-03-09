
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

const ProgramsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const { programs: allPrograms, loading, error } = useProgramList();
  
  // 分页逻辑
  const itemsPerPage = 6; // 每页显示 6 个项目
  const totalPages = Math.ceil(allPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrograms = allPrograms.slice(startIndex, endIndex);
  
  // 如果没有数据，显示占位内容
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
  
  // 实际项目数据

  return (
    <FrontendLayout>
      <ProgramsHero />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">筛选结果</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-medium">已应用的筛选</h4>
                  <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                    清除全部
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">未应用筛选</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">项目类型</h4>
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
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>历史与公民</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>STEM/科学</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>文化探索</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>宗教与信仰</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>表演艺术</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>语言强化</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>社区参与</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>体育</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>专业</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">目的地</h4>
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
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>澳大利亚</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>法国</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>日本</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>英国</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>美国</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-medium">年级水平</h4>
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
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>小学</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>初中</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>高中</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>大学</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>成人</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Programs list */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPrograms.map((program: Program) => {
                // 添加调试信息
                console.log(`渲染项目卡片: ID=${program.id}, 标题=${program.title_zh}, 链接=/programs/${program.id}`);
                
                return (
                <Link key={program.id} to={`/programs/${program.id}`} data-testid={`program-card-${program.id}`}>
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={currentLanguage === 'en' ? program.title_en : program.title_zh} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-base font-medium mb-2">{currentLanguage === 'en' ? program.title_en : program.title_zh}</h3>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {program.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-blue-50 text-blue-700 px-1.5 py-0.5 text-xs rounded"
                          >
                            {currentLanguage === 'en' ? tag.name_en : tag.name_zh}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-1 mb-2">
                        {/* 项目类型 - 与 ProgramInfoSidebar 保持一致 */}
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 mr-1">
                            {currentLanguage === 'en' ? 'Type:' : '类型:'}
                          </span>
                          <span className="text-gray-600">
                            {currentLanguage === 'en' ? program.program_type_en : program.program_type_zh}
                          </span>
                        </div>
                        
                        {/* 时长 - 与 ProgramInfoSidebar 保持一致 */}
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 mr-1">
                            {currentLanguage === 'en' ? 'Duration:' : '时长:'}
                          </span>
                          <span className="text-gray-600">{program.duration}</span>
                        </div>
                        
                        {/* 目的地 - 与 ProgramInfoSidebar 保持一致 */}
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 mr-1">
                            {currentLanguage === 'en' ? 'Destination:' : '目的地:'}
                          </span>
                          <span className="text-gray-600">
                            {currentLanguage === 'en' ? program.destination_en || program.location_en : program.destination_zh || program.location_zh}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t mt-auto pt-3 flex flex-wrap gap-2">
                        {program.grade_levels.map((level, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 text-xs rounded"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
              })}
            </div>
            
            {/* Pagination */}
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
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">准备开始您的旅程？</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            迈出国际教育冒险的第一步，我们的团队随时为您找到完美的项目提供帮助。
          </p>
          <Link to="/start-planning">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2">
              开始计划
            </Button>
          </Link>
        </div>
      </div>
    </FrontendLayout>
  );
};

export default ProgramsPage;
