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

// 默认轮播图数据
const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: '/images/hero-education.jpg',
    title: 'Learn Beyond Walls',
    subtitle: 'Ignite Curiosity, Inspire Growth, Immerse Yourself',
    buttonText: 'Explore Programs',
    buttonUrl: '/programs',
    order: 0
  }
];

export const useFrontendHeroSlider = (language: 'en' | 'zh' = 'en') => {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
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
          console.warn('Hero slides data is not valid, using default slides:', slidesData);
          setSlides(defaultSlides);
        }
        setError(null);
      } catch (err) {
        console.error('Error in useFrontendHeroSlider:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch slides'));
        // 使用默认轮播图作为后备
        setSlides(defaultSlides);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, [language]);

  return { slides, isLoading, error };
};
