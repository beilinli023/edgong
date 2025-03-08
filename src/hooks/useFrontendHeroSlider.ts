
import { useState, useEffect } from 'react';
import { getHeroSlides } from '@/services/frontend/homeContentService';

interface HeroSlide {
  id: number | string;  // Updated to accept both number and string
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
}

export const useFrontendHeroSlider = (language: 'en' | 'zh' = 'en') => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      try {
        const slidesData = await getHeroSlides(language);
        
        // 确保数据是有效的数组
        if (Array.isArray(slidesData) && slidesData.length > 0) {
          // 限制最多显示5张轮播图
          const limitedSlides = slidesData.slice(0, 5);
          
          // 按order排序
          const sortedSlides = [...limitedSlides].sort((a, b) => 
            (a.order || 999) - (b.order || 999)
          );
          
          setSlides(sortedSlides);
        } else {
          console.error('Hero slides data is not valid:', slidesData);
          // 设置为空数组，让组件显示默认轮播图
          setSlides([]);
        }
        setError(null);
      } catch (err) {
        console.error('Error in useFrontendHeroSlider:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch slides'));
        // 设置为空数组，让组件显示默认轮播图
        setSlides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, [language]);

  return { slides, isLoading, error };
};
