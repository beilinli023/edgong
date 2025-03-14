import { Program, ProgramFilterParams, ProgramsResponse } from '@/types/programTypes';
import { loadFilteredPrograms, loadProgramById, loadProgramFilters } from './programs/programFileService';

// 静态程序数据用作回退机制
const FALLBACK_PROGRAMS = [
  {
    id: "1",
    title_en: "STEM Innovation Workshop",
    title_zh: "STEM创新工作坊",
    program_id: "STEM-001",
    image: "/images/programs/stem-workshop.jpg",
    location_en: "Beijing",
    location_zh: "北京",
    duration: "2 weeks",
    duration_en: "2 weeks",
    duration_zh: "2周",
    country: "China",
    program_type_en: ["STEM", "Innovation"],
    program_type_zh: ["STEM", "创新"],
    destination_en: "Beijing, China",
    destination_zh: "中国北京",
    grade_level_en: "High School",
    grade_level_zh: "高中",
    grade_levels: ["High School", "高中"],
    overview_en: "This STEM workshop focuses on innovation and problem-solving in science and technology.",
    overview_zh: "这个STEM工作坊专注于科学和技术领域的创新和问题解决能力。"
  },
  {
    id: "2",
    title_en: "Global Leadership Program",
    title_zh: "全球领导力项目",
    program_id: "GLP-002",
    image: "/images/programs/leadership.jpg",
    location_en: "Shanghai",
    location_zh: "上海",
    duration: "3 weeks",
    duration_en: "3 weeks",
    duration_zh: "3周",
    country: "China",
    program_type_en: ["Leadership", "Global Citizenship"],
    program_type_zh: ["领导力", "全球公民"],
    destination_en: "Shanghai, China",
    destination_zh: "中国上海",
    grade_level_en: "College",
    grade_level_zh: "大学",
    grade_levels: ["College", "大学"],
    overview_en: "Our Global Leadership Program prepares students to become future leaders in a globalized world.",
    overview_zh: "我们的全球领导力项目为学生准备在全球化世界中成为未来领导者。"
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
      const result = await loadFilteredPrograms(filters, currentLanguage);
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
