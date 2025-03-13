import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFrontendHeroSlider } from '@/hooks/useFrontendHeroSlider';

interface HeroSliderProps {
  currentLanguage: 'en' | 'zh';
}

const HeroSlider: React.FC<HeroSliderProps> = ({ currentLanguage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides, isLoading } = useFrontendHeroSlider(currentLanguage);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);

  // 默认轮播图数据已移至 useFrontendHeroSlider hook 中
  const displaySlides = slides;

  // 当slides或language变化时，重置当前幻灯片索引
  useEffect(() => {
    setCurrentSlide(0);
  }, [displaySlides, currentLanguage]);

  // 自动轮播效果
  useEffect(() => {
    if (displaySlides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
    }, 5000); // 每5秒切换一张幻灯片
    
    setAutoPlayInterval(interval);
    
    return () => {
      clearInterval(interval);
    };
  }, [displaySlides]); // 仅当displaySlides变化时重新设置

  // 当用户手动切换幻灯片时，重置自动轮播计时器
  const resetAutoPlayTimer = useCallback(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      const newInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
      }, 5000);
      setAutoPlayInterval(newInterval);
    }
  }, [displaySlides.length, autoPlayInterval]);

  const nextSlide = useCallback(() => {
    if (displaySlides.length > 0) {
      setCurrentSlide((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
      resetAutoPlayTimer();
    }
  }, [displaySlides.length, resetAutoPlayTimer]);

  const prevSlide = useCallback(() => {
    if (displaySlides.length > 0) {
      setCurrentSlide((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));
      resetAutoPlayTimer();
    }
  }, [displaySlides.length, resetAutoPlayTimer]);

  if (isLoading) {
    return (
      <div className="relative h-[500px] bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  const slide = displaySlides[currentSlide];

  return (
    <div className="relative h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
        style={{ backgroundImage: `url(${slide.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative h-full container mx-auto px-4 flex items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">{slide.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-white">{slide.subtitle}</p>
          {/* 按钮已移除 */}
        </div>
      </div>
      
      {displaySlides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {displaySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  resetAutoPlayTimer();
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
