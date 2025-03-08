
import { useState, useEffect } from 'react';
import { Program } from '@/types/programTypes';
import { fetchAndFilterPrograms } from '@/services/programs';
import { toast } from 'sonner';
import { ConnectionStatus } from './useSupabaseConnection';
import { FilterState } from './useProgramFilters';

export const useProgramData = (
  selectedFilters: FilterState,
  currentPage: number,
  itemsPerPage: number, 
  connectionStatus: ConnectionStatus
) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadPrograms = async () => {
      if (connectionStatus !== 'success') return;
      
      setIsLoading(true);
      setError(null);
      try {
        console.log('Loading programs with filters:', selectedFilters);
        
        const { filteredPrograms, totalCount } = await fetchAndFilterPrograms({
          category: selectedFilters.category,
          country: selectedFilters.country,
          gradeLevel: selectedFilters.gradeLevel,
          page: currentPage,
          limit: itemsPerPage
        });
        
        console.log('Received programs:', filteredPrograms);
        
        if (!Array.isArray(filteredPrograms)) {
          throw new Error('Invalid data format received from API');
        }
        
        setPrograms(filteredPrograms);
        setTotalCount(totalCount);
      } catch (error) {
        console.error('Error loading programs:', error);
        setError('Failed to load programs. Please try again later.');
        toast.error('加载项目失败，请稍后再试');
        setPrograms([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, [selectedFilters, currentPage, itemsPerPage, connectionStatus]);

  return {
    programs,
    totalCount,
    isLoading,
    error
  };
};
