import React, { useState, useEffect } from 'react';
import { Program } from '@/types/programTypes';
import { useLanguage } from '@/context/LanguageContext';
import { fetchFrontendPrograms } from '@/services/frontendProgramService';

/**
 * 从JSON文件中获取项目数据
 */
export function useProgramList() {
  const { currentLanguage } = useLanguage();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 使用服务获取项目列表
        console.log('开始获取项目列表...');
        const response = await fetchFrontendPrograms();
        console.log('获取到的项目列表数据:', response);
        
        // 确保数据有效
        if (!response) {
          throw new Error('无法获取项目列表数据');
        }
        
        console.log(`项目数量: ${response.length}`);
        setPrograms(response);
      } catch (error: unknown) {
        console.error('Error fetching programs:', error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : '未知错误';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrograms();
  }, [currentLanguage]);
  
  return { programs, loading, error };
}
