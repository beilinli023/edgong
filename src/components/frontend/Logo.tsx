import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentLanguage } = useLanguage();
  
  // 使用同一个logo图片
  const logoSrc = '/logo.jpg';
  
  return (
    <div className="flex items-center">
      <img 
        src={logoSrc} 
        alt="edGoing Logo" 
        className={`object-contain ${className}`}
      />
    </div>
  );
};

export default Logo;
