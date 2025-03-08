
import apiClient from '../api/apiClient';
import { extractData } from '../api/responseHelpers';
import { PartnerUniversityDetail } from '@/types/studyAbroadTypes';
import { getDefaultUniversityDetail } from './mockData/universityMockData';

/**
 * 获取大学详情
 */
export const getUniversityById = async (id: number, language = 'en'): Promise<PartnerUniversityDetail> => {
  try {
    console.log(`Fetching university details for ID: ${id}, language: ${language}`);
    const response = await apiClient.get(`/study-abroad/universities/${id}`, { 
      params: { language } 
    });
    
    const data = extractData<PartnerUniversityDetail>(response);
    
    if (data && typeof data === 'object' && 'id' in data) {
      console.log('Successfully fetched university details from API');
      return data;
    } else {
      console.error('Invalid university data format returned from API', data);
      return getDefaultUniversityDetail(id);
    }
  } catch (error) {
    console.error(`Error fetching university details for ID ${id}:`, error);
    return getDefaultUniversityDetail(id);
  }
};

export default {
  getUniversityById
};
