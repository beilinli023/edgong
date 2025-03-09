import { Program, ProgramFilterParams, ProgramsResponse } from '@/types/programTypes';
import { loadFilteredPrograms, loadProgramById, loadProgramFilters } from './programs/programFileService';

/**
 * 获取项目列表，支持筛选和分页
 */
export const fetchFrontendPrograms = async (filters: ProgramFilterParams = {}): Promise<ProgramsResponse> => {
  try {
    console.log('前端服务 - 开始获取项目列表，应用筛选条件:', filters);
    
    // 使用文件服务获取筛选后的项目列表
    const result = await loadFilteredPrograms(filters);
    console.log('前端服务 - 成功获取项目列表，总计:', result.total);
    return result;
  } catch (error) {
    console.error('前端服务 - 获取项目列表出错:', error);
    throw error;
  }
};

/**
 * 获取项目筛选选项
 */
export const fetchProgramFilters = async () => {
  try {
    // 使用文件服务获取筛选选项
    const filters = await loadProgramFilters();
    
    return {
      categories: filters.categories,
      gradeLevels: filters.gradeLevels
    };
  } catch (error) {
    console.error('Error fetching program filters:', error);
    throw error;
  }
};

/**
 * 获取单个项目详情
 */
export const fetchProgramById = async (id: string): Promise<Program | null> => {
  try {
    console.log(`前端服务 - 开始获取ID为 ${id} 的项目`);
    
    // 使用文件服务获取指定ID的项目
    const program = await loadProgramById(id);
    
    if (!program) {
      console.error(`前端服务 - 未找到ID为 ${id} 的项目`);
      throw new Error(`Program with ID ${id} not found`);
    }
    
    console.log(`前端服务 - 成功获取ID为 ${id} 的项目:`, program.title_zh);
    return program;
  } catch (error) {
    console.error(`前端服务 - 获取ID为 ${id} 的项目出错:`, error);
    throw error;
  }
};
