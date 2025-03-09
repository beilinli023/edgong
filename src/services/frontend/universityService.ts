
import { PartnerUniversityDetail } from '@/types/studyAbroadTypes';

interface UniversityIndex {
  universities: {
    id: number;
    file: string;
    name_en: string;
    name_zh: string;
    featured: boolean;
  }[];
  meta: {
    total_count: number;
    last_updated: string;
    version: string;
  };
}

/**
 * 获取大学索引文件
 */
export const getUniversityIndex = async (): Promise<UniversityIndex> => {
  try {
    const response = await fetch('/content/universities/index.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch university index: ${response.status}`);
    }
    
    const data = await response.json();
    return data as UniversityIndex;
  } catch (error) {
    console.error('Error fetching university index:', error);
    throw error;
  }
};

/**
 * 从JSON文件获取大学详情
 */
export const getUniversityById = async (id: number, language = 'en'): Promise<PartnerUniversityDetail> => {
  try {
    console.log(`Fetching university details for ID: ${id}, language: ${language}`);
    
    // 首先获取索引以查找文件名
    const index = await getUniversityIndex();
    const universityInfo = index.universities.find(u => u.id === id);
    
    if (!universityInfo) {
      throw new Error(`University with ID ${id} not found in index`);
    }
    
    // 使用索引中的文件名加载详细数据，添加时间戳防止缓存
    const timestamp = new Date().getTime();
    const response = await fetch(`/content/universities/${universityInfo.file}?t=${timestamp}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch university data: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && typeof data === 'object' && 'id' in data) {
      console.log('Successfully fetched university details from JSON file');
      return data as PartnerUniversityDetail;
    } else {
      console.error('Invalid university data format in JSON file', data);
      throw new Error('Invalid university data format');
    }
  } catch (error) {
    console.error(`Error fetching university details for ID ${id}:`, error);
    throw error;
  }
};

/**
 * 获取所有大学列表（用于StudyAbroadPage中的合作大学部分）
 * 注意：当前只有university1.json存在，所以我们只加载ID为1的大学
 */
export const getAllUniversities = async (): Promise<PartnerUniversityDetail[]> => {
  try {
    // 当前只有ID为1的大学文件存在
    const universityId = 1;
    try {
      const university = await getUniversityById(universityId);
      return [university]; // 只返回一所大学
    } catch (error) {
      console.error(`Error loading university ${universityId}:`, error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching all universities:', error);
    return [];
  }
};

export default {
  getUniversityIndex,
  getUniversityById,
  getAllUniversities
};
