
// Using mock data instead of Supabase queries

/**
 * Fetches all programs with optional filters
 */
export const fetchFrontendPrograms = async (filters: any = {}) => {
  try {
    // Mock programs data
    const mockPrograms = [
      {
        id: "1",
        title_en: "Summer Camp in Tokyo",
        title_zh: "东京夏令营",
        program_id: "tokyo-summer",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
        location_en: "Tokyo, Japan",
        location_zh: "日本东京",
        duration: "2 weeks",
        country: "Japan",
        tags: [
          { id: "1", name_en: "Language", name_zh: "语言" },
          { id: "2", name_en: "Cultural", name_zh: "文化" }
        ],
        grade_levels: ["1", "2"]
      },
      {
        id: "2",
        title_en: "Harvard Academic Experience",
        title_zh: "哈佛学术体验",
        program_id: "harvard-academic",
        image: "https://images.unsplash.com/photo-1582739426871-a257be52be0a",
        location_en: "Cambridge, USA",
        location_zh: "美国剑桥",
        duration: "3 weeks",
        country: "USA",
        tags: [
          { id: "3", name_en: "Academic", name_zh: "学术" }
        ],
        grade_levels: ["3", "4"]
      },
      {
        id: "3",
        title_en: "British Culture Immersion",
        title_zh: "英国文化沉浸",
        program_id: "uk-culture",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
        location_en: "London, UK",
        location_zh: "英国伦敦",
        duration: "2 weeks",
        country: "UK",
        tags: [
          { id: "2", name_en: "Cultural", name_zh: "文化" },
          { id: "4", name_en: "History", name_zh: "历史" }
        ],
        grade_levels: ["2", "3", "4"]
      }
    ];

    // Apply simple filtering if needed
    let filteredPrograms = [...mockPrograms];
    
    // Filter by categories if provided
    if (filters.category && filters.category.length) {
      filteredPrograms = filteredPrograms.filter(program => 
        program.tags.some(tag => filters.category.includes(tag.id))
      );
    }
    
    // Filter by grade levels if provided
    if (filters.gradeLevel && filters.gradeLevel.length) {
      filteredPrograms = filteredPrograms.filter(program => 
        program.grade_levels.some(level => filters.gradeLevel.includes(level))
      );
    }
    
    // Filter by search term if provided
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPrograms = filteredPrograms.filter(program => 
        program.title_en.toLowerCase().includes(searchTerm) || 
        program.title_zh.toLowerCase().includes(searchTerm)
      );
    }

    // Mock pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPrograms = filteredPrograms.slice(startIndex, endIndex);

    return {
      data: paginatedPrograms,
      total: filteredPrograms.length,
      page,
      totalPages: Math.ceil(filteredPrograms.length / limit)
    };
  } catch (error) {
    console.error('Error fetching frontend programs:', error);
    throw error;
  }
};

/**
 * Fetches filter options for the program search
 */
export const fetchProgramFilters = async () => {
  try {
    // Mock filter data
    const mockFilters = {
      categories: [
        { id: "1", name_en: "Language", name_zh: "语言" },
        { id: "2", name_en: "Cultural", name_zh: "文化" },
        { id: "3", name_en: "Academic", name_zh: "学术" },
        { id: "4", name_en: "History", name_zh: "历史" }
      ],
      gradeLevels: [
        { id: "1", name_en: "Grade 1-3", name_zh: "小学1-3年级" },
        { id: "2", name_en: "Grade 4-6", name_zh: "小学4-6年级" },
        { id: "3", name_en: "Grade 7-9", name_zh: "初中" },
        { id: "4", name_en: "Grade 10-12", name_zh: "高中" }
      ]
    };

    return mockFilters;
  } catch (error) {
    console.error('Error fetching program filters:', error);
    throw error;
  }
};

/**
 * Fetches a single program by ID
 */
export const fetchProgramById = async (id: string) => {
  try {
    // Mock program detail
    const mockProgram = {
      id,
      title_en: "Summer Camp in Tokyo",
      title_zh: "东京夏令营",
      program_id: "tokyo-summer",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      location_en: "Tokyo, Japan",
      location_zh: "日本东京",
      duration: "2 weeks",
      country: "Japan",
      tags: [
        { id: "1", name_en: "Language", name_zh: "语言" },
        { id: "2", name_en: "Cultural", name_zh: "文化" }
      ],
      grade_levels: ["1", "2"],
      description_en: "Experience Japanese culture while improving your language skills. This program offers a unique blend of cultural immersion and academic learning.",
      description_zh: "在提高语言技能的同时体验日本文化。该项目提供了文化沉浸和学术学习的独特组合。",
      highlights_en: "Language classes every morning\nCultural activities in the afternoon\nHomestay with local families\nVisits to historical sites",
      highlights_zh: "每天上午语言课程\n下午文化活动\n与当地家庭寄宿\n参观历史遗迹",
      itinerary_en: "Day 1: Arrival and orientation\nDay 2-5: Language classes and cultural activities\nDay 6: Day trip to Mt. Fuji\nDay 7-12: Continued classes and activities\nDay 13: Farewell ceremony\nDay 14: Departure",
      itinerary_zh: "第1天：抵达和入学指导\n第2-5天：语言课程和文化活动\n第6天：富士山一日游\n第7-12天：继续课程和活动\n第13天：告别仪式\n第14天：离开",
      features_en: "Small class sizes (max 15 students)\nNative Japanese instructors\nAll-inclusive program with meals and accommodation\n24/7 staff support",
      features_zh: "小班教学（最多15名学生）\n日本本土教师\n包含膳食和住宿的全包式项目\n全天候工作人员支持",
      information_en: "Program runs from July 1 to July 14, 2023\nApplication deadline: May 15, 2023\nRequirements: No previous Japanese language experience necessary",
      information_zh: "项目时间：2023年7月1日至14日\n申请截止日期：2023年5月15日\n要求：无需具备日语基础",
      price: "4,500",
      gallery_images: [
        "https://images.unsplash.com/photo-1528164344705-47542687000d",
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"
      ]
    };

    return mockProgram;
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    throw error;
  }
};
