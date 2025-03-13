import { Program, ProgramFilterParams, ProgramsResponse } from '@/types/programTypes';
import { debugLog, errorLog, traceDataLoading } from '@/utils/debugHelper';

/**
 * 添加缓存打破参数到URL，确保获取最新数据
 */
export const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${new Date().getTime()}`;
};

/**
 * 从JSON文件加载所有Program列表
 */
export const loadProgramsFromFiles = async (): Promise<Program[]> => {
  try {
    debugLog('programFileService', '开始加载项目索引文件...');
    const indexResponse = await fetch(addCacheBuster('/content/programs/index.json'));
    if (!indexResponse.ok) {
      errorLog('programFileService', `无法加载Program索引文件: ${indexResponse.statusText}`, indexResponse);
      throw new Error(`无法加载Program索引文件: ${indexResponse.statusText}`);
    }
    
    const filenames = await indexResponse.json();
    traceDataLoading('programFileService', '索引文件内容:', filenames);
    
    debugLog('programFileService', `开始加载 ${filenames.length} 个项目文件`);
    const programPromises = filenames.map(async (filename: string) => {
      try {
        debugLog('programFileService', `[加载开始] 项目文件: ${filename}`);
        const response = await fetch(addCacheBuster(`/content/programs/${filename}`));
        if (!response.ok) {
          errorLog('programFileService', `[加载失败] 项目文件 ${filename}: HTTP ${response.status} ${response.statusText}`, response);
          return null;
        }
        
        const programData = await response.json();
        
        if (!programData || !programData.id || !programData.title_zh) {
          errorLog('programFileService', `[数据异常] 项目文件 ${filename}: 数据不完整`, programData);
          return null;
        }
        
        const adaptedProgram = adaptProgramData(programData);
        
        traceDataLoading('programFileService', `[加载成功] 项目文件 ${filename}: ID=${adaptedProgram.id}, 标题=${adaptedProgram.title_zh}`, adaptedProgram);
        return adaptedProgram;
      } catch (error) {
        errorLog('programFileService', `[加载错误] 项目文件 ${filename}:`, error);
        return null;
      }
    });
    
    const programs = await Promise.all(programPromises);
    const validPrograms = programs.filter((program): program is Program => program !== null);
    
    const idMap = new Map();
    const uniquePrograms: Program[] = [];
    
    validPrograms.forEach(program => {
      if (!idMap.has(program.id)) {
        idMap.set(program.id, program);
        uniquePrograms.push(program);
      } else {
        console.warn(`[重复ID] 发现重复的项目ID: ${program.id}, 标题: ${program.title_zh}`);
      }
    });
    
    debugLog('programFileService', `[加载统计] 总计索引文件: ${filenames.length}, 有效加载: ${validPrograms.length}, 唯一ID: ${uniquePrograms.length}`);
    
    return uniquePrograms;
  } catch (error) {
    errorLog('programFileService', '加载Programs时出错:', error);
    throw error;
  }
};

interface RawProgramData {
  id: string | number;
  title_en: string;
  title_zh: string;
  program_id: string;
  image: string;
  location_en: string;
  location_zh: string;
  duration: string;
  duration_en?: string;
  duration_zh?: string;
  country?: string;
  country_en?: string;
  country_zh?: string;
  program_type_en?: string;
  program_type_zh?: string;
  destination_en?: string;
  destination_zh?: string;
  grade_level_en?: string;
  grade_level_zh?: string;
  grade_levels?: string[];
  gallery_images?: string[];
  gallery?: string[];
  overview_en?: string;
  overview_zh?: string;
  description_en?: string;
  description_zh?: string;
  highlights_en?: string;
  highlights_zh?: string;
  itinerary_en?: string;
  itinerary_zh?: string;
  features_en?: string;
  features_zh?: string;
  other_info_en?: string;
  other_info_zh?: string;
}

/**
 * 适配程序数据，确保与原有数据结构兼容
 */
const adaptProgramData = (program: RawProgramData): Program => {
  const adaptedProgram: Program = {
    id: String(program.id),
    title_en: program.title_en || '',
    title_zh: program.title_zh || '',
    program_id: program.program_id || '',
    image: program.image || '',
    location_en: program.location_en || '',
    location_zh: program.location_zh || '',
    duration: program.duration || '',
    duration_en: program.duration_en || '',
    duration_zh: program.duration_zh || '',
    country: program.country || program.country_en || program.country_zh || '',
    grade_levels: program.grade_levels || [
      program.grade_level_en || '',
      program.grade_level_zh || ''
    ].filter(level => level !== ''), // 过滤掉空字符串，确保数组有效
    program_type_en: program.program_type_en || '',
    program_type_zh: program.program_type_zh || '',
    destination_en: program.destination_en || '',
    destination_zh: program.destination_zh || '',
    grade_level_en: program.grade_level_en || '',
    grade_level_zh: program.grade_level_zh || '',
    overview_en: program.overview_en || '',
    overview_zh: program.overview_zh || '',
    description_en: program.description_en || '',
    description_zh: program.description_zh || '',
    highlights_en: program.highlights_en || '',
    highlights_zh: program.highlights_zh || '',
    itinerary_en: program.itinerary_en || '',
    itinerary_zh: program.itinerary_zh || '',
    features_en: program.features_en || '',
    features_zh: program.features_zh || '',
    other_info_en: program.other_info_en || '',
    other_info_zh: program.other_info_zh || '',
    gallery_images: program.gallery_images || program.gallery || []
  };

  return adaptedProgram;
};

/**
 * 根据ID获取单个Program详情
 */
export const loadProgramById = async (id: string): Promise<Program | null> => {
  try {
    debugLog('programFileService', `开始加载ID为 ${id} 的Program`);
    
    // 尝试直接通过文件名获取特定项目
    try {
      const programFromFile = await loadProgramFromFile(`program${id}.json`);
      if (programFromFile) {
        debugLog('programFileService', `通过直接文件名找到项目 program${id}.json:`, programFromFile.title_zh);
        return programFromFile;
      }
    } catch (fileError) {
      debugLog('programFileService', `未能从直接文件名加载 program${id}.json:`, fileError);
      // 如果直接文件加载失败，继续使用列表方法
    }
    
    // 回退到加载所有项目并过滤
    const programs = await loadProgramsFromFiles();
    debugLog('programFileService', `加载到 ${programs.length} 个Program文件`);
    
    // 先尝试完全匹配ID（字符串比较）
    const programById = programs.find(p => String(p.id) === String(id));
    if (programById) {
      debugLog('programFileService', `通过ID直接找到项目 ${id}:`, programById.title_zh);
      return programById;
    }
    
    // 再尝试使用program_id匹配
    const programByProgramId = programs.find(p => p.program_id === id);
    if (programByProgramId) {
      debugLog('programFileService', `通过program_id找到项目 ${id}:`, programByProgramId.title_zh);
      return programByProgramId;
    }
    
    // 最后输出所有项目ID进行诊断
    console.log('所有可用的项目ID:', programs.map(p => ({ id: p.id, program_id: p.program_id })));
    debugLog('programFileService', `未找到ID为 ${id} 的项目`);
    return null;
  } catch (error) {
    errorLog('programFileService', `加载ID为 ${id} 的项目时出错:`, error);
    throw error;
  }
};

/**
 * 根据筛选参数加载和过滤Program列表
 */
export const loadFilteredPrograms = async (
  filters: ProgramFilterParams = {}
): Promise<ProgramsResponse> => {
  try {
    let programs = await loadProgramsFromFiles();
    debugLog('programFileService', '加载已完成，开始应用筛选:', filters);
    
    if (filters.ids && filters.ids.length > 0) {
      debugLog('programFileService', '根据ID筛选项目:', filters.ids);
      programs = programs.filter(program => filters.ids!.includes(program.id));
    }
    
    if (filters.category) {
      const categoryLower = filters.category.toLowerCase();
      programs = programs.filter(program => {
        const programType = program.program_type_en || program.program_type_zh;
        return programType?.toLowerCase().includes(categoryLower);
      });
    }
    
    if (filters.country) {
      const countryLower = filters.country.toLowerCase();
      programs = programs.filter(program => {
        const country = program.country || program.destination_en || program.location_en;
        return country?.toLowerCase().includes(countryLower);
      });
    }
    
    if (filters.gradeLevel) {
      const gradeLevelLower = filters.gradeLevel.toLowerCase();
      programs = programs.filter(program => {
        if (!program.grade_levels?.length) return false;
        return program.grade_levels.some(level => 
          level?.toLowerCase().includes(gradeLevelLower)
        );
      });
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      programs = programs.filter(program => {
        return (
          program.title_en?.toLowerCase().includes(searchLower) ||
          program.title_zh?.toLowerCase().includes(searchLower) ||
          program.location_en?.toLowerCase().includes(searchLower) ||
          program.location_zh?.toLowerCase().includes(searchLower)
        );
      });
    }
    
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedPrograms = programs.slice(startIndex, endIndex);
    
    return {
      data: paginatedPrograms,
      total: programs.length,
      page,
      totalPages: Math.ceil(programs.length / limit)
    };
  } catch (error) {
    errorLog('programFileService', '加载和过滤Programs时出错:', error);
    throw error;
  }
};

/**
 * 加载Program筛选选项
 */
export const loadProgramFilters = async () => {
  try {
    const programs = await loadProgramsFromFiles();
    
    const categories = new Set<string>();
    const countries = new Set<string>();
    const gradeLevels = new Set<string>();
    
    programs.forEach(program => {
      if (program.program_type_en) categories.add(program.program_type_en);
      if (program.program_type_zh) categories.add(program.program_type_zh);
      if (program.country) countries.add(program.country);
      if (program.destination_en) countries.add(program.destination_en);
      program.grade_levels?.forEach(level => {
        if (level) gradeLevels.add(level);
      });
    });
    
    return {
      categories: Array.from(categories),
      countries: Array.from(countries),
      gradeLevels: Array.from(gradeLevels)
    };
  } catch (error) {
    errorLog('programFileService', '加载Program筛选选项时出错:', error);
    throw error;
  }
};

/**
 * 从本地 JSON 文件加载项目数据
 */
const loadProgramFromFile = async (filename: string): Promise<Program | null> => {
  try {
    // 处理文件名格式，确保正确的格式
    if (!filename.startsWith('program') && !isNaN(Number(filename))) {
      filename = `program${filename}.json`;
    } else if (!filename.endsWith('.json')) {
      filename = `${filename}.json`;
    }
    
    // 添加缓存打破参数，确保获取最新数据
    const url = addCacheBuster(`/content/programs/${filename}`);
    console.log(`尝试从文件加载项目: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      errorLog('programFileService', `加载项目数据失败 (${filename}): ${response.status} ${response.statusText}`, response);
      return null;
    }
    
    const data = await response.json();
    if (!data || !data.id) {
      errorLog('programFileService', `项目数据格式错误 (${filename}):`, data);
      return null;
    }
    
    const program = adaptProgramData(data);
    console.log(`成功从文件加载项目 ${filename}:`, { id: program.id, title: program.title_zh });
    return program;
  } catch (error) {
    errorLog('programFileService', `加载项目数据出错 (${filename}):`, error);
    return null;
  }
};

