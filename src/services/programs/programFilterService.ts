
import { Program, ProgramFilterParams } from '@/types/programTypes';
import { supabase } from '@/integrations/supabase/client';
import { mockPrograms } from '../mockData/programs/mockPrograms';
import { toast } from 'sonner';

/**
 * 获取和过滤项目数据（简化版本，准备重新实现）
 */
export const fetchAndFilterPrograms = async (
  filters: ProgramFilterParams
): Promise<{ filteredPrograms: Program[]; totalCount: number }> => {
  try {
    console.log('使用简化版筛选，准备重新实现');
    
    // 返回模拟数据
    const mockData = mockPrograms.slice(0, filters.limit || 10);
    return {
      filteredPrograms: mockData,
      totalCount: mockPrograms.length
    };
  } catch (error) {
    console.error('Error in fetchAndFilterPrograms:', error);
    toast.error('获取项目数据失败，使用模拟数据代替');
    
    // 失败时返回模拟数据
    const mockData = mockPrograms.slice(0, filters.limit || 10);
    return {
      filteredPrograms: mockData,
      totalCount: mockPrograms.length
    };
  }
};
