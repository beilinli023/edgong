import { useQuery } from '@tanstack/react-query';
import { fetchFrontendPrograms, fetchProgramById, fetchProgramFilters } from '../services/frontendProgramService';
import { ProgramFilterParams } from '../types/programTypes';

/**
 * 获取课程列表的自定义Hook
 * @param {ProgramFilterParams} filters - 筛选参数
 * @returns {Object} 包含课程列表数据、加载状态和错误信息的对象
 */
export function usePrograms(filters: ProgramFilterParams = {}) {
  return useQuery({
    queryKey: ['programs', filters],
    queryFn: () => fetchFrontendPrograms(filters),
  });
}

/**
 * 获取特色课程的自定义Hook
 * @returns {Object} 包含特色课程数据、加载状态和错误信息的对象
 */
export function useFeaturedPrograms() {
  return useQuery({
    queryKey: ['featuredPrograms'],
    queryFn: () => fetchFrontendPrograms({ ids: ['3', '6', '7'] }),
  });
}

/**
 * 获取单个课程详情的自定义Hook
 * @param {string} id - 课程ID
 * @returns {Object} 包含课程详情数据、加载状态和错误信息的对象
 */
export function useProgram(id: string) {
  return useQuery({
    queryKey: ['program', id],
    queryFn: () => fetchProgramById(id),
    enabled: !!id, // 只有当ID存在时才执行查询
  });
}

/**
 * 获取课程筛选选项的自定义Hook
 * @returns {Object} 包含课程筛选选项数据、加载状态和错误信息的对象
 */
export function useProgramFilters() {
  return useQuery({
    queryKey: ['programFilters'],
    queryFn: fetchProgramFilters,
  });
}