/**
 * 从本地 JSON 文件加载所有项目数据
 */
const loadAllProgramsFromFiles = async (): Promise<Program[]> => {
  try {
    const programIds = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
    const programPromises = programIds.map(id => loadProgramFromFile(id));
    const programs = await Promise.all(programPromises);
    return programs.filter((program): program is Program => program !== null);
  } catch (error) {
    errorLog('programFileService', '加载所有项目数据出错:', error);
    return [];
  }
};

/**
 * 获取单个项目数据
 */
export const getProgram = async (id: string): Promise<Program | null> => {
  try {
    // 优先从 API 获取数据
    const response = await fetch(`/api/programs/${id}`);
    if (!response.ok) {
      debugLog('programFileService', 'API获取项目数据失败，尝试从本地文件加载');
      return loadProgramFromFile(id);
    }
    const data = await response.json();
    return adaptProgramData(data);
  } catch (error) {
    errorLog('programFileService', 'API获取项目数据出错，尝试从本地文件加载:', error);
    return loadProgramFromFile(id);
  }
};

/**
 * 获取所有项目数据
 */
export const getAllPrograms = async (): Promise<Program[]> => {
  try {
    // 优先从 API 获取数据
    const response = await fetch('/api/programs');
    if (!response.ok) {
      debugLog('programFileService', 'API获取所有项目数据失败，尝试从本地文件加载');
      return loadAllProgramsFromFiles();
    }
    const data = await response.json();
    return data.map(adaptProgramData);
  } catch (error) {
    errorLog('programFileService', 'API获取所有项目数据出错，尝试从本地文件加载:', error);
    return loadAllProgramsFromFiles();
  }
};
