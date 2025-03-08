
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Users, GraduationCap, Home, Clock, Compass, LucideIcon } from 'lucide-react';

const SupportFeatures = () => {
  const { currentLanguage } = useLanguage();
  
  const features = [
    {
      icon: Users,
      title: currentLanguage === 'en' ? 'Experienced Leadership Team' : '经验丰富的领导团队',
      description: currentLanguage === 'en'
        ? '5+ years of leadership experience with strong emergency handling. Clear pre-trip briefings and a 1:15 staff-to-student ratio for personalized care.'
        : '5年以上领导经验，擅长应急处理。清晰的行前指导，1:15师生比确保个性化关怀。'
    },
    {
      icon: GraduationCap,
      title: currentLanguage === 'en' ? 'High-Quality Educational Programs' : '高质量学术项目',
      description: currentLanguage === 'en'
        ? 'Expert-led courses with government-recommended partners for credibility.'
        : '专家授课，合作院校经政府推荐，品质有保障。'
    },
    {
      icon: Home,
      title: currentLanguage === 'en' ? 'Safe Stays & Healthy Dining' : '安全住宿与健康餐饮',
      description: currentLanguage === 'en'
        ? 'Secure accommodations with strict safety measures and vetted meals for all diets.'
        : '安全住宿，严格管理，餐饮经过筛选，满足各类饮食需求。'
    },
    {
      icon: Clock,
      title: currentLanguage === 'en' ? '24/7 Support' : '24/7 全程支持',
      description: currentLanguage === 'en'
        ? 'Round-the-clock assistance for continuous student support.'
        : '全天候支持，随时提供帮助。'
    },
    {
      icon: Compass,
      title: currentLanguage === 'en' ? 'Immersive Cultural Experiences' : '沉浸式文化体验',
      description: currentLanguage === 'en'
        ? 'Interactive activities, curated excursions, and local engagement for deeper learning.'
        : '互动活动+精选游览，深入体验当地文化。'
    }
  ];

  return (
    <div className="bg-olive-500 p-5 rounded-lg shadow-md text-white max-w-[380px] mx-auto space-y-4 h-[360px] flex flex-col justify-between">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start h-[56px]">
          <div className="bg-olive-600 p-1.5 rounded-full mr-3 flex items-center justify-center flex-shrink-0 h-8 w-8">
            {React.createElement(feature.icon, { size: 18, className: "text-white" })}
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            <h4 className="font-semibold text-sm mb-1 line-clamp-1 h-[20px]">{feature.title}</h4>
            <p className="text-xs text-olive-100 line-clamp-2 leading-relaxed h-[32px]">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportFeatures;
