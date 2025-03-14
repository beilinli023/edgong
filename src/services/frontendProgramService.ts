import { Program, ProgramFilterParams, ProgramsResponse } from '@/types/programTypes';
import { loadFilteredPrograms, loadProgramById, loadProgramFilters } from './programs/programFileService';

// 静态程序数据用作回退机制（使用真实程序数据）
const FALLBACK_PROGRAMS = [
  {
    id: "1",
    title_en: "English Language Summer School 2025 Adcote Matrix International",
    title_zh: "2025年阿德科特国际英语暑期学校",
    program_id: "MYLAN-2025-002",
    image: "/Edgoing/Program_Page/Malaysia/Picture_3.jpg",
    location_en: "Malaysia",
    location_zh: "马来西亚",
    duration: "3 weeks",
    duration_en: "3 weeks",
    duration_zh: "3 周",
    country: "Malaysia",
    program_type_en: ["Language Intensive", "Language & Lifestyle"],
    program_type_zh: ["语言强化", "语言与生活"],
    destination_en: "Malaysia",
    destination_zh: "马来西亚",
    grade_level_en: ["Middle School"],
    grade_level_zh: ["初中"],
    grade_levels: ["Middle School", "初中"],
    overview_en: "Our 3-week English Language Summer School is designed for learners aged 10 to 14, offering a comprehensive and immersive experience to develop English language skills.",
    overview_zh: "我们的3周英语夏令营专为10至14岁的学习者设计，提供全面且沉浸式的体验，帮助学生提升英语语言能力。"
  },
  {
    id: "2",
    title_en: "Singapore 'Sea, Land, Air' English Camp 2025",
    title_zh: "2025年新加坡\"海陆空\"英语营",
    program_id: "SGLAN-2025-001",
    image: "/Edgoing/Program_Page/Singapore/English_Camp/Picture_1.png",
    location_en: "Singapore",
    location_zh: "新加坡",
    duration: "2 weeks",
    duration_en: "2 weeks",
    duration_zh: "2周",
    country: "Singapore",
    program_type_en: ["Language & Lifestyle", "Language Intensive"],
    program_type_zh: ["语言与生活", "语言强化"],
    destination_en: "Singapore",
    destination_zh: "新加坡",
    grade_level_en: ["Middle School", "High School"],
    grade_level_zh: ["初中", "高中"],
    grade_levels: ["Middle School", "High School", "初中", "高中"],
    overview_en: "The \"Sea, Land, and Sky\" English Camp in Singapore is a 7-day immersive program designed for students aged 10 to 15.",
    overview_zh: "新加坡\"海陆空\"英语营是一个为期7天的沉浸式项目，专为10至15岁的学生设计。"
  },
  {
    id: "3",
    title_en: "Singapore STEM & AI Camp 2025",
    title_zh: "2025年新加坡STEM与AI营",
    program_id: "SGSTEM-2025-003",
    image: "/Edgoing/Program_Page/Singapore/STEM/Picture_6.png",
    location_en: "Singapore",
    location_zh: "新加坡",
    duration: "7 days",
    duration_en: "7 days",
    duration_zh: "7 天",
    country: "Singapore",
    program_type_en: ["STEM & Science"],
    program_type_zh: ["STEM与科学创新"],
    destination_en: "Singapore",
    destination_zh: "新加坡",
    grade_level_en: ["Middle School", "High School"],
    grade_level_zh: ["初中", "高中"],
    grade_levels: ["Middle School", "High School", "初中", "高中"],
    overview_en: "AI and STEM focused courses and workshops at top Singaporean institutions like Nanyang Technological University and the Science Centre Singapore.",
    overview_zh: "AI与STEM重点课程，在新加坡南洋理工大学和科学中心等顶级机构进行。"
  }
] as Program[];

/**
 * 获取项目列表，支持筛选和分页
 */
export const fetchFrontendPrograms = async (
  filters: ProgramFilterParams = {},
  currentLanguage: 'en' | 'zh' = 'en'
): Promise<ProgramsResponse> => {
  try {
    console.log('前端服务 - 开始获取项目列表，应用筛选条件:', filters);
    
    // 使用文件服务获取筛选后的项目列表
    try {
      const result = await loadFilteredPrograms(filters);
      console.log('前端服务 - 成功获取项目列表，总计:', result.total);
      return result;
    } catch (error) {
      console.error('前端服务 - 获取项目列表失败，返回回退数据:', error);
      
      // 返回静态回退数据
      return {
        data: FALLBACK_PROGRAMS,
        total: FALLBACK_PROGRAMS.length,
        page: 1,
        totalPages: 1
      };
    }
  } catch (error) {
    console.error('前端服务 - 获取项目列表出错:', error);
    
    // 确保即使外层出错也返回静态数据
    return {
      data: FALLBACK_PROGRAMS,
      total: FALLBACK_PROGRAMS.length,
      page: 1,
      totalPages: 1
    };
  }
};

/**
 * 获取项目筛选选项
 */
export const fetchProgramFilters = async () => {
  try {
    // 使用文件服务获取筛选选项
    try {
      const filters = await loadProgramFilters();
      return {
        categories: filters.categories,
        gradeLevels: filters.gradeLevels
      };
    } catch (error) {
      console.error('Error fetching program filters, using fallback data:', error);
      
      // 返回静态筛选选项
      return {
        categories: ["STEM", "Innovation", "Leadership", "Global Citizenship", "Cultural", "History"],
        gradeLevels: ["High School", "College", "Middle School"]
      };
    }
  } catch (error) {
    console.error('Error fetching program filters:', error);
    
    // 确保即使外层出错也返回静态数据
    return {
      categories: ["STEM", "Leadership", "Cultural"],
      gradeLevels: ["High School", "College", "Middle School"]
    };
  }
};

/**
 * 获取单个项目详情
 */
export const fetchProgramById = async (id: string): Promise<Program | null> => {
  try {
    console.log(`前端服务 - 开始获取ID为 ${id} 的项目`);
    
    // 使用文件服务获取指定ID的项目
    try {
      const program = await loadProgramById(id);
      
      if (!program) {
        console.log(`前端服务 - 未找到ID为 ${id} 的项目，检查回退数据`);
        
        // 在静态数据中查找匹配项目
        const fallbackProgram = FALLBACK_PROGRAMS.find(p => p.id === id);
        if (fallbackProgram) {
          console.log(`前端服务 - 在回退数据中找到ID为 ${id} 的项目`);
          return fallbackProgram;
        }
        
        throw new Error(`Program with ID ${id} not found`);
      }
      
      console.log(`前端服务 - 成功获取ID为 ${id} 的项目:`, program.title_zh);
      return program;
    } catch (error) {
      console.error(`前端服务 - 获取ID为 ${id} 的项目失败，检查回退数据:`, error);
      
      // 尝试从回退数据中获取
      const fallbackProgram = FALLBACK_PROGRAMS.find(p => p.id === id);
      if (fallbackProgram) {
        return fallbackProgram;
      }
      
      throw error;
    }
  } catch (error) {
    console.error(`前端服务 - 获取ID为 ${id} 的项目出错:`, error);
    throw error;
  }
};
