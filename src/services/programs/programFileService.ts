import { Program, ProgramFilterParams, ProgramsResponse } from '@/types/programTypes';

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
    // 加载索引文件，该文件包含所有Program文件的列表
    console.log('开始加载项目索引文件...');
    const indexResponse = await fetch(addCacheBuster('/content/programs/index.json'));
    if (!indexResponse.ok) {
      throw new Error(`无法加载Program索引文件: ${indexResponse.statusText}`);
    }
    
    const filenames = await indexResponse.json();
    console.log('索引文件内容:', filenames);
    
    // 加载每个Program文件的内容
    console.log(`开始加载 ${filenames.length} 个项目文件`);
    const programPromises = filenames.map(async (filename: string) => {
      try {
        console.log(`[加载开始] 项目文件: ${filename}`);
        const response = await fetch(addCacheBuster(`/content/programs/${filename}`));
        if (!response.ok) {
          console.error(`[加载失败] 项目文件 ${filename}: HTTP ${response.status} ${response.statusText}`);
          return null;
        }
        
        const programData = await response.json() as Program;
        
        // 检查加载的数据是否有效
        if (!programData || !programData.id || !programData.title_zh) {
          console.error(`[数据异常] 项目文件 ${filename}: 数据不完整`, programData);
          return null;
        }
        
        console.log(`[加载成功] 项目文件 ${filename}: ID=${programData.id}, 标题=${programData.title_zh}`);
        return programData;
      } catch (error) {
        console.error(`[加载错误] 项目文件 ${filename}:`, error);
        return null;
      }
    });
    
    // 等待所有Program文件加载完成
    const programs = await Promise.all(programPromises);
    
    // 过滤掉加载失败的Program
    const validPrograms = programs.filter((program): program is Program => program !== null);
    
    // 检查是否有重复的ID
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
    
    console.log(`[加载统计] 总计索引文件: ${filenames.length}, 有效加载: ${validPrograms.length}, 唯一ID: ${uniquePrograms.length}`);
    console.log(`[加载成功] 所有项目:`, uniquePrograms.map(p => ({ id: p.id, title: p.title_zh })));
    
    return uniquePrograms;
  } catch (error) {
    console.error('加载Programs时出错:', error);
    throw error;
  }
};

/**
 * 根据ID获取单个Program详情
 */
export const loadProgramById = async (id: string): Promise<Program | null> => {
  try {
    // 添加调试日志
    console.log(`开始加载ID为 ${id} 的Program`);
    
    // 加载所有Program
    const programs = await loadProgramsFromFiles();
    console.log(`加载到 ${programs.length} 个Program文件`);
    console.log('加载到的所有项目:', programs.map(p => ({ id: p.id, title: p.title_zh })));
    
    // 首先尝试直接通过ID查找
    const programById = programs.find(p => p.id === id);
    if (programById) {
      console.log(`通过ID直接找到项目 ${id}:`, programById.title_zh);
      return programById;
    }
    
    // 如果没有找到，尝试通过文件名加载
    console.log(`通过ID未找到项目 ${id}，尝试通过文件名加载`);
    try {
      const response = await fetch(addCacheBuster(`/content/programs/program${id}.json`));
      if (response.ok) {
        const program = await response.json() as Program;
        console.log(`成功通过文件名加载 program${id}.json:`, program.title_zh);
        return program;
      }
    } catch (error) {
      console.error(`通过文件名加载 program${id}.json 失败:`, error);
    }
    
    // 首先尝试直接通过索引位置加载
    // 如果 id 是数字且在有效范围内，直接返回对应索引的程序
    const numId = parseInt(id, 10);
    if (!isNaN(numId) && numId > 0 && numId <= programs.length) {
      // 索引从0开始，而ID从1开始，所以需要减1
      const program = programs[numId - 1];
      console.log(`通过索引加载程序 ${numId}:`, program.title_zh);
      return program;
    }
    
    // 如果不是有效的索引，则尝试通过ID或program_id查找
    const program = programs.find(p => 
      p.id.toString() === id || p.program_id === id
    );
    
    // 添加调试日志
    if (program) {
      console.log(`通过ID或program_id找到程序:`, program.title_zh);
    } else {
      console.log(`未找到ID为 ${id} 的程序`);
    }
    
    return program || null;
  } catch (error) {
    console.error(`加载ID为 ${id} 的Program时出错:`, error);
    throw error;
  }
};

