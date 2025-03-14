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
        
        // 调试日志：显示项目的状态字段
        if (programData.status) {
          console.log(`[状态检查] 项目文件 ${filename}: ID=${programData.id}, 状态=${programData.status}`);
        } else {
          console.log(`[状态检查] 项目文件 ${filename}: ID=${programData.id}, 无状态字段`);
        }
        
        // 如果项目有状态字段，且不是"published"，则跳过该项目
        if (programData.status && programData.status !== 'published') {
          console.log(`[已跳过] 项目文件 ${filename}: ID=${programData.id}, 状态=${programData.status}，非已发布状态`);
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
  // 将字符串转换为字符串数组的函数
  const toStringArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) {
      // 确保数组中的字符串是有效的，并且没有Unicode编码问题
      return value.map(item => {
        // 如果是字符串就直接返回，否则尝试转换为字符串
        return typeof item === 'string' ? item : String(item);
      }).filter(Boolean);
    }
    // 处理字符串 - 确保它不会被错误地编码
    return [value];
  };

  // 处理年级水平，确保正确合并数组
  let gradeLevels: string[] = [];
  
  // 如果已有grade_levels数组，直接使用
  if (program.grade_levels && Array.isArray(program.grade_levels) && program.grade_levels.length > 0) {
    gradeLevels = program.grade_levels;
  } 
  // 否则，从grade_level_en和grade_level_zh构建
  else {
    const enLevels = toStringArray(program.grade_level_en);
    const zhLevels = toStringArray(program.grade_level_zh);
    
    // 合并两个数组并过滤掉空值
    gradeLevels = [...enLevels, ...zhLevels].filter(level => level && level.trim() !== '');
    
    // 如果仍然为空，尝试使用单个字符串值
    if (gradeLevels.length === 0) {
      const singleEnLevel = typeof program.grade_level_en === 'string' ? program.grade_level_en : '';
      const singleZhLevel = typeof program.grade_level_zh === 'string' ? program.grade_level_zh : '';
      
      if (singleEnLevel) gradeLevels.push(singleEnLevel);
      if (singleZhLevel) gradeLevels.push(singleZhLevel);
    }
  }
  
  console.log(`[年级处理] 项目ID=${program.id}, 年级水平:`, gradeLevels);

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
    grade_levels: gradeLevels,
    // 将单个字符串转换为字符串数组，符合接口要求
    program_type_en: toStringArray(program.program_type_en),
    program_type_zh: toStringArray(program.program_type_zh),
    destination_en: program.destination_en || '',
    destination_zh: program.destination_zh || '',
    grade_level_en: toStringArray(program.grade_level_en),
    grade_level_zh: toStringArray(program.grade_level_zh),
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
        // 处理program_type_en和program_type_zh作为数组的情况
        const programTypesEn = program.program_type_en || [];
        const programTypesZh = program.program_type_zh || [];
        
        // 检查任一类型数组中是否包含搜索关键词
        return programTypesEn.some(type => type.toLowerCase().includes(categoryLower)) ||
               programTypesZh.some(type => type.toLowerCase().includes(categoryLower));
      });
    }
    
    if (filters.country) {
      const countryLower = filters.country.toLowerCase();
      programs = programs.filter(program => {
        // 处理国家/地区，可能是字符串或数组
        const countryStr = typeof program.country === 'string' ? program.country : '';
        const countryEnArr = program.country_en || [];
        const countryZhArr = program.country_zh || [];
        const destEn = program.destination_en || '';
        const locEn = program.location_en || '';
        
        // 检查各种可能的国家/地区字段
        return countryStr.toLowerCase().includes(countryLower) ||
               destEn.toLowerCase().includes(countryLower) ||
               locEn.toLowerCase().includes(countryLower) ||
               countryEnArr.some(c => c.toLowerCase().includes(countryLower)) ||
               countryZhArr.some(c => c.toLowerCase().includes(countryLower));
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
      // 处理项目类型（数组）
      if (program.program_type_en) {
        program.program_type_en.forEach(type => categories.add(type));
      }
      if (program.program_type_zh) {
        program.program_type_zh.forEach(type => categories.add(type));
      }
      
      // 处理国家/地区
      if (program.country && typeof program.country === 'string') {
        countries.add(program.country);
      }
      if (program.destination_en) {
        countries.add(program.destination_en);
      }
      
      // 处理国家数组
      if (program.country_en && Array.isArray(program.country_en)) {
        program.country_en.forEach(c => countries.add(c));
      }
      if (program.country_zh && Array.isArray(program.country_zh)) {
        program.country_zh.forEach(c => countries.add(c));
      }
      
      // 处理年级水平
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
    const originalFilename = filename;
    if (!filename.startsWith('program') && !isNaN(Number(filename))) {
      filename = `program${filename}.json`;
    } else if (!filename.endsWith('.json')) {
      filename = `${filename}.json`;
    }
    
    const url = addCacheBuster(`/content/programs/${filename}`);
    console.log(`尝试从文件加载项目: ${url}，原始ID/文件名: ${originalFilename}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      errorLog('programFileService', `加载项目数据失败 (${filename}): ${response.status} ${response.statusText}`, {
        requestUrl: url,
        originalId: originalFilename,
        responseStatus: response.status,
        responseStatusText: response.statusText
      });
      return null;
    }
    
    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      errorLog('programFileService', `解析项目JSON数据失败 (${filename}):`, {
        error: parseError,
        responseText: responseText.substring(0, 200) + '...' // 只显示前200个字符避免日志过长
      });
      return null;
    }
    
    if (!data || !data.id) {
      errorLog('programFileService', `项目数据格式错误 (${filename}):`, data);
      return null;
    }
    
    const program = adaptProgramData(data);
    console.log(`成功从文件加载项目 ${filename}:`, { 
      id: program.id, 
      title: program.title_zh,
      imageUrl: program.image,
      hasGallery: program.gallery_images && program.gallery_images.length > 0
    });
    return program;
  } catch (error) {
    errorLog('programFileService', `加载项目数据出错 (${filename}):`, error);
    return null;
  }
};

/**
 * 加载所有项目数据
 */
const loadAllProgramsFromFiles = async (): Promise<Program[]> => {
  try {
    // 不再硬编码只加载前8个项目，而是直接使用loadProgramsFromFiles函数
    // 从index.json中读取所有可用的项目文件
    return await loadProgramsFromFiles();
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
