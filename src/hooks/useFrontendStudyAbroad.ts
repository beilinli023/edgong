
import { useQuery } from '@tanstack/react-query';
import { getStudyAbroadContent } from '@/services/frontend/studyAbroadService';
import { toast } from 'sonner';

export const useFrontendStudyAbroad = (language: 'en' | 'zh') => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['studyAbroadContent', language],
    queryFn: () => getStudyAbroadContent(language),
    staleTime: 1000 * 60 * 5, // 5分钟缓存
    refetchOnWindowFocus: false,
    meta: {
      onError: (err) => {
        console.error('Study abroad content error:', err);
        toast.error(
          language === 'zh' 
            ? '加载留学页面内容时出错，显示备用内容' 
            : 'Error loading study abroad content, showing fallback content'
        );
      }
    }
  });

  return {
    content: data,
    isLoading,
    error
  };
};