/**
 * 根据筛选条件获取Program列表
 */
export const loadFilteredPrograms = async (filters: ProgramFilterParams): Promise<ProgramsResponse> => {
  try {
    console.log('[筛选] 开始加载筛选后的项目列表...');
    console.log('[筛选] 当前筛选条件:', filters);
    
    const programs = await loadProgramsFromFiles();
    console.log('[筛选] 加载到的原始项目数量:', programs.length);
    console.log('[筛选] 原始项目列表:', programs.map(p => ({ id: p.id, title: p.title_zh, tags: p.tags?.map(t => t.id) || [] })));
    
    // 检查并记录所有项目的ID
    const programIds = programs.map(p => p.id);
    console.log('[筛选] 当前项目 ID 列表:', programIds);
    
    // 检查每个项目的标签和年级信息
    programs.forEach(program => {
      console.log(`[筛选] 项目 ID=${program.id}, 标题=${program.title_zh}`);
      console.log(`[筛选] - 标签:`, program.tags?.map(tag => tag.id) || '无标签');
      console.log(`[筛选] - 年级:`, program.grade_levels || '无年级信息');
      
      // 验证数据结构
      if (!program.tags || !Array.isArray(program.tags)) {
        console.warn(`[筛选] 警告: 项目 ${program.id} 的 tags 属性不是数组或不存在:`, program.tags);
      }
      
      if (!program.grade_levels || !Array.isArray(program.grade_levels)) {
        console.warn(`[筛选] 警告: 项目 ${program.id} 的 grade_levels 属性不是数组或不存在:`, program.grade_levels);
      }
    });
    
    let filteredPrograms = [...programs];
    
    // 应用分类筛选
    if (filters.category && filters.category.length) {
      console.log(`[筛选] 应用分类筛选:`, filters.category);
      filteredPrograms = filteredPrograms.filter(program => {
        // 验证 tags 属性
        if (!program.tags || !Array.isArray(program.tags)) {
          console.warn(`[筛选] 分类筛选时发现项目 ${program.id} 的 tags 不是数组`);
          return false; // 无效的标签数据不符合分类筛选
        }
        
        const matchesCategoryFilter = program.tags.some(tag => filters.category?.includes(tag.id));
        console.log(`[筛选] 项目 ${program.id} 的分类筛选结果: ${matchesCategoryFilter}`);
        return matchesCategoryFilter;
      });
    }
    
    // 应用年级筛选
    if (filters.gradeLevel && filters.gradeLevel.length) {
      console.log(`[筛选] 应用年级筛选:`, filters.gradeLevel);
      filteredPrograms = filteredPrograms.filter(program => {
        // 验证 grade_levels 属性
        if (!program.grade_levels || !Array.isArray(program.grade_levels)) {
          console.warn(`[筛选] 年级筛选时发现项目 ${program.id} 的 grade_levels 不是数组`);
          return false; // 无效的年级数据不符合年级筛选
        }
        
        const matchesGradeFilter = program.grade_levels.some(level => filters.gradeLevel?.includes(level));
        console.log(`[筛选] 项目 ${program.id} 的年级筛选结果: ${matchesGradeFilter}`);
        return matchesGradeFilter;
      });
    }
    
    // 应用地区筛选
    if (filters.country && filters.country.length) {
      filteredPrograms = filteredPrograms.filter(program => 
        filters.country?.includes(program.country)
      );
    }
    
    // 应用搜索筛选
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPrograms = filteredPrograms.filter(program => 
        program.title_en.toLowerCase().includes(searchTerm) || 
        program.title_zh.toLowerCase().includes(searchTerm) ||
        program.description_en?.toLowerCase().includes(searchTerm) ||
        program.description_zh?.toLowerCase().includes(searchTerm)
      );
    }
    
    // 返回前的详细分析
    console.log('[筛选分析] 筛选前原始项目数量:', programs.length);
    console.log('[筛选分析] 原始项目 ID:', programs.map(p => p.id));
    console.log('[筛选分析] 筛选后项目数量:', filteredPrograms.length);
    console.log('[筛选分析] 筛选后项目 ID:', filteredPrograms.map(p => p.id));

    // 检查是否有缺失的项目
    const missingProgramIds = programs
      .map(p => p.id)
      .filter(id => !filteredPrograms.some(p => p.id === id));
    
    if (missingProgramIds.length > 0) {
      console.warn('[筛选分析] 以下项目在筛选过程中被移除:', missingProgramIds);
      // 检查缺失的项目具体数据
      missingProgramIds.forEach(id => {
        const missingProgram = programs.find(p => p.id === id);
        if (missingProgram) {
          console.log(`[筛选分析] 被移除的项目 ${id} 详情:`, {
            title: missingProgram.title_zh,
            tags: missingProgram.tags,
            grade_levels: missingProgram.grade_levels,
            country: missingProgram.country
          });
        }
      });
    }
    
    // 记录所有项目的状态信息，仅用于调试
    console.log('[筛选] 不应用状态筛选，显示所有项目');
    filteredPrograms.forEach(program => {
      if (program.status) {
        console.log(`[筛选] 项目 ${program.id} 的状态: ${program.status}`);
      }
    });
    
    // 应用分页 - 重要！设置默认无限制
    const page = filters.page || 1;
    // 设置一个十分大的限制值，确保所有项目都能被显示
    const limit = filters.limit || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPrograms = filteredPrograms.slice(startIndex, endIndex);
    
    console.log('[分页] 分页设置 - 页码:', page, '每页数量:', limit);
    console.log('[分页] 分页索引 - 起始:', startIndex, '结束:', endIndex);
    console.log('[分页] 分页后项目数量:', paginatedPrograms.length);
    console.log('[分页] 分页后项目 ID:', paginatedPrograms.map(p => p.id));
    console.log('[分页] 分页后项目列表:', paginatedPrograms.map(p => ({ id: p.id, title: p.title_zh })));
    
    return {
      data: paginatedPrograms,
      total: filteredPrograms.length,
      page,
      totalPages: Math.ceil(filteredPrograms.length / limit)
    };
  } catch (error) {
    console.error('加载筛选过的Programs时出错:', error);
    throw error;
  }
};

