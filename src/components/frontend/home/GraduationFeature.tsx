
import React from 'react';
import SupportFeatures from './SupportFeatures';
import { useLanguage } from '@/context/LanguageContext';

const GraduationFeature = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* 左侧图片部分 */}
          <div className="w-full md:w-7/12 lg:w-8/12 mb-10 md:mb-0 order-1 md:order-1 md:pr-6 lg:pr-10">
            <div className="overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1740&auto=format&fit=crop" 
                alt="International students studying together" 
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                style={{ minHeight: '340px', objectPosition: 'center 30%' }}
              />
            </div>
          </div>
          
          {/* 右侧特性部分 */}
          <div className="w-full md:w-5/12 lg:w-4/12 order-2 md:order-2">
            <SupportFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationFeature;
