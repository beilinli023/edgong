
import React, { useState } from 'react';
import FrontendLayout from "@/components/frontend/FrontendLayout";
import ProgramsHero from "@/components/frontend/programs/ProgramsHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const ProgramsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock program data
  const programs = [
    {
      id: "1",
      title: "伦敦艺术与文化探索",
      titleEn: "London Arts and Culture",
      location: "英国",
      locationEn: "UK",
      duration: "3 weeks",
      tags: ["学术研究", "文化体验"],
      tagsEn: ["Academic Research", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
      levels: ["High School", "University"]
    },
    {
      id: "2",
      title: "东京科技创新之旅",
      titleEn: "Tokyo Tech Innovation Tour",
      location: "日本",
      locationEn: "Japan",
      duration: "2 weeks",
      tags: ["学术研究", "文化体验"],
      tagsEn: ["Academic Research", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1436&auto=format&fit=crop",
      levels: ["High School", "University"]
    },
    {
      id: "3",
      title: "加州大学伯克利分校STEM创新项目",
      titleEn: "UC Berkeley STEM Innovation Program",
      location: "美国",
      locationEn: "USA",
      duration: "2 weeks",
      tags: ["学术研究", "文化体验"],
      tagsEn: ["Academic Research", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1581362716668-d8a5233b14c0?q=80&w=1470&auto=format&fit=crop",
      levels: ["High School", "University"]
    },
    {
      id: "4",
      title: "澳大利亚海洋生物探索",
      titleEn: "Australian Marine Biology Exploration",
      location: "澳大利亚",
      locationEn: "Australia",
      duration: "2 weeks",
      tags: ["学术研究", "文化体验"],
      tagsEn: ["Academic Research", "Cultural Experience"],
      image: "https://images.unsplash.com/photo-1579688768822-7d44e4584d42?q=80&w=1374&auto=format&fit=crop",
      levels: ["High School", "University"]
    }
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program) => (
                <Link key={program.id} to={`/programs/${program.id}`}>
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-medium mb-4">{program.title}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {program.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-auto">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {program.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {program.duration}
                        </div>
                      </div>
                      
                      <div className="border-t mt-4 pt-3 flex flex-wrap gap-2">
                        {program.levels.map((level, idx) => (
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
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-2">
              <div className="text-sm text-gray-600 mr-4">
                显示第 1 至 4 项，共 4 项结果
              </div>
              
              <button
                disabled={currentPage === 1}
                className="p-2 rounded-md border disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              
              <button
                disabled={currentPage === 1}
                className="p-2 rounded-md border disabled:opacity-50"
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