/**
 * 获取所有可用的Program筛选选项
 */
export const loadProgramFilters = async () => {
  try {
    const programs = await loadProgramsFromFiles();
    
    // 从所有Program中提取唯一的标签
    const categoriesMap = new Map();
    programs.forEach(program => {
      program.tags.forEach(tag => {
        categoriesMap.set(tag.id, tag);
      });
    });
    const categories = Array.from(categoriesMap.values());
    
    // 从所有Program中提取唯一的国家
    const countriesSet = new Set<string>();
    programs.forEach(program => {
      if (program.country) {
        countriesSet.add(program.country);
      }
    });
    const countries = Array.from(countriesSet).map(country => ({
      id: country,
      name_en: country,
      name_zh: getCountryNameZh(country)
    }));
    
    // 从所有Program中提取唯一的年级级别
    const gradeLevelsSet = new Set<string>();
    programs.forEach(program => {
      program.grade_levels.forEach(level => {
        gradeLevelsSet.add(level);
      });
    });
    const gradeLevels = Array.from(gradeLevelsSet).map(level => ({
      id: level,
      name_en: getGradeLevelNameEn(level),
      name_zh: getGradeLevelNameZh(level)
    }));
    
    return {
      categories,
      countries,
      gradeLevels
    };
  } catch (error) {
    console.error('加载Program筛选选项时出错:', error);
    throw error;
  }
};

// 辅助函数：获取国家中文名称
const getCountryNameZh = (countryEn: string): string => {
  const countryMap: Record<string, string> = {
    'USA': '美国',
    'UK': '英国',
    'Japan': '日本',
    'China': '中国',
    'Australia': '澳大利亚',
    'France': '法国',
    'Germany': '德国',
    'Canada': '加拿大'
  };
  
  return countryMap[countryEn] || countryEn;
};

// 辅助函数：获取年级级别英文名称
const getGradeLevelNameEn = (levelId: string): string => {
  const levelMap: Record<string, string> = {
    '1': 'Elementary School',
    '2': 'Middle School',
    '3': 'High School',
    '4': 'University'
  };
  
  return levelMap[levelId] || levelId;
};

// 辅助函数：获取年级级别中文名称
const getGradeLevelNameZh = (levelId: string): string => {
  const levelMap: Record<string, string> = {
    '1': '小学',
    '2': '初中',
    '3': '高中',
    '4': '大学'
  };
  
  return levelMap[levelId] || levelId;
}; 